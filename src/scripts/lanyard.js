const statusCard = document.getElementById('status-card');
statusCard.style.display = 'flex';

function connectLanyard() {
    const lanyard = new WebSocket('wss://api.lanyard.rest/socket');

    lanyard .addEventListener('open', () => {
        lanyard.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: '765183514001408020' }
        }));
    });

    lanyard.addEventListener('message', (event) => {
        const { op, d } = JSON.parse(event.data);
        let heartbeatInterval;
        clearInterval(heartbeatInterval);

        if (op === 1) {
            heartbeatInterval = setInterval(() => lanyard.send(JSON.stringify({ op: 3 })), d.heartbeat_interval);
        }

        if (op === 0) {
            let status = d.discord_status;
            const dot = document.getElementById('status-dot')
            const text = document.getElementById('status-text')

            // Only show desktop status as thats when I will be most likely to reply
            if (d.active_on_discord_desktop == true) {
                switch (status) {
                    case 'online':
                        dot.style.backgroundColor = '#45a366'
                        text.style.color = '#45a366cc'
                        text.textContent = 'Online'
                        break;
                    case 'idle':
                        dot.style.backgroundColor = '#ffc04e'
                        text.style.color = '#ffc04ecc'
                        text.textContent = 'Idle'
                        break;
                    case 'dnd':
                        dot.style.backgroundColor = '#da3e44'
                        text.style.color = '#da3e44cc'
                        text.textContent = 'Busy'
                        break;
                    case 'offline':
                        dot.style.backgroundColor = '#84858d'
                        text.style.color = '#84858dcc'
                        text.textContent = 'Offline'
                        break;
                }
            } else {
                dot.style.backgroundColor = '#84858d'
                text.style.color = '#84858dcc'
                text.textContent = 'Offline'
            }
        }
    });

    lanyard.addEventListener('close', () => {
        setTimeout(connectLanyard, 5000);
    });
} connectLanyard();