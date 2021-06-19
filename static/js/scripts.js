var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

function getStories(event) {
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = stories
    .map(
      (result) => `
    <div class="item">
    <picture>
      <img src="${result.multimedia[3].url}" alt="${result.multimedia[3].caption}" />
      <figcaption>${result.multimedia[3].caption}</figcaption>
      </picture>
      <h3><a href="${result.url}">${result.title}</a></h3>
      <p>${result.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
}

getStories();
