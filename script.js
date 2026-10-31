console.log("Portfolio loaded successfully.");
(async function loadRepos() {
    const feed = document.getElementById("repo-feed");
    if (!feed) return;

    try {
        const res = await fetch(
            "https://api.github.com/users/mugishaj284-star/repos?sort=pushed&per_page=12"
        );
        if (!res.ok) throw new Error("GitHub API error");

        const repos = (await res.json())
            .filter(r => !r.fork)
            .slice(0, 6);

        feed.innerHTML = "";

        if (repos.length === 0) {
            feed.innerHTML = '<p class="repo-status">No public repositories yet.</p>';
            return;
        }

        repos.forEach(repo => {
            const card = document.createElement("a");
            card.className = "repo-card";
            card.href = repo.html_url;
            card.target = "_blank";
            card.rel = "noopener noreferrer";

            const title = document.createElement("h3");
            title.textContent = repo.name;

            const desc = document.createElement("p");
            desc.textContent = repo.description || "No description yet.";

            const meta = document.createElement("div");
            meta.className = "repo-meta";
            const updated = new Date(repo.pushed_at).toLocaleDateString();
            meta.textContent =
                `${repo.language || "Mixed"} · ★ ${repo.stargazers_count} · Updated ${updated}`;

            card.append(title, desc, meta);
            feed.appendChild(card);
        });
    } catch (err) {
        feed.innerHTML =
            '<p class="repo-status">Couldn\'t load repositories right now. ' +
            '<a href="https://github.com/mugishaj284-star">View on GitHub</a></p>';
    }
})();