const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository";

    const heading = document.createElement("h2");
    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    heading.append(link);

    const description = document.createElement("p");
    description.textContent = repository.description;

    const metadata = document.createElement("p");
    metadata.className = "repository-meta";

    const language = document.createElement("span");
    language.textContent = `Language: ${repository.language}`;

    const starredDate = document.createElement("span");
    starredDate.textContent = `Starred ${repository.starredAt}`;

    metadata.append(language, starredDate);
    item.append(heading, description, metadata);
    repositoryList.append(item);
  }
}

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    renderRepositories(repositories);
    statusMessage.textContent = repositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    statusMessage.textContent = "Could not load starred repositories. Please try again later.";
    statusMessage.setAttribute("role", "alert");
    console.error("Failed to load events.json:", error);
  }
}

loadRepositories();
