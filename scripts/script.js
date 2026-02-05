// Update age
function updateAge() {
    const birthdate = new Date('2007-04-16');
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    document.getElementById('age').textContent = age;
}

async function fetchFavGame() {
    try {
        const response = await fetch('https://data.kaden-the.dev/fav-game');
        const data = await response.json();

        const title = document.getElementById('fav-game');
        const playtime = document.getElementById('fav-game-pt');

        title.textContent = data.name;
        title.href = `https://store.steampowered.com/app/${data.id}`;
        playtime.textContent = data.playtime
    } catch (error) {
        console.error(`Failed to fetch favourite game: ${error}`)
    }
}

// Project data
const projects = {
    games: [
        { 
            order: 8, 
            url: "https://soapmug.itch.io/i_see_you", 
            icon: "/assets/images/projects/i_see_you.png", 
            title: "I See You", 
            description: "Get rid of a virus while trying not to get fired.", 
            languages: ["C#"] 
        },
        { 
            order: 3, 
            url: "https://www.youtube.com/watch?v=xj8ZapKHgZY&t=1345s", 
            icon: "/assets/images/projects/ktvu.png", 
            title: "Keep the Viewers Up!",
            description: "Perform tasks to keep your viewers entertained!", 
            languages: ["Unreal Script"] 
        },
        { 
            order: 2, 
            url: "https://www.roblox.com/games/13413041261/Coco_Pops", 
            icon: "/assets/images/projects/coco_pops.png", 
            title: "Coco Pops.", 
            description: "It's just Coco Pops.", 
            languages: ["LUA"] 
        },
        { 
            order: 1, 
            url: "https://www.roblox.com/games/12651990651/Explode", 
            icon: "/assets/images/projects/explode.png", 
            title: "Explode.", 
            description: "It's in the name 🤷‍♂️", 
            languages: ["LUA"] 
        }
    ],
    websites: [
        { 
            order: 7, 
            url: "https://kadenissilly.com", 
            icon: "https://api.lanyard.rest/765183514001408020.png", 
            title: "kadenissilly.com", 
            description: "My own wee landing page.", 
            languages: ["HTML", "CSS", "JS"] 
        },
        { 
            order: 5, 
            url: "https://kaden-the.dev", 
            icon: "/assets/images/me.png", 
            title: "kaden-the.dev", 
            description: "My personal website/portfolio.", 
            languages: ["HTML", "CSS", "JS"] 
        },
        { 
            order: 4, 
            url: "https://archivesmp.net", 
            icon: "/assets/images/projects/archivesmp.png", 
            title: "archivesmp.net", 
            description: "The official website for the ArchiveSMP.", 
            languages: ["HTML", "CSS", "JS"] 
        }
    ],
    mods: [
        { 
            order: 6, 
            url: "https://github.com/KadenIsSilly/M-Day", 
            icon: "/assets/images/projects/m-day.png", 
            title: "M-Day", 
            description: "Scripts to remove the mutants in Exo Zombies.", 
            languages: ["GSC"] 
        }
    ]
};

// Sort
function sortByOrder(list) {
    return list.slice().sort((b, a) => a.order - b.order);
}

// Create project
function createProject(project) {
    const langs = project.languages.map(lang => {
        let cls = lang.toLowerCase();
        if (lang === "C#") cls = "cs";
        if (lang === "Unreal Script") cls = "us";
        return `<span class="language ${cls}">${lang}</span>`;
    }).join(" / ");

    return `
        <a class="project card" href="${project.url}" target="_blank">
            <img class="icon" src="${project.icon}" alt="${project.title} icon">
            <section class="info">
                <h1 class="title">${project.title}</h1>
                <p class="desc">${project.description}</p>
                <div class="languages">${langs}</div>
            </section>
        </a>
    `;
}

// Render projects
function renderProjects(filter = "All") {
    try {
        const container = document.querySelector(".project-container");
        container.innerHTML = "";

        let list;

        // Filter projects
        switch (filter) {
            case "Games":
                list = projects.games;
                break;
            case "Websites":
                list = projects.websites;
                break;
            case "Mods":
                list = projects.mods;
                break;
            default:
                list = [
                    ...projects.games,
                    ...projects.websites,
                    ...projects.mods
                ];
        }

        sortByOrder(list).forEach(p => {
            container.insertAdjacentHTML("beforeend", createProject(p));
        });
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

// Filter buttons
function setupFilters() {
    try {
        const buttons = document.querySelectorAll("#projects .sorting button");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(b => b.classList.remove("active"));
                button.classList.add("active");

                renderProjects(button.textContent.trim());
            });
        });
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

updateAge();
fetchFavGame();
renderProjects("All");
setupFilters();