//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();
const allCount = allEpisodes.length;

let ul = document.createElement("ul");

let searchDiv = document.createElement("div");
searchDiv.classList.add("search-div");

let select = document.createElement("select");
select.id = "episode-select";

let input = document.createElement("input");
input.autocomplete = "off";
input.type = "text";
input.id = "search";
input.placeholder = "Search for an episode";

let searchCount = document.createElement("p");
searchCount.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;

let button = document.createElement("button");
button.innerText = "Reset episodes";

button.addEventListener("click", setup);

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
  makePageForEpisodes(allEpisodes);
  input.addEventListener("keyup", onSearchKeyUp);
  input.value = "";
  displayEpisodeCount(allEpisodes);
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
    <heading>${episode.name} - ${episodeCode}</heading>
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

  const filteredEpisodes = allEpisodes.filter((e) => {
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
  const countString = `Displaying ${filteredCount}/${allCount} episodes`;

  searchCount.innerText = countString;
  makePageForEpisodes(episodesToDisplay);
}

select.addEventListener("change", (e) => {
  const searchTerm = e.target.value.slice(9);
  const selectedEpisode = allEpisodes.filter(
    (episode) => episode.name === searchTerm
  );

  displayEpisodeCount(selectedEpisode);
});

window.onload = setup;
