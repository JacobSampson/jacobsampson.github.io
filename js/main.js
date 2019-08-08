import { loadProjects } from './main-content/projects.js';
import { loadAbout } from './main-content/about.js';
import { loadExperience } from './main-content/experience.js';

import { Nav } from './models/nav.js';

(async function() {
    document.querySelector('body').classList.remove('is-preload');

    let mainContent = document.querySelector('.main__content');

    let about = dataLoader(mainContent, await loadAbout());
    let projects = dataLoader(mainContent, await loadProjects());
    let experience = dataLoader(mainContent, await loadExperience());

    // Setup the navigation bar
    let nav = new Nav(document.querySelector('.nav__links'), {
        'about': about,
        'projects': projects,
        'experience': experience
    });
})();

function setMainContent(main, content, selected) {
    // Set main content as being active
    if (document.querySelector('.main').classList.contains('main--unopened')) {
        document.querySelector('.main').classList.remove('main--unopened');
        document.querySelector('.nav').classList.add('main--opened');
    } else {
        main.classList.add('main__content--closed');
    }

    document.querySelectorAll('.nav__link--selected').forEach(el => {
        el.classList.remove('nav__link--selected');
    });
    selected.classList.add('nav__link--selected');
    
    setTimeout(() => {
        main.innerHTML = content;
        main.classList.remove('main__content--closed');
        main.classList.add('main__content--opening');
    }, 250);
}

function dataLoader(main, loadedData) {
    let data = loadedData;

    return (target) => {
        setMainContent(main, data, target);
    }
}