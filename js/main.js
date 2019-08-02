class ghRepo {
    _name;
    _url;
    _description;
    _language;
    _createdDate;

    constructor(name, url, description, language, createdDate) {
        this._name = name;
        this._url = url;
        this._description = description || null;
        this._language = language;
        this._createdDate = createdDate;
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
        return this._createdDate;
    }

    toString() {
        let repoString = this._name;

        repoString += '<br>url: ' + this._url;
        repoString += this._description ? '<br>description: ' + this._description : '';
        repoString += '<br>language: ' + this._language;
        repoString += '<br>creation date: ' + this._createdDate;

        return repoString;
    }
}

(async () => {
    let result = await fetch('https://api.github.com/users/JacobSampson/repos');
    let ghRepoInfo = await result.json();

    let ghRepos = [];

    for (repo of ghRepoInfo) {
        let newRepo = new ghRepo(
            repo.name,
            repo.url,
            repo.description,
            repo.language,
            repo.created_at
        );

        ghRepos.push(await newRepo);
    }

    return ghRepos;
})().then((ghRepos) => {
    let ghContent = document.querySelector('.main-content');
    ghRepos.forEach(ghRepo => {
        let newElement = document.createElement('div');
        newElement.innerHTML = ghRepo.toString();
        newElement.classList.add('gh-repo');
        newElement.classList.add('card');
        
        console.log(ghRepo);

        ghContent.appendChild(newElement);
    });
}).catch(() => {
    console.log('Failure');
});

// font-family: 'Source Sans Pro', Helvetica, sans-serif;