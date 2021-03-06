function loadAbout() {
    return `
        <div class='info-card info-card--flex'>
            <p class='info-card__contact>
                Monticello, Minnesota | jacob.samps@gmail.com | 763 331 4541<br>
                linkedin.com/in/jacob-i-sampson | github.com/JacobSampson
            </p>
        </div>
        <div class='info-card info-card--flex'>
            <h2 class='info-card__title'>Education</h2>
            <h3 class='info-card__section-title info-card__section-title--tight'>University of Minnesota-Twin Cities</h3>
            <p class='info-card__text-block'>
                GPA 4.0<br>
                Bachelor of Science in Computer Science
                <br>Minor in Management<br>
                <i>Expected May 2022</i><br><br>
            </p>
            <h3 class='info-card__section-title info-card__section-title--tight'>University of Nebraska-Lincoln</h3>
            <p class='info-card__text-block'>
                GPA 4.0 | August 2018 - May 2020
            </p>
            <h3 class='info-card__section-title info-card__section-title--tight'><br>Monticello High School</h3>
            <p class='info-card__text-block'>
                GPA 4.0 | Valedictorian | ACT 35
            </p>
        </div>
        <div class='info-card info-card--flex'>
            <h2 class='info-card__title'>Skills</h2>
            <h3 class='info-card__section-title info-card__section-title--tight'>Programming Languages</h3>
            <p class='info-card__text-block'>
            Java | Experience<br>
            JavaScript | Experience<br>
            TypeScript | Experience<br>
            C# | Experience<br>
            Python | Basic<br>
            SQL | Basic<br>
            C | Basic<br>
            </p>
            <h3 class='info-card__section-title info-card__section-title--tight'>Technologies</h3>
            <p class='info-card__text-block'>
                Angular Ionic<br>
                React<br>
                .NET<br>
                Docker<br>
                Kubernetes<br>
                Spring Boot<br>
                Django<br>
            </p>
        </div>
        <div class='info-card info-card--flex'>
            <h2 class='info-card__title info-card__title--tight'>Awards</h2>
            <ul class='info-card__text-block'>
                <li>3rd Place Cornhacks Hackathon | Lincoln, NE</li>
                <li>AP Scholar with Distinction | College Board</li>
                <li>Commended Student | National Merit Program</li>
                <li>All-State Diving | Minnesota 2017-18</li>
                <li>Class A Boys’ Athlete of the Year | Diving 2017-18</li>
                <li>National Honor Society | 2015-18</li>
                <li>Captain, Diving and Tennis | 2016-18</li>
            </ul>
        </div>
    `;
}

export { loadAbout };