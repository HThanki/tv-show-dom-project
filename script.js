const rootElem = document.getElementById("root");

let currentEpisodes = [];
let currentCount = 0;

let ul = document.createElement("ul");

let searchDiv = document.createElement("div");
searchDiv.classList.add("search-div");

let showSelect = document.createElement("select");
showSelect.id = "show-select";

const AllShows = getAllShows();

AllShows.sort(function (a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;
});

let showId = AllShows[0].name;

let select = document.createElement("select");
select.id = "episode-select";

let input = document.createElement("input");
input.autocomplete = "off";
input.type = "text";
input.id = "search";
input.placeholder = "Search for an episode";

let searchCount = document.createElement("p");

let button = document.createElement("button");
button.innerText = "All episodes";

button.addEventListener("click", setup);

searchDiv.append(showSelect);
searchDiv.append(select);
searchDiv.append(input);
searchDiv.append(button);
searchDiv.append(searchCount);
rootElem.append(searchDiv);

//Create variable to store TVMaze.com details
let footer = document.createElement("footer");
footer.innerHTML = `This content is from <a href="https://www.tvmaze.com/">https://www.tvmaze.com/</a>. specifically: <a href="https://api.tvmaze.com/shows/82/episodes">https://api.tvmaze.com/shows/82/episodes</a>`;

//Add unordered list and footer to page
rootElem.append(ul);
rootElem.append(footer);

function setup() {
  populateShowSelector(AllShows);
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

function makePageForEpisodes(episodeList) {
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

    //add episode details to li
    li.innerHTML = `<div class="episode-card">
    <div class ="episode-title" > 
    <heading>${episodeCode} - ${episode.name}</heading>
    </div>
    <div class= "episode-details">
    <img class="image" src= ${episode.image.medium}>
    <p>${episode.summary}</p>
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

function populateShowSelector(AllShows) {
  AllShows.forEach((show) => {
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
