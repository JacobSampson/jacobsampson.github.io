class Experience {
    constructor(experience) {
        this._name = experience.name;
        this._imgPath = experience.imgPath;
        this._description = experience.description;
        this._url = experience.url;
        this._technologies = experience.technologies;
        this._startDate = new Date(experience.startDate);
        this._endDate = new Date(experience.endDate);
    }

    get name() {
        return this._name;
    }

    get url() {
        return this._url;
    }

    get imgPath() {
        return this._imgPath;
    }

    get description() {
        return this._description;
    }

    get technologies() {
        return this._technologies;
    }

    get startDate() {
        return this.startDate.toLocaleDateString();
    }

    get endDate() {
        return this.endDate.toLocaleDateString();
    }

    compareTo(otherRepo) {
        return otherRepo._startDate - this._startDate;
    }
}

async function loadExperience() {
    const experience = await loadExperiences()

    return experiences.map((experience) => {
        `
        <div class='info-card'>
            <h2 class='info-card__title'>Title</h2>
            <p class='info-card__date'>Updated</p>
        </div>
        `
    });
}

async function loadExperiences() {
    const res = await fetch('/resources/data/experience.json');
    const experiencesInfo = await res.json();

    let experiences = [];

    experiencesInfo.forEach(function(experience) {
        let newExperience = new Experience({
            name: experience.name,
            imgPath: experience.imgPath,
            description: experience.description,
            url: experience.url,
            technologies: experience.technologies,
            startDate: experiences.startDate,
            endDate: experiences.endDate
        });

        experiences.push(newExperience);
    });

    return experiences;
}

export { loadExperience };