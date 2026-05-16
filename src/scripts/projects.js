const toolColours = {
    "C++": "#659bd3",
    "Unity": "#808080",
    "Visual Studio": "#a059f3",
    "C#": "#927be6",
    "GameScript Code": "#ff6800",
    "VS Code": "#23acf2",
    "HTML": "#f16529",
    "CSS": "#6a399c",
    "JavaScript": "#f7df1d",
    "Unreal Engine": "#ffffff",
    "Blueprint": "#74c1f5",
};

try {
    const projects = await fetch('/src/data/projects.json');
    const data = await projects.json();

    const cards = await Promise.all(data.slice().map(async project => {
        let playerCountColour = '';
        let playerCountCard = ''

        if (project.playerCount) {
            try {
                const playerCount = await fetch(project.playerCount);
                const players = parseInt(await playerCount.text());

                if (players >= 50) {
                    playerCountColour = '#22c55e'
                } else if (players >= 25) {
                    playerCountColour = '#84cc16'
                } else if (players >= 12) {
                    playerCountColour = '#eab308'
                } else if (players >= 6) {
                    playerCountColour = '#f97316'
                } else if (players >= 3) {
                    playerCountColour = '#ef4444'
                } else {
                    playerCountColour = '#dc2626'
                }

                playerCountCard = `<div class="players tag"><p style="color: ${playerCountColour}">${players} Players</p></div>` 
            } catch {
                playerCountCard = '<div class="players tag"><p style="color: #595959">NaN Players</p></div>'
            }
        }
        return `
            <a class="project" href="${project.url}" target="_blank">
                <div class="content">
                    <img class="icon" src="${project.icon}" alt="${project.name}'s Icon" loading="lazy">
                    <div class="info">
                        <h4 class="name">${project.name}</h4>
                        <p class="description">${project.description}</p>
                    </div>
                    <svg class="external-link" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V5.414l-9.293 9.293a1 1 0 0 1-1.414-1.414L18.586 4H15a1 1 0 0 1-1-1zM3 7a2 2 0 0 1 2-2h5a1 1 0 0 1 0 2H5v12h12v-5a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
                </div>

                <div class="tags">
                    ${playerCountCard}
                    ${project.tools.map(tool => `<div class="tag"><p style="color: ${toolColours[tool]}">${tool}</p></div>`).join('')}
                </div>
            </a>
        `
    }));

    document.getElementById('project-list').innerHTML = cards.join('');
} catch {
    document.getElementById('error').style.display = 'block';
}