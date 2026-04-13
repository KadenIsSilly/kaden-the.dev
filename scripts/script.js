function connectLanyard() {
    const lanyard = new WebSocket('wss://api.lanyard.rest/socket');
    let heartbeatInterval;

    lanyard.addEventListener('open', () => {
        lanyard.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: '765183514001408020' }
        }));
    });

    lanyard.addEventListener('message', (event) => {
        const { op, d } = JSON.parse(event.data);

        if (op === 1) {
            heartbeatInterval = setInterval(() => lanyard.send(JSON.stringify({ op: 6 })), d.heartbeat_interval);
            // POV: Someone's Daughter
        }

        if (op === 0) {
            const status = d.discord_status;

            document.getElementById('status-dot').style.backgroundColor = {
                online: '#45a366',
                idle: '#da3e44',
                dnd: '#da3e44',
                offline: '#83848c',
            }[status] ?? '#83848c';

            document.getElementById('status-text').textContent = {
                online: 'Available',
                idle: 'Busy',
                dnd: 'Busy',
                offline: 'Unavailable'
            }[status] ?? 'ERROR';

            document.getElementById('response-time').textContent = {
                online: 'Response time: ~1hr',
                idle: 'Response time: ~4hrs',
                dnd: 'Response time: ~4hrs',
                offline: 'Response time: ~6hrs'
            }[status] ?? 'Response time: NaN';
        }
    });

    lanyard.addEventListener('close', () => {
        clearInterval(heartbeatInterval);
        setTimeout(() => connectLanyard(), 5000);
    });

    lanyard.addEventListener('error', () => {
        clearInterval(heartbeatInterval);
        lanyard.close();
    });
}

function getFavGame() {
    fetch('https://data.kaden-the.dev/fav-game')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fav-game-title').textContent = data.name;
            document.getElementById('fav-game-title').href = `https://store.steampowered.com/app/${data.id}`;
            document.getElementById('fav-game-pt').textContent = data.playtime;
        })
        .catch(() => {
            document.getElementById('fav-game-title').textContent = 'ERROR';
            document.getElementById('fav-game-title').href = 'https://store.steampowered.com/';
            document.getElementById('fav-game-pt').textContent = 'NaN';
        });
}

function loadProjects() {
    fetch('/utils/projects.json')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('projects-list');
            const visible = 4;

            function render(showAll) {
                const projects = showAll ? data : data.slice(0, visible);

                list.innerHTML = projects.map(project => {
                    const info = project.info.map(infot => `
                        <div class="infoc ${infot.class}"><span>${infot.label}</span></div>
                    `).join('');

                    return `
                        <a class="project card" href="${project.url}" target="_blank">
                            <section class="content">
                                <img src="${project.icon}" alt="${project.name}'s Icon" loading="lazy">
                                <section class="details">
                                    <h1 class="name">${project.name}</h1>
                                    <p class="desc">${project.desc}</p>
                                </section>
                            </section>
                            <section class="info">${info}</section>
                        </a>
                    `;
                }).join('');

                if (data.length > visible) {
                    const button = document.createElement('button');
                    button.className = 'show-more';
                    button.textContent = showAll ? 'Show Less' : `Show More (${data.length - visible} more)`;
                    button.onclick = () => render(!showAll);
                    list.appendChild(button);
                }

                const cards = document.querySelectorAll('#projects-list .project');
                cards[cards.length - 1].classList.add('last-project');
            }

            render(false);

        });
}

function loadClients() {
    fetch('/utils/clients.json')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('clients')

            list.innerHTML = data.map(client => {
                const rating = parseFloat(client.stars);

                const stars = Array.from({ length: 5 }, (_, i) => {
                    if (i < Math.floor(rating)) {
                        return `<i class="fas fa-star"></i>`;
                    } else if (i < rating) {
                        return `<i class="fas fa-star-half-stroke"></i>`;
                    } else {
                        return `<i class="far fa-star"></i>`;
                    }
                }).join('');

                return `
                    <a class="client card" href="${client.url}" target="_blank">
                        <section class="details">
                            <img src="${client.icon}" alt="${client.name}'s Icon" loading="lazy">

                            <section class="info">
                                <h1 class="name">${client.name}</h1>
                                <p class="project">${client.project}</p>
                            </section>
                        </section>

                        <section class="rating">
                            <span>${stars} ${client.stars}/5</span>
                            <p>"${client.quote}"</p>
                        </section>
                        
                    </a>
                `
            }).join('');
        })
}

connectLanyard();
getFavGame();
loadProjects();
loadClients();