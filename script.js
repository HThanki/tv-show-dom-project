//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  // All episodes must be shown. For each episode, AT LEAST following must be displayed:
  episodeList.forEach((episode) => {
    // the episode's name
    console.log(episode.name);

    // Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be incorrect.
    if (episode.season >= 10 && episode.number >= 10) {
      console.log(`S${episode.season}E${episode.number}`);
    } else if (episode.season < 10 && episode.number >= 10) {
      console.log(`S0${episode.season}E${episode.number}`);
    } else if (episode.season >= 10 && episode.number < 10) {
      console.log(`S${episode.season}E0${episode.number}`);
    } else if (episode.season < 10 && episode.number < 10) {
      console.log(`S0${episode.season}E0${episode.number}`);
    }

    // the episode's medium-sized image
    console.log(episode.image.medium);

    // the episode's summary text
    console.log(episode.summary);
  });
  // Your page should state somewhere that the data has (originally) come from TVMaze.com, and link back to that site (or the specific episode on that site). See tvmaze.com/api#licensing.
  console.log(`This content is from https://www.tvmaze.com/`);
  console.log(`specifically: https://api.tvmaze.com/shows/82/episodes`);
}

window.onload = setup;
