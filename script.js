//You can edit ALL of the code here

let ul = document.createElement("ul");

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  // All episodes must be shown. For each episode, AT LEAST following must be displayed:
  episodeList.forEach((episode) => {
    let li = document.createElement("li");
    let showCode;

    // Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be incorrect.
    if (episode.season >= 10 && episode.number >= 10) {
      showCode = `S${episode.season}E${episode.number}`;
    } else if (episode.season < 10 && episode.number >= 10) {
      showCode = `S0${episode.season}E${episode.number}`;
    } else if (episode.season >= 10 && episode.number < 10) {
      showCode = `S${episode.season}E0${episode.number}`;
    } else if (episode.season < 10 && episode.number < 10) {
      showCode = `S0${episode.season}E0${episode.number}`;
    }

    // the episode's name
    li.innerHTML = `<div class="show-card">
    <div class ="show-title" > 
    <h3>${episode.name} - ${showCode}</h3>
    </div>
    <div class= "show-details">
    <img src= ${episode.image.medium}>
    <p>${episode.summary}</p>
    </div>
    </div>
    
    `;
    //create div to hold image and summary

    // // the episode's medium-sized image
    // console.log(episode.image.medium);

    // // the episode's summary text
    // console.log(episode.summary);
    ul.append(li);
  });
  rootElem.append(ul);

  // Your page should state somewhere that the data has (originally) come from TVMaze.com, and link back to that site (or the specific episode on that site). See tvmaze.com/api#licensing.
  let footer = document.createElement("footer");

  footer.innerHTML = `<p>This content is from https://www.tvmaze.com/. specifically: https://api.tvmaze.com/shows/82/episodes</p>`;
  rootElem.append(footer);
}

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;
