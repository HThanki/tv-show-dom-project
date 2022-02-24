//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();

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

searchDiv.append(select);
searchDiv.append(input);
searchDiv.append(searchCount);
rootElem.append(searchDiv);

function setup() {
  makePageForEpisodes(allEpisodes);
  input.addEventListener("keyup", onSearchKeyUp);
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

    //add this episode to select menu
    let newOption = new Option(
      `${episodeCode} - ${episode.name}`,
      `${episodeCode} - ${episode.name}`
    );

    //add option to select menu
    select.add(newOption, undefined);
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

select.addEventListener("click", () => {
  console.log(event.value);
});

//function onOptionMenuSelect(event) {}
// When the user makes a selection, they should be taken directly to that episode in the list
// Bonus: if you prefer, when the select is used, ONLY show the selected episode. If you do this, be sure to provide a way for the user to see all episodes again.

window.onload = setup;
