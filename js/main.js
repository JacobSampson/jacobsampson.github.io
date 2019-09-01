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

    // Move the nav area to the top of the screen
    let nav = document.querySelector('.nav');
    // let distTop = nav.offsetHeight / 4;
    // let distTop = 200;
    // nav.style.marginTop = `${distTop}px`;

    // Setup the navigation bar
    let navLinks = new Nav(document.querySelector('.nav__links'), {
        'about': about,
        'projects': projects,
        'experience': experience
    });
})();

function setMainContent(main, content, selected) {
    // Set main content as being active
    if (document.querySelector('.main').classList.contains('main--unopened')) {
        document.querySelector('.main').classList.remove('main--unopened');
        document.querySelector('.main').classList.add('main--opened');
    }

    // Remove the selected tab
    document.querySelectorAll('.nav__link--selected').forEach(el => {
        el.classList.remove('nav__link--selected');
    });

    main.classList.add('main__content--closed');
    selected.classList.add('nav__link--selected');
    
    setTimeout(() => {
        main.innerHTML = content;
        main.classList.remove('main__content--closed');
        main.classList.remove('main__content--unopened');
    }, 250);
}

function dataLoader(main, loadedData) {
    let data = loadedData;

    return (target) => {
        setMainContent(main, data, target);
    }
}