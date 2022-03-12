const rootElem = document.getElementById("root");

let currentEpisodes = [];
let currentCount = 0;

let ul = document.createElement("ul");
//ul.style.display = "none";

let searchDiv = document.createElement("div");
searchDiv.classList.add("search-div");

let showSelect = document.createElement("select");
showSelect.id = "show-select";

const allShows = getAllShows();

allShows.sort(function (a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;
});

let showId = allShows[0].id;

let select = document.createElement("select");
select.id = "episode-select";

let input = document.createElement("input");
input.autocomplete = "off";
input.type = "text";
input.id = "search";
input.placeholder = "Search for an episode";

let searchCount = document.createElement("p");

let episodesButton = document.createElement("button");
episodesButton.innerText = "All episodes";

let showsButton = document.createElement("button");
showsButton.innerText = "All shows";

episodesButton.addEventListener("click", setup);
//showsButton.addEventListener("click", makePageForShows);

let showListDiv = document.createElement("div");
showListDiv.classList.add("show-list");

searchDiv.append(showSelect);
searchDiv.append(showsButton);
searchDiv.append(select);
searchDiv.append(input);
searchDiv.append(episodesButton);
searchDiv.append(searchCount);
rootElem.append(searchDiv);
rootElem.append(showListDiv);

let footer = document.createElement("footer");

function updateFooter(showId) {
  footer.innerHTML = `This content is from <a href="https://www.tvmaze.com/" target="_blank">https://www.tvmaze.com/</a>. specifically: <a href="https://api.tvmaze.com/shows/${showId}/episodes" target="_blank">https://api.tvmaze.com/shows/${showId}/episodes</a>`;
}

//Create variable to store TVMaze.com details
footer.innerHTML = `This content is from <a href="https://www.tvmaze.com/" target="_blank">https://www.tvmaze.com/</a>. specifically: <a href="https://api.tvmaze.com/shows/${showId}/episodes" target="_blank">https://api.tvmaze.com/shows/${showId}/episodes</a>`;

//Add unordered list and footer to page
rootElem.append(ul);
rootElem.append(footer);

function setup() {
  populateShowSelector(allShows);
  makePageForShows(allShows);

  sendRequest(showId).then((data) => {
    currentEpisodes = data;
    currentCount = currentEpisodes.length;
    makePageForEpisodes(currentEpisodes);
    displayEpisodeCount(currentEpisodes);
  });
  input.addEventListener("keyup", onSearchKeyUp);
  input.value = "";
}

function sendRequest(showId) {
  const urlForTheRequest = `https://api.tvmaze.com/shows/${showId}/episodes`;

  return fetch(urlForTheRequest)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
}

function makePageForShows(shows) {
  //  loop through shows list and display show details
  shows.forEach((show) => {
    let showElement = document.createElement("div");

    showElement.innerHTML = `<div class= "show-heading">
    <a href="#">${show.name}</a></div>
    <div class= "show-details">
    <div class= "show-image"><img src=></div>
    <div class= "show-summary">${show.summary}</div>
    </div>
    <div class= "show-sidebar">
    <p>Rated: ${show.rating.average}</p>
    <p>Genres: ${show.genre}</p>
    <p>Status: ${show.status}</p>
    <p>Runtime: ${show.runtime}</p>
    </div>
    `;
    showElement.addEventListener("click", () => {
      const showId = show.id;
      sendRequest(showId).then((data) => {
        currentEpisodes = data;
        currentCount = currentEpisodes.length;
        showListDiv.style.display = "none";

        makePageForEpisodes(currentEpisodes);
        displayEpisodeCount(currentEpisodes);
      });
    });

    showListDiv.append(showElement);
  });
  return shows;
}

function makePageForEpisodes(episodeList) {
  //ul.style.display = "";

  ul.innerHTML = "";

  // loop through episode list
  episodeList.forEach((episode) => {
    let li = document.createElement("li");
    let episodeCode;

    //store correct format of episode code in episodeCode variable
    if (episode.season >= 10 && episode.number >= 10) {
      episodeCode = `S${episode.season}E${episode.number}`;
    } else if (episode.season < 10 && episode.number >= 10) {
      episodeCode = `S0${episode.season}E${episode.number}`;
    } else if (episode.season >= 10 && episode.number < 10) {
      episodeCode = `S${episode.season}E0${episode.number}`;
    } else if (episode.season < 10 && episode.number < 10) {
      episodeCode = `S0${episode.season}E0${episode.number}`;
    }

    let imageInfo = "";
    let summaryInfo = "";

    if (episode["image"]) {
      imageInfo = `<img class="image" src= ${episode.image.medium}>`;
    } else {
      imageInfo = `<img class="image" src= ./no-picture.png>`;
    }

    if (episode["summary"]) {
      summaryInfo = `<p font-weight="normal">${episode.summary}</p>`;
    } else {
      summaryInfo = noInfo;
    }

    //add episode details to li including image if show has images in object
    li.innerHTML = `<div class="episode-card">
      <div class ="episode-title" >
        <heading>${episodeCode} - ${episode.name}</heading>
      </div>
      <div class= "episode-details">
        ${imageInfo}
        ${summaryInfo}
      </div>
      </div>`;

    //add this li to ul element
    ul.append(li);

    //if list of episodes is greater than 1 i.e. function ran with full list of objects, add this episode to select menu and add option to select menu
    if (episodeList.length > 1) {
      //add this episode to select menu
      let newOption = new Option(
        `${episodeCode} - ${episode.name}`,
        `${episodeCode} - ${episode.name}`
      );

      //add option to select menu
      select.add(newOption, undefined);
    }
  });
  updateFooter(showId);
}

function onSearchKeyUp(event) {
  const searchTerm = event.target.value.toLowerCase();

  const filteredEpisodes = currentEpisodes.filter((e) => {
    const episodeName = e.name.toLowerCase();
    const episodeSummary = e.summary.toLowerCase();
    return (
      episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm)
    );
  });

  displayEpisodeCount(filteredEpisodes);
}

function displayEpisodeCount(episodesToDisplay) {
  const filteredCount = episodesToDisplay.length;
  const countString = `Displaying ${filteredCount}/${currentCount} episodes`;
  searchCount.innerText = countString;
  makePageForEpisodes(episodesToDisplay);
}

select.addEventListener("change", (e) => {
  const searchTerm = e.target.value.slice(9);
  const selectedEpisode = currentEpisodes.filter(
    (episode) => episode.name === searchTerm
  );
  displayEpisodeCount(selectedEpisode);
});

function populateShowSelector(allShows) {
  allShows.forEach((show) => {
    //add this show to select menu
    let newOption = new Option(`${show.name}`, `${show.id}`);

    //add option to show select menu
    showSelect.add(newOption, undefined);
  });

  showSelect.addEventListener("change", (e) => {
    select.innerHTML = "";

    showId = e.target.value;
    sendRequest(showId).then((data) => {
      currentEpisodes = data;
      currentCount = currentEpisodes.length;
      makePageForEpisodes(currentEpisodes);
      displayEpisodeCount(currentEpisodes);
    });
  });
}
window.onload = setup;
