/*
    made by @hexakleo
    Core functionality: language selection, visit tracking, cursor effects
*/

const translations = {
    'en': {
        enter: 'ENTER',
        selectLanguage: 'Select Language',
    },
    'es': {
        enter: 'ENTRAR',
        selectLanguage: 'Seleccionar Idioma',
    }
};

const languageColors = {
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'TypeScript': '#2b7489',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'PHP': '#4F5D95'
};

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeCursor();
    initializeEnterScreen();
    initializePopup();
    initializeProjectCards();
    initializeInfoPopup();
});

function initializeCursor() {
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
}

function initializeEnterScreen() {
    const enterScreen = document.querySelector('.enter-screen');
    const main = document.querySelector('main');
    const languageSelector = document.querySelector('.language-selector');
    const enterText = document.querySelector('.enter-text');
    
    let selectedLanguage = localStorage.getItem('hexa_lang');
    const hasVisited = localStorage.getItem('hexa_visited');

    if (hasVisited && selectedLanguage) {
        handleEnter();
    } else {
        setupInitialVisit(languageSelector, enterText);
    }

    function handleEnter() {
        localStorage.setItem('hexa_visited', 'true');
        enterScreen.style.opacity = '0';
        main.style.opacity = '1';
        setTimeout(() => {
            enterScreen.style.display = 'none';
            fetchGitHubRepos();
        }, 500);
    }

    // Event Listeners
    languageSelector.addEventListener('click', handleLanguageSelection);
    enterText.addEventListener('click', handleEnter);
}

function handleLanguageSelection(e) {
    if (e.target.classList.contains('lang-btn')) {
        const selectedLanguage = e.target.dataset.lang;
        localStorage.setItem('hexa_lang', selectedLanguage);
        
        const languageSelector = document.querySelector('.language-selector');
        const enterText = document.querySelector('.enter-text');
        
        languageSelector.style.display = 'none';
        enterText.style.opacity = '1';
        enterText.style.pointerEvents = 'auto';
    }
}

function setupInitialVisit(languageSelector, enterText) {
    languageSelector.style.display = 'flex';
    enterText.style.opacity = '0.3';
    enterText.style.pointerEvents = 'none';
}

async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/hexakleo/repos');
        const repos = await response.json();
        const projectsSection = document.querySelector('.projects-section');
        projectsSection.innerHTML = '';

        repos.slice(0, 3).forEach((repo, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';

            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.target = '_blank';
            repoLink.textContent = repo.name;

            const repoTitle = document.createElement('h3');
            repoTitle.appendChild(repoLink);

            const repoDescription = document.createElement('p');
            repoDescription.textContent = repo.description || 'No description available';

            const langDot = document.createElement('span');
            langDot.className = 'lang-dot';
            langDot.style.backgroundColor = languageColors[repo.language] || '#858585';

            const langName = document.createElement('span');
            langName.className = 'lang-name';
            langName.textContent = repo.language || 'No-lang';

            const langInfo = document.createElement('div');
            langInfo.className = 'lang-info';
            langInfo.appendChild(langDot);
            langInfo.appendChild(langName);

            const starStat = document.createElement('span');
            starStat.className = 'stat';
            starStat.textContent = `⭐ ${repo.stargazers_count}`;

            const forkStat = document.createElement('span');
            forkStat.className = 'stat';
            forkStat.textContent = `🔄 ${repo.forks_count}`;

            const statsInfo = document.createElement('div');
            statsInfo.className = 'stats-info';
            statsInfo.appendChild(starStat);
            statsInfo.appendChild(forkStat);

            const repoStats = document.createElement('div');
            repoStats.className = 'repo-stats';
            repoStats.appendChild(langInfo);
            repoStats.appendChild(statsInfo);

            projectCard.appendChild(repoTitle);
            projectCard.appendChild(repoDescription);
            projectCard.appendChild(repoStats);

            projectsSection.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
    }
}

function initializePopup() {
    const infoButton = document.querySelector('.info-button');
    const popup = document.querySelector('.popup');
    const closePopup = document.querySelector('.close-popup');

    infoButton.addEventListener('click', () => popup.style.display = 'flex');
    closePopup.addEventListener('click', () => popup.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === popup) popup.style.display = 'none';
    });
}

function initializeProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
}

function initializeInfoPopup() {
    const infoBtn = document.querySelector('.info-btn');
    const infoPopup = document.querySelector('.info-popup');
    const closeInfo = document.querySelector('.close-info');

    if (!infoBtn || !infoPopup || !closeInfo) {
        console.error('Info popup elements not found');
        return;
    }

    infoBtn.addEventListener('click', () => {
        console.log('Info button clicked'); // debug
        infoPopup.classList.add('active');
        infoPopup.style.display = 'flex';
    });

    closeInfo.addEventListener('click', () => {
        infoPopup.classList.remove('active');
        setTimeout(() => {
            infoPopup.style.display = 'none';
        }, 300);
    });

    infoPopup.addEventListener('click', (e) => {
        if (e.target === infoPopup) {
            infoPopup.classList.remove('active');
            setTimeout(() => {
                infoPopup.style.display = 'none';
            }, 300);
        }
    });
}

const infoBtn = document.querySelector('.info-btn');
const infoPopup = document.getElementById('infoPopup');
const closeInfo = document.getElementById('closeInfo');

infoBtn.addEventListener('click', () => {
    infoPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeInfo.addEventListener('click', () => {
    infoPopup.style.display = 'none';
    document.body.style.overflow = 'auto';
});

infoPopup.addEventListener('click', (e) => {
    if (e.target === infoPopup) {
        infoPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && infoPopup.style.display === 'flex') {
        infoPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
