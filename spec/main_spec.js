const { JSDOM } = require("jsdom");
const fs = require("fs");
const { Game } = require("../src/main");

describe("Color Change on Div Click (Class-Based)", () => {
  let dom;
  let document;
  let game;
  let initialColor;
  let initialImage;
  let divOne;
  let divTwo;

  beforeEach(() => {
    const htmlContent = fs.readFileSync("index.html", "utf8");
    const javascriptContent = fs.readFileSync("./dist/main.js", "utf8");

    dom = new JSDOM(htmlContent, { runScripts: "dangerously" });
    document = dom.window.document;

    let scriptElement = document.createElement("script");
    scriptElement.textContent = javascriptContent;
    document.body.appendChild(scriptElement);
    global.document = document;

    game = new Game(4, 4);

    divOne = document.getElementById("one");
    divTwo = document.getElementById("two");

    [divOne, divTwo].forEach((div, index) => {
      div.addEventListener("click", () => game.clickHandler(index + 1));
    });

    initialColor = divOne.style.backgroundColor;
    initialImage = divOne.style.backgroundImage;

    divOne = document.getElementById("one");
    divTwo = document.getElementById("two");

    jasmine.clock().install();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it("should shuffle colors by calling Math.random", () => {
    spyOn(Math, "random").and.callThrough();
    game.shuffleElements();
    expect(Math.random).toHaveBeenCalled();
  });

  it("should change the grey square to something else when clicked", () => {
    const divOne = document.getElementById("one");
    expect(divOne.style.backgroundColor).toBe(initialColor);
    divOne.click();
    expect(divOne.style.backgroundColor).not.toBe(initialColor);
  });

  it("should reset the color if there's no match", () => {
    divOne.click();
    divTwo.click();
    expect(divTwo.style.backgroundImage).not.toBe(initialImage);

    divOne.click();
    game.variables.firstTry = "blue";

    divTwo.click();
    game.variables.secondTry = "green";
    jasmine.clock().tick(800);

    expect(divOne.style.backgroundColor).toBe("rgb(180, 180, 180)");
    expect(divTwo.style.backgroundColor).toBe("rgb(180, 180, 180)");
  });
});

describe("Winning the game (Class-Based)", () => {
  let outerBox;
  let newBox;
  let theText;
  let game;

  beforeEach(() => {
    const htmlContent = fs.readFileSync("index.html", "utf8");
    const javascriptContent = fs.readFileSync("./dist/main.js", "utf8");

    dom = new JSDOM(htmlContent, { runScripts: "dangerously" });
    document = dom.window.document;

    let scriptElement = document.createElement("script");
    scriptElement.textContent = javascriptContent;
    document.body.appendChild(scriptElement);
    global.document = document;

    game = new Game(4, 4);

    const defaultColor = document.getElementById("one");
    initialColor = defaultColor.style.backgroundColor;

    outerBox = document.getElementById("outer-box");
    newBox = document.getElementById("new-box");
    theText = document.getElementById("winner");

    divOne = document.getElementById("one");

    [divOne].forEach((div, index) => {
      div.addEventListener("click", () => game.clickHandler(index + 1));
    });

    initialColor = divOne.style.backgroundColor;
  });

  afterEach(() => {
    dom = null;
    document = null;
    global.document = undefined;
  });

  it("should not display the winning block while the game is still on", function () {
    expect(outerBox.style.display).toBe("");
    expect(newBox.style.display).toBe("none");
  });

  it("should display the winning message when all matches are made", () => {
    game.variables.matches = 8;
    divOne.click();

    expect(theText.textContent.replace(/\s+/g, " ").trim()).toBe(
      "YOU HAVE WON"
    );
    expect(outerBox.style.display).toBe("none");
    expect(newBox.style.display).toBe("block");
  });
});

describe("Testing the configurable grid size", () => {
  let widthInput, heightInput;
  let document, button;

  beforeEach(() => {
    const htmlContent = fs.readFileSync("index.html", "utf8");
    const javascriptContent = fs.readFileSync("./dist/main.js", "utf8");
    dom = new JSDOM(htmlContent, { runScripts: "dangerously" });
    document = dom.window.document;

    let scriptElement = document.createElement("script");
    scriptElement.textContent = javascriptContent;
    document.body.appendChild(scriptElement);
    global.document = document;
    game = new Game(4, 4);

    widthInput = document.getElementById("width");
    heightInput = document.getElementById("height");
    button = document.getElementById("submit-btn");
  });

  afterEach(() => {
    dom = null;
    document = null;
    global.document = undefined;
  });

  it("Should return the size of the grid & layout", () => {
    expect(document.getElementById("main-box").childElementCount).toBe(16);
    widthInput.value = 2;
    heightInput.value = 2;
    button.click()
    expect(document.getElementById("main-box").childElementCount).toBe(4);
  });
});

// describe("Timer test. ", ()=>{
  
// })
