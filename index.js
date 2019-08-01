(async () => {
    let ghContent = document.getElementById("gh-content");
    
    let result = await fetch("https://api.github.com/users/JacobSampson/repos");
    let ghRepoInfo = await result.json();

    let ghRepos = [];

    ghRepoInfo.forEach(async ghRepo => {
        let commitInfo = await getNumCommits(ghRepo.commits_url.slice(0, -6));
        let commits = await commitInfo.json();

        ghRepos.push({
            name: ghRepo.name,
            url: ghRepo.url,
            description: ghRepo.description || "",
            language: ghRepo.language || "",
            createdDate: ghRepo.created_at,
            numCommits: await commits.length
        });

        console.log(ghRepos[ghRepos.length - 1]);
    });
})().catch(() => {
    console.log("Failure");
});

async function getNumCommits(url) {
    return fetch(url);
}

// font-family: "Source Sans Pro", Helvetica, sans-serif;