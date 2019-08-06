import { generateRepos } from './main-content/gh-repos.js';


(function() {
    document.querySelector('body').classList.remove('is-preload');

    let mainContent = document.querySelector('.main__content');

    generateRepos().then(repoContent => {
        mainContent.innerHTML = repoContent;

        // Set main content as being active
        let main = document.querySelector('.main');
        main.classList.remove('main--unopened');
    })
})();