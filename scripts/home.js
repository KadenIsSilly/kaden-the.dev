async function loadProjects() {
    try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();

        let showing = 4;

        function renderProjects() {
            document.getElementById('project-list').innerHTML = data.slice(0, showing).map(project => `
            <a class="project card" href="${project.url}" target="_blank" rel="noopener">
                <svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>
                </svg>
                
                <section class="info">
                    <img class="icon" src="${project.icon}" alt="${project.name}'s icon" loading="lazy" decoding="async">
                    <div class="container">
                        <h1 class="name">${project.name}</h1>
    
                        <section class="tech">
                            ${project.tech.map(tech => `<div class="card">
                                <p class="${tech.class}">${tech.name}</p>
                            </div>`).join('')} 
                        </section>
                    </div>
                </section>

                <p class="desc">${project.desc}</p>
            </a>
            `).join('');
        } renderProjects();

        const button = document.getElementById('projects-show-more');

        button.style.display = 'block';
        button.onclick = () => {
            if (showing === 4) {
                showing = data.length;
                button.textContent = 'Show Less';
            } else {
                showing = 4;
                button.textContent = 'Show More';
            }
            renderProjects();
        }
    } catch (error) {
        document.getElementById('project-error').style.display = 'block';
        document.getElementById('project-error').textContent = `Couldn't load projects (${error})`;
    }
} loadProjects();

async function loadClients() {
    try {
        const response = await fetch('/data/clients.json');
        const data = await response.json();

        function renderStars(rating) {
            const full = Math.floor(rating);
            const half = rating % 1 >= 0.5 ? 1 : 0;
            const empty = 5 - full - half;

            const fullStar = `<svg xmlns="http://www.w3.org/2000/svg" class="full-star" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>`;
            const halfStar = `<svg xmlns="http://www.w3.org/2000/svg" class="half-star" viewBox="0 0 16 16"><path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/></svg>`;
            const emptyStar = `<svg xmlns="http://www.w3.org/2000/svg" class="empty-star" fill="currentColor" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"></path></svg>`;

            return fullStar.repeat(full) + halfStar.repeat(half) + emptyStar.repeat(empty);
        }    

        const average = data.reduce((sum, client) => sum + parseFloat(client.rating), 0) / data.length;

        if (average === 5 || average === 4 || average === 3 || average === 2 || average === 1) {
            document.getElementById('average-rating').innerHTML = `Average Rating: ${average}/5`;
        } else {
            document.getElementById('average-rating').innerHTML = `Average Rating: ${average.toFixed(1)}/5`;
        }

        document.getElementById('client-list').innerHTML = data.map(client => `
        <a class="client card" href="${client.url}" target="_blank" rel="noopener noreferrer">
            <div class="container">
                <img class="pfp" src="${client.image}" alt="${client.name}'s profile picture" loading="lazy" decoding="async">
                <section class="info">
                    <h1 class="name">${client.name}</h1>
                    <p class="project">${client.project}</p>
                </section>
            </div>

            <section class="rating">
                <p class="stars">${renderStars(client.rating)} ${client.rating}/5</p>
                <p class="quote"><i>"${client.quote}"</i></p>
            </section>
        </a>
        `).join('');
        
    } catch (error) {
        document.getElementById('client-error').style.display = 'block';
        document.getElementById('client-error').textContent = `Couldn't load clients (${error})`;
    }
} loadClients();

async function getFavouriteGame() {
    try {
        const response = await fetch('https://data.kaden-the.dev/fav-game');
        const data = await response.json();

        document.getElementById('favourite-game').textContent = `My favourite game is currently ${data.name}, I have ${data.playtime} of playtime and have unlocked ${data.ach_progress}% of the achievements.`;
        } catch (error) {
        document.getElementById('favourite-game').textContent = `Couldn't load game (${error})`;
        document.getElementById('favourite-game').style.color = '#ff9811';
    }
} getFavouriteGame();