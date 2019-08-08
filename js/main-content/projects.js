class Repo {
    constructor(name, url, description, language, createdDate) {
        this._name = name;
        this._url = url;
        this._description = description || null;
        this._language = ['CSS', 'HTML'].includes(language) ? 'web' : language ? language.toLowerCase() : 'markdown';
        this._createdDate = new Date(createdDate);
    }

    get name() {
        return this._name;
    }

    get url() {
        return this._url;
    }

    get description() {
        return this._description;
    }

    get language() {
        return this._language;
    }

    get createdDate() {
        return this._createdDate.toLocaleDateString();
    }
}

async function loadProjects() {
    try {
        const repos = await loadRepos();
        return repos.map(repo =>
            `
            <a class='info-card' href='${repo.url}' target='_blank'>
                <p class='info-card__tag info-card__tag--language-${repo.language}'>${repo.language.toLowerCase()}</p>
                <h2 class='info-card__title'>${repo.name}</h2>
                <p class='info-card__description${repo.description ? "" : " info-card__description--blank"}'>${repo.description || ''}</p>
                <p class='info-card__date'>${repo.createdDate}</p>
            </a>
            `
        ).join('');
    } catch (e) {
        return `
            <a class='info-card info-card--failed' href='https://github.com/JacobSampson'>
                <p class='info-card__tag'>no projects</p>
                <h2 class='info-card__title'>Failure</h2>
                <p class='info-card__description'>Unable to load projects from GitHub</p>
                <p class='info-card__date'>${(new Date()).toLocaleDateString()}</p>
            </a>
            `
    }
}

async function loadRepos() {
    let result = await fetch('https://api.github.com/users/JacobSampson/repos');
    let repoInfo = await result.json();

    let repos = [];

    repoInfo.forEach(function(repo) {
        let newRepo = new Repo(
            repo.name,
            repo.html_url,
            repo.description,
            repo.language,
            repo.created_at
        );

        repos.push(newRepo);
    });

    return repos;
}

export { loadProjects };