let inputBox = document.querySelector(`.get-repos input`);
let getButton = document.querySelector(`.get-button`);
let container = document.querySelector(`.repo-container`);

getButton.onclick = () => {
  getRepos();
}

function getRepos() {
  
  if(inputBox.value == "") {
    container.innerHTML = `<span>Please Write Github Username</span>`;
  } else {
    fetch(`https://api.github.com/users/${inputBox.value}/repos`)
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = "";

      data.forEach(repo => {
        createRepoCard(repo);
      });
    })
  }
}


function createRepoCard(repo) {
  const div = document.createElement("div");
  div.className = "repo-card";

  div.innerHTML = `
    <h2>${repo.name}</h2>
    <p><a href="${repo.html_url}" target="_blank">Visit Repo</a></p>
    <p>Visibility: <span>${repo.private ? "Private" : "Public"}</span></p>

    <div class="repo-stats">
      <span>⭐ Stars: ${repo.stargazers_count}</span>
      <span>🍴 Forks: ${repo.forks_count}</span>
    </div>
  `;

  container.appendChild(div);
}


function test() {
  let a = 20;
  console.log("a: " + a);
  console.log("this: " + this);
  console.log("this.a: " + this.a);
}

const a = 50;
console.log(a);