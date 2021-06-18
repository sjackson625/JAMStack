const images = ["apples", "apples-red", "apples-group"];
console.log(images);
for (let image of images) {
  const appleString = `<img src="/img/${image}.png" alt="A nice picture of apples." />`;
  document.querySelector("pommes").append(appleString);
}
