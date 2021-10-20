
var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=X48CqRJkfokYFQO3A5uOxnxpHtVt7Bw1";

function getStories() {
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data));
}


function showData(stories) {
  var looped = stories
  .map( 
    (story) => `
      <div class="item">

        <img src="${story.multimedia ? story.multimedia[2].url : "no picture available"}" alt=""/>
        <h3>${story.title}</h3>
        <p>${story.abstract}</p>
      </div>
      `
  )
  .join(""); 

  document.querySelector(".stories").innerHTML = looped;
}

if (document.querySelector(".home")){
  getStories();
}
