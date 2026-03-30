const { Game } = require("./main");

const submitButton = document.getElementById("submit-btn");

let width, height;
let game;
function setupGame(gridWidth, gridHeight) {
  width = gridWidth;
  height = gridHeight;
  if (width * height > 16 || (width * height) % 2 !== 0) {
    alert("Invalid: please enter a valid grid size <br> read the instructions");
    return;
  }

  const container = document.getElementById("main-box");
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

  game = new Game(width, height);

  for (let i = 1; i <= width * height; i++) {
    const div = document.createElement("div");
    div.id = game.getElementId(i);
    container.appendChild(div);
  }

  const elements = document.querySelectorAll("#main-box > div");
  elements.forEach((element, index) => {
    element.addEventListener("click", () => {
      game.clickHandler(index + 1);
    });
  });
}
submitButton.addEventListener("click", () => {
  

  const newWidth = document.getElementById("width").value;
  const newHeight = document.getElementById("height").value;
  setupGame(newWidth, newHeight);
});
document.addEventListener("DOMContentLoaded", () => {
  
  setupGame(4, 4);
});

module.exports = { width, height};
