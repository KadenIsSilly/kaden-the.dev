function switchTheme() {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggler');
    const themeIcon = themeToggle.querySelector('i');

    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'far fa-sun' : 'far fa-moon';

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        root.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'far fa-sun' : 'far fa-moon';

        // Save theme
        localStorage.setItem('theme', newTheme);
    })
}

function setBio() {
    const funnies = [
        "There has been a rumour I'm productive... It's a lie.",
        "I make games... I think 🤔",
        "The Coco Pops box guy 🔥",
        "CoD: Advanced Warfare is the best CoD",
        "I'm a Creeper, Minecraft's Grim Reaper."
    ];

    // Pick a funny
    const bio = funnies[Math.floor(Math.random() * funnies.length)];
    document.getElementById('bio').textContent = bio;
}

function loadLanyard() {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");
    
    // Handle messages
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const {op, d} = data;
        
        // Hello
        if (op === 1) {
            ws.send(JSON.stringify({
                op: 2,
                d: {subscribe_to_id: "765183514001408020"}
            }));
            return;
        }
        
        // Event
        if (op === 0) {
            updateStatus(d);
            updateSocials(d);
        }
    };
    
    // Error handling
    ws.onerror = (error) => {
        console.error(`Lanyard error: ${error}`);
    };
    
    function updateStatus(d) {
        const statusDot = document.getElementById('status-dot');
        
        const isDesktopOrWeb = d.active_on_discord_desktop || d.active_on_discord_web;
        const isMobile = d.active_on_discord_mobile;
        
        if (isMobile && !isDesktopOrWeb) {
            statusDot.style.display = 'block';
            statusDot.style.backgroundColor = '#82838b';
            statusDot.setAttribute('data-tooltip', 'Unavailable');
            return;
        }

        const statuses = {
            'online': {text: 'Available', colour: '#43a25a'},
            'dnd': {text: 'Busy', colour: '#d83a42'},
            'offline': {text: 'Unavailable', colour: '#82838b'},
            'idle': {text: 'Unavailable', colour: '#82838b'},
            'streaming': {text: 'Unavailable', colour: '#82838b'}
        };
        
        const status = statuses[d.discord_status];
        
        if (status) {
            statusDot.style.display = 'block';
            statusDot.style.backgroundColor = status.colour;
            statusDot.setAttribute('data-tooltip', status.text);
        }
    }

    function updateSocials(d) {
        document.getElementById('twitch').href = d.kv.twitch;
        document.getElementById('twitter').href = d.kv.twitter;
        document.getElementById('steam').href = d.kv.steam;
        document.getElementById('github').href = d.kv.github;
    }
}

switchTheme();
setBio();
loadLanyard();