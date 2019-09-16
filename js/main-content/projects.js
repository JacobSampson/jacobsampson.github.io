class Repo {
    constructor(repo) {
        this._name = repo.name;
        this._url = repo.url;
        this._description = repo.description || null;
        this._language = ['CSS', 'HTML'].includes(repo.language) ? 'web' : repo.language ? repo.language.toLowerCase() : 'markdown';
        this._updatedDate = new Date(repo.updatedDate);
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

    get updatedDate() {
        return this._updatedDate.toLocaleDateString();
    }

    compareTo(otherRepo) {
        // console.log(this._name);
        //  Pushes less importaant repo down
        if (this._name === 'web-dev-portal' || otherRepo._name === 'web-dev-portal') {
            return this._name === 'web-dev-portal' ? 1 : -1;
        }

        return otherRepo._updatedDate - this._updatedDate;
    }
}

async function loadProjects() {
    try {
        const repos = await loadRepos();
        // console.log(repos);
        return repos.sort((repo, otherRepo) => repo.compareTo(otherRepo)).map(repo => {
            return `
            <a class='info-card info-card--hoverable' href='${repo.url}' target='_blank'>
                <p class='info-card__tag info-card__tag--language-${repo.language}'>${repo.language.toLowerCase()}</p>
                <h2 class='info-card__title'>${repo.name}</h2>
                <p class='info-card__description${repo.description ? "" : " info-card__description--blank"}'>${repo.description || ''}</p>
                <p class='info-card__date'>Updated ${repo.updatedDate}</p>
            </a>
            `
        }).join('');  
    } catch (e) {
        console.error(e);
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
        let newRepo = new Repo({
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            language: repo.language,
            updatedDate: repo.updated_at
        });

        repos.push(newRepo);
    });

    return repos;
}

export { loadProjects };