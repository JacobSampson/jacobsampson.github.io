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

async function generateRepos() {
    try {
        const repos = await getRepos();
        return repos.map(repo =>
            `
            <a class='info-card' href='${repo.url}' target='_blank'>
                <p class='info-card__language info-card__language--language-${repo.language}'>${repo.language.toUpperCase()}</p>
                <h2 class='info-card__title'>${repo.name}</h2>
                <p class='info-card__description${repo.description ? "" : " info-card__description--blank"}'>${repo.description || ''}</p>
                <p class='info-card__date'>${repo.createdDate}</p>
            </a>
            `
        ).join('');
    } catch (e) {
        return `
            <a class='info-card info-card--failed' href='https://github.com/JacobSampson'>
                <i>Unable to load GitHub repositories</i>
            </a>
            `
    }
}

async function getRepos() {
    let result = await fetch('https://api.github.com/users/JacobSampson/repos');
    let repoInfo = await result.json();
console.log(repoInfo);
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

export { generateRepos };