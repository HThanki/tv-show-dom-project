//You can edit ALL of the code here

let ul = document.createElement("ul");

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

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

  //Create variable to store TVMaze.com details
  let footer = document.createElement("footer");
  footer.innerHTML = `This content is from <a href="https://www.tvmaze.com/">https://www.tvmaze.com/</a>. specifically: <a href="https://api.tvmaze.com/shows/82/episodes">https://api.tvmaze.com/shows/82/episodes</a>`;

  //Add unordered list and footer to page
  rootElem.append(ul);
  rootElem.append(footer);
}

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;
