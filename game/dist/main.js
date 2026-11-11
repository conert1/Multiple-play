/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Game } = __webpack_require__(/*! ./main */ \"./src/main.js\");\n\nconst submitButton = document.getElementById(\"submit-btn\");\n\nlet width, height;\nlet league;\nlet game;\nfunction setupGame(gridWidth, gridHeight, newLeague) {\n  width = gridWidth;\n  height = gridHeight;\n  league = newLeague\n  console.log(\"----------   -------------        ----------\" + height + \"  '''''''    \" + width  + \"this    \" + height*width)\n  if (width * height > 16 || (width * height) % 2 !== 0 || width*height == 0) {\n    alert(\"Invalid: please enter a valid grid size <br> read the instructions\");\n    return;\n  }\n\n  const container = document.getElementById(\"main-box\");\n  container.innerHTML = \"\";\n  container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;\n\n  game = new Game(width, height, league);\n\n  for (let i = 1; i <= width * height; i++) {\n    const div = document.createElement(\"div\");\n    div.id = game.getElementId(i);\n    container.appendChild(div);\n  }\n\n  const elements = document.querySelectorAll(\"#main-box > div\");\n  elements.forEach((element, index) => {\n    element.addEventListener(\"click\", () => {\n      game.clickHandler(index + 1);\n    });\n  });\n}\nsubmitButton.addEventListener(\"click\", () => {\n  \n\n  const newWidth = document.getElementById(\"width\").value;\n  const newHeight = document.getElementById(\"height\").value;\n  const newLeague = document.getElementById(\"league\").value;\n  document.getElementById(\"grid-size\").style.display = \"none\"\n  setupGame(newWidth, newHeight, newLeague);\n});\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  \n  setupGame(4, 4, \"betway-premiership\");\n});\n\nmodule.exports = { width, height, league};\n\n\n//# sourceURL=webpack://conert-mavuso-222-memory-game-in-vanilla-js-javascript/./src/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((module) => {

eval("class Game {\n  constructor(width, height, league) {\n    this.width = width;\n    this.height = height;\n    this.league = league\n    this.variables = {\n      firstTry: \"\",\n      secondTry: \"\",\n      count: 0,\n      matches: 0,\n      selectedColorOne: \"\",\n      selectedColorTwo: \"\",\n      prevOne: \"\",\n      seconds: 0,\n    };\n    //this is new\n    const timerEl = document.getElementById('timer');\n\n    const interval = setInterval(() => {\n      this.variables.seconds++;\n      timerEl.textContent = this.variables.seconds;\n    }, 1000);\n\n\n    document.getElementById(\"outer-box\").style.display =\"block\"\n\n    let fileNum = \"psl\"\n    let stadium = \"\"\n    if(league == \"betway-premiership\"){\n      fileNum = \"psl\"\n      stadium = \"FNB-Stadium-2.jpg\"\n      document.getElementById(\"logo-image\").src = `./pics/psl.png`;\n\n    }else if(league == \"premier-league\"){\n      fileNum = \"epl\"\n      stadium = \"Wembley.png\"\n      document.getElementById(\"logo-image\").src = `./pics/epl.png`;\n\n\n    }\n\n\n    document.body.style.backgroundImage = `url('./pics/${stadium}')`;\n\n    this.colors = {\n      1: [\"red\", `url('./pics/${fileNum}/${1}.png')`],\n      2: [\"orange\", `url('./pics/${fileNum}/${2}.png')`],\n      3: [\"yellow\", `url('./pics/${fileNum}/${3}.png')`],\n      4: [\"green\", `url('./pics/${fileNum}/${4}.png')`],\n      5: [\"purple\", `url('./pics/${fileNum}/${5}.png')`],\n      6: [\"pink\", `url('./pics/${fileNum}/${6}.png')`],\n      7: [\"brown\", `url('./pics/${fileNum}/${7}.png')`],\n      8: [\"blue\", `url('./pics/${fileNum}/${8}.png')`],\n      9: [\"red\", `url('./pics/${fileNum}/${1}.png')`],\n      10: [\"orange\", `url('./pics/${fileNum}/${2}.png')`],\n      11: [\"yellow\", `url('./pics/${fileNum}/${3}.png')`],\n      12: [\"green\", `url('./pics/${fileNum}/${4}.png')`],\n      13: [\"purple\", `url('./pics/${fileNum}/${5}.png')`],\n      14: [\"pink\", `url('./pics/${fileNum}/${6}.png')`],\n      15: [\"brown\", `url('./pics/${fileNum}/${7}.png')`],\n      16: [\"blue\", `url('./pics/${fileNum}/${8}.png')`],\n    };\n\n    this.processing = false;\n    this.shuffleElements();\n  }\n\n  numberOfItems() {\n    if (this.width * this.height > 16 || (this.width * this.height) % 2 != 0) {\n      return 0;\n    }\n    return this.width * this.height;\n  }\n\n  removeAndShift(obj, keysToRemove) {\n    const values = Object.values(obj);\n\n    keysToRemove.sort((a, b) => b - a);\n\n    keysToRemove.forEach((key) => {\n      values.splice(key - 1, 1);\n    });\n\n    const newObj = {};\n    values.forEach((value, index) => {\n      newObj[index + 1] = value;\n    });\n\n    return newObj;\n  }\n\n  shuffleElements() {\n    let listOfShuffle = [];\n    for (let i = 1; i <= 8 - this.numberOfItems() / 2; i++) {\n      listOfShuffle.push(i);\n      listOfShuffle.push(i + 8);\n    }\n\n    this.colors = this.removeAndShift(this.colors, listOfShuffle);\n\n    let colorValues = Object.values(this.colors);\n    for (let i = colorValues.length - 1; i > 0; i--) {\n      let j = Math.floor(Math.random() * (i + 1));\n      [colorValues[i], colorValues[j]] = [colorValues[j], colorValues[i]];\n    }\n    Object.keys(this.colors).forEach((key, index) => {\n      this.colors[key] = colorValues[index];\n    });\n  }\n\n  async clickHandler(number) {\n    if (this.processing) return;\n    this.processing = true;\n\n    let selectedNumOne = this.getElementId(number);\n    document.getElementById(selectedNumOne).style.pointerEvents = \"none\";\n    document.getElementById(selectedNumOne).style.backgroundColor = \"transparent\";\n    document.getElementById(selectedNumOne).style.backgroundImage =\n      this.colors[number][1];\n    document.getElementById(selectedNumOne).style.backgroundSize = \"cover\";\n\n    if (this.variables.count === 0) {\n      this.variables.firstTry = this.colors[number][0];\n      this.variables.selectedColorOne = selectedNumOne;\n    } else {\n      this.variables.secondTry = this.colors[number][0];\n      this.variables.selectedColorTwo = selectedNumOne;\n    }\n\n    this.variables.count++;\n    if (this.variables.count === 2) {\n      this.disableClicks();\n      this.variables.count = 0;\n\n      if (this.variables.firstTry === this.variables.secondTry) {\n        this.resolving();\n      } else {\n        await this.restore();\n      }\n\n      this.enableClicks();\n    }\n\n    this.hasWon();\n\n    this.variables.prevOne = selectedNumOne;\n    this.processing = false;\n  }\n\n  async restore() {\n    await new Promise((resolve) => {\n      setTimeout(() => {\n        document.getElementById(\n          this.variables.selectedColorOne\n        ).style.backgroundColor = \"#b4b4b4\";\n\n        document.getElementById(\n          this.variables.selectedColorOne\n        ).style.backgroundImage = \"none\";\n\n        document.getElementById(\n          this.variables.selectedColorTwo\n        ).style.backgroundColor = \"#b4b4b4\";\n\n        document.getElementById(\n          this.variables.selectedColorTwo\n        ).style.backgroundImage = \"none\";\n\n        document.getElementById(\n          this.variables.selectedColorOne\n        ).style.pointerEvents = \"auto\";\n        document.getElementById(\n          this.variables.selectedColorTwo\n        ).style.pointerEvents = \"auto\";\n\n        resolve();\n      }, 350);\n    });\n  }\n\n  async resolving() {\n    const { selectedColorOne, selectedColorTwo } = this.variables;\n\n    document.getElementById(selectedColorOne).style.pointerEvents = \"none\";\n    document.getElementById(selectedColorTwo).style.pointerEvents = \"none\";\n\n    this.variables.matches++;\n  }\n\n  hasWon() {\n    if (this.variables.matches >= this.numberOfItems() / 2) {\n      // document.getElementById(\"outer-box\").style.display = \"none\";\n      // document.getElementById(\"grid-size\").style.display = \"none\";\n      document.getElementById(\"memory-game\").style.display = \"none\";\n      document.getElementById(\"new-box\").style.display = \"block\";\n      //this is new\n      document.getElementById(\"sec\").innerHTML = `You took ${this.variables.seconds} seconds`;\n    }\n  }\n\n  getElementId(number) {\n    const elementMap = {\n      1: \"one\",\n      2: \"two\",\n      3: \"three\",\n      4: \"four\",\n      5: \"five\",\n      6: \"six\",\n      7: \"seven\",\n      8: \"eight\",\n      9: \"nine\",\n      10: \"ten\",\n      11: \"eleven\",\n      12: \"twelve\",\n      13: \"thirteen\",\n      14: \"fourteen\",\n      15: \"fifteen\",\n      16: \"sixteen\",\n    };\n    return elementMap[number];\n  }\n\n  disableClicks() {\n    document.getElementById(\"main-box\").style.pointerEvents = \"none\";\n  }\n\n  enableClicks() {\n    document.getElementById(\"main-box\").style.pointerEvents = \"auto\";\n  }\n}\n\nmodule.exports = { Game };\n\n/*\n\n1️⃣ Resize the Image (change pixel dimensions)\n\nIf you want your image to be exactly 1920×1080 px:\n\nOpen your image in GIMP.\n\nGo to Image → Scale Image…\n\nIn the dialog:\n\nSet Width: 1920\n\nSet Height: 1080\n\nMake sure Interpolation is set to Cubic (good quality for scaling).\n\nClick Scale.\n\n✅ This changes the pixel dimensions, but it may stretch the image if the original aspect ratio isn’t 16:9.\n*/\n\n//# sourceURL=webpack://conert-mavuso-222-memory-game-in-vanilla-js-javascript/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;