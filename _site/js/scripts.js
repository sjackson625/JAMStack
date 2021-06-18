function displayApples() {
  if (!document.querySelector(".pommes")) return;
  const images = ["apples", "apples-red", "apples-group"];
  const appleDiv = document.querySelector(".pommes");
  let appleString = "";

  for (let image of images) {
    appleString += `<img src="/img/${image}.png" alt="A nice picture of apples." />`;
  }

  console.log(appleString);

  appleDiv.innerHTML = appleString;
}

displayApples();
