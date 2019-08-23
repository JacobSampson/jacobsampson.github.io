class Experience {
    constructor(experience) {
        this._id = experience.id;
        this._name = experience.name;
        this._company = experience.company;
        this._companyURL = experience.companyURL;
        this._imgPath = experience.imgPath;
        this._description = experience.description;
        this._url = experience.url;
        this._technologies = experience.technologies;
        this._startDate = experience.startDate ? new Date(experience.startDate) : '';
        this._endDate = experience.endDate ? new Date(experience.endDate) : '';
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get company() {
        return this._company;
    }

    get companyURL() {
        return this._companyURL;
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
        return this._startDate ? this._startDate.toLocaleDateString(): '';
    }

    get endDate() {
        return this._endDate ? this._endDate.toLocaleDateString(): '';
    }

    compareTo(otherRepo) {
        if (this._startDate) {
            return otherRepo._startDate ? otherRepo._startDate - this._startDate : 1;
        } else {
            return otherRepo._startDate ? -1 : 1;
        }
    }
}

async function loadExperience() {
    const experiences = await loadExperiences()

    let experiencesHTML = experiences.sort().map(experience => {
        let dateLabel = experience.startDate ? "'>" + experience.startDate + experience.endDate ? " - " + experience.endDate : '' : " info-card__date--unused'>";
        let technologies = experience.technologies.map(technology => {
            `
            <li class='info-card__technology'>${technology}</li>
            `
        }).join('');

        return `
        <div class='info-card info-card--flex info-card--highlighted-${experience.id}'>
            <h2 class='info-card__title info-card__title--highlighted'>${experience.name}</h2>
            <p class='info-card__section-title'>${experience.company}</p>
            <p class='info-card__date${dateLabel}</p>
            <p class='info-card__description'>${experience.description}</p>
            <ul class='info-card__technologies'>
                ${technologies}
            </ul>
            <a class='info-card__company-url' href='${experience.companyURL}'>Comapny Site</a>
            <a class='info-card__link' href='${experience.url}' hidden>Comapny Site</a>
        </div>
        `
    }).join('');
    return experiencesHTML;
}

async function loadExperiences() {
    const result = await fetch('/resources/data/experience.json');
    const experiencesInfo = await result.json();

    let experiences = [];

    experiencesInfo.forEach(function(experience) {
        let newExperience = new Experience({
            id: experience.id,
            name: experience.name,
            company: experience.company,
            companyURL: experience.companyURL,
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