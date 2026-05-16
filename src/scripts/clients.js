try {
    const clients = await fetch('/src/data/clients.json');
    const data = await clients.json();

    function renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = 5 - full - half;

        const fullStar = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.418 23.165c-.579.297-1.236-.224-1.119-.888l1.245-7.095L.26 10.148c-.494-.471-.237-1.332.424-1.425l7.347-1.044L11.307 1.188c.296-.585 1.095-.585 1.391 0l3.276 6.491 7.347 1.044c.662.093.918.954.423 1.425l-5.283 5.034 1.245 7.095c.117.664-.54 1.185-1.119.888L12 19.781z"/></svg>`;
        const halfStar = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.031 7.679 11.307 1.188A.78.78 0 0 1 12 .75c.275 0 .549.146.698.438l3.276 6.491 7.347 1.044a.81.81 0 0 1 .594.49.825.825 0 0 1-.255.668l-5.284 5.034 1.245 7.095c.117.664-.54 1.185-1.119.888L12 19.781l-6.584 3.384a.75.75 0 0 1-.219.075c-.513.09-1.002-.381-.9-.963l1.245-7.095L.26 10.148a.825.825 0 0 1-.258-.605.9.9 0 0 1 .127-.453.765.765 0 0 1 .555-.368zM12 18.041a.75.75 0 0 1 .348.084l5.529 2.841-1.041-5.936a.84.84 0 0 1 .243-.758l4.361-4.155-6.078-.864a.795.795 0 0 1-.59-.432L12.002 3.335 12 3.339z"/></svg>`;
        const emptyStar = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.299 22.275c-.117.666.54 1.187 1.119.889l6.585-3.384 6.584 3.384c.579.297 1.236-.223 1.119-.888l-1.245-7.095 5.283-5.034c.495-.471.239-1.332-.423-1.425l-7.347-1.044L12.698 1.188a.77.77 0 0 0-1.391 0L8.031 7.68l-7.347 1.044c-.662.093-.918.954-.425 1.425l5.285 5.034zm7.358-4.151-5.529 2.841 1.041-5.936a.84.84 0 0 0-.245-.758L2.565 10.118l6.078-.864a.795.795 0 0 0 .59-.432L12 3.335l2.771 5.487a.795.795 0 0 0 .59.432l6.078.863-4.359 4.155a.84.84 0 0 0-.245.759l1.041 5.936-5.529-2.841a.75.75 0 0 0-.69 0z"/></svg>`;

        return fullStar.repeat(full) + halfStar.repeat(half) + emptyStar.repeat(empty);
    }

    const cards = data.map(client => `
        <div class="client">
            <div class="info">
                <img class="icon" src="${client.icon}" alt="${client.name}'s Icon" loading="lazy">
                <div class="container">
                    <h4 class="name">${client.name}</h4>
                    <p class="project">${client.project}</p>
                </div>
            </div>

            <div class="review">
                <div class="stars"><div class="container">${renderStars(client.rating)}</div><p class="rating">${client.rating}/5</p></div>
                <p class="quote"><i>"${client.quote}"</i></p>
            </div>
        </div>
    `);

    document.getElementById('clients').innerHTML = cards.join('');
} catch {
    document.getElementById('error').style.display = 'block';
}