const fetch = require("node-fetch");

API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

module.exports = function () {
  return new Promise((resolve, reject) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => resolve(data.results))
      .catch((e) => reject(e));
  });
};
