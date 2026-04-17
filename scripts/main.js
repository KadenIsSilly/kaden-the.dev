async function getStatus() {
    const lanyard = await new WebSocket('wss://api.lanyard.rest/socket');
    let heartbeat;

    lanyard.onopen = () => {
        lanyard.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: '765183514001408020' }
        }));
    }

    lanyard.onmessage = (event) => {
        const { op, d } = JSON.parse(event.data);

        if (op === 1) {
            clearInterval(heartbeat);
            heartbeat = setInterval(() => {
                lanyard.send(JSON.stringify({ op: 3 }));
            }, d.heartbeat_interval);
        }

        if (op === 0) {
            const status = d.discord_status;
            const dot = document.getElementById('status-dot');
            const text = document.getElementById('status-text');
            const response_time = document.getElementById('response-time');

            dot.style.display = 'block';
            text.style.display = 'block';

            if (d.active_on_discord_desktop == true) {
                switch (status) {
                    case 'online':
                        dot.style.backgroundColor = '#45a366';
                        text.textContent = 'Available';
                        response_time.textContent = `Response Time: ~30m`;
                        break;
                    case 'idle':
                        dot.style.backgroundColor = '#ffc04e';
                        text.textContent = 'Away';
                        response_time.textContent = `Response Time: ~1h`;
                        break;
                    case 'dnd':
                        dot.style.backgroundColor = '#da3e44';
                        text.textContent = 'Busy';
                        response_time.textContent = `Response Time: ~2.5h`;
                        break;
                    case 'offline':
                        dot.style.backgroundColor = '#83848c';
                        text.textContent = 'Unavailable';
                        response_time.textContent = `Response Time: ~6h`;
                        break;
                }
            } else {
                dot.style.backgroundColor = '#83848c';
                text.textContent = 'Unavailable';
                response_time.textContent = `Response Time: ~6h`;
            }
        }
    }

    lanyard.onclose = () => {
        clearInterval(heartbeat);
        setTimeout(getStatus, 1000);
    }
} getStatus();