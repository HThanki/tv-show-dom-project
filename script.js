//You can edit ALL of the code here
const rootElem = document.getElementById("root");
let ul = document.createElement("ul");

let searchDiv = document.createElement("div");
searchDiv.classList.add("search-div");

let input = document.createElement("input");
input.autocomplete = "off";
input.type = "text";
input.id = "search";
input.placeholder = "Search for an episode";

const allEpisodes = getAllEpisodes();

let searchCount = document.createElement("p");
searchCount.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;

searchDiv.append(input);
searchDiv.append(searchCount);
rootElem.append(searchDiv);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  input.addEventListener("keyup", onSearchKeyUp);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
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
  });
}

//Create variable to store TVMaze.com details
let footer = document.createElement("footer");
footer.innerHTML = `This content is from <a href="https://www.tvmaze.com/">https://www.tvmaze.com/</a>. specifically: <a href="https://api.tvmaze.com/shows/82/episodes">https://api.tvmaze.com/shows/82/episodes</a>`;

//Add unordered list and footer to page
rootElem.append(ul);
rootElem.append(footer);

function onSearchKeyUp(event) {
  const searchTerm = event.target.value.toLowerCase();
  console.log(searchTerm);
  const allEpisodes = getAllEpisodes();

  const filteredEpisodes = allEpisodes.filter((e) => {
    const episodeName = e.name.toLowerCase();
    const episodeSummary = e.summary.toLowerCase();
    return (
      episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm)
    );
  });

  const filteredCount = filteredEpisodes.length;
  const allCount = allEpisodes.length;
  const countString = `Displaying ${filteredCount}/${allCount} episodes`;

  searchCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
}

window.onload = setup;
