class Game {
  constructor(width, height, league) {
    this.width = width;
    this.height = height;
    this.league = league
    this.variables = {
      firstTry: "",
      secondTry: "",
      count: 0,
      matches: 0,
      selectedColorOne: "",
      selectedColorTwo: "",
      prevOne: "",
      seconds: 0,
    };
    //this is new
    const timerEl = document.getElementById('timer');

    const interval = setInterval(() => {
      this.variables.seconds++;
      timerEl.textContent = this.variables.seconds;
    }, 1000);


    document.getElementById("outer-box").style.display ="block"

    let fileNum = "psl"
    let stadium = ""
    if(league == "betway-premiership"){
      fileNum = "psl"
      stadium = "FNB-Stadium-2.jpg"
      document.getElementById("logo-image").src = `./pics/psl.png`;

    }else if(league == "premier-league"){
      fileNum = "epl"
      stadium = "Wembley.png"
      document.getElementById("logo-image").src = `./pics/epl.png`;


    }


    document.body.style.backgroundImage = `url('./pics/${stadium}')`;

    this.colors = {
      1: ["red", `url('./pics/${fileNum}/${1}.png')`],
      2: ["orange", `url('./pics/${fileNum}/${2}.png')`],
      3: ["yellow", `url('./pics/${fileNum}/${3}.png')`],
      4: ["green", `url('./pics/${fileNum}/${4}.png')`],
      5: ["purple", `url('./pics/${fileNum}/${5}.png')`],
      6: ["pink", `url('./pics/${fileNum}/${6}.png')`],
      7: ["brown", `url('./pics/${fileNum}/${7}.png')`],
      8: ["blue", `url('./pics/${fileNum}/${8}.png')`],
      9: ["red", `url('./pics/${fileNum}/${1}.png')`],
      10: ["orange", `url('./pics/${fileNum}/${2}.png')`],
      11: ["yellow", `url('./pics/${fileNum}/${3}.png')`],
      12: ["green", `url('./pics/${fileNum}/${4}.png')`],
      13: ["purple", `url('./pics/${fileNum}/${5}.png')`],
      14: ["pink", `url('./pics/${fileNum}/${6}.png')`],
      15: ["brown", `url('./pics/${fileNum}/${7}.png')`],
      16: ["blue", `url('./pics/${fileNum}/${8}.png')`],
    };

    this.processing = false;
    this.shuffleElements();
  }

  numberOfItems() {
    if (this.width * this.height > 16 || (this.width * this.height) % 2 != 0) {
      return 0;
    }
    return this.width * this.height;
  }

  removeAndShift(obj, keysToRemove) {
    const values = Object.values(obj);

    keysToRemove.sort((a, b) => b - a);

    keysToRemove.forEach((key) => {
      values.splice(key - 1, 1);
    });

    const newObj = {};
    values.forEach((value, index) => {
      newObj[index + 1] = value;
    });

    return newObj;
  }

  shuffleElements() {
    let listOfShuffle = [];
    for (let i = 1; i <= 8 - this.numberOfItems() / 2; i++) {
      listOfShuffle.push(i);
      listOfShuffle.push(i + 8);
    }

    this.colors = this.removeAndShift(this.colors, listOfShuffle);

    let colorValues = Object.values(this.colors);
    for (let i = colorValues.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [colorValues[i], colorValues[j]] = [colorValues[j], colorValues[i]];
    }
    Object.keys(this.colors).forEach((key, index) => {
      this.colors[key] = colorValues[index];
    });
  }

  async clickHandler(number) {
    if (this.processing) return;
    this.processing = true;

    let selectedNumOne = this.getElementId(number);
    document.getElementById(selectedNumOne).style.pointerEvents = "none";
    document.getElementById(selectedNumOne).style.backgroundColor = "transparent";
    document.getElementById(selectedNumOne).style.backgroundImage =
      this.colors[number][1];
    document.getElementById(selectedNumOne).style.backgroundSize = "cover";

    if (this.variables.count === 0) {
      this.variables.firstTry = this.colors[number][0];
      this.variables.selectedColorOne = selectedNumOne;
    } else {
      this.variables.secondTry = this.colors[number][0];
      this.variables.selectedColorTwo = selectedNumOne;
    }

    this.variables.count++;
    if (this.variables.count === 2) {
      this.disableClicks();
      this.variables.count = 0;

      if (this.variables.firstTry === this.variables.secondTry) {
        this.resolving();
      } else {
        await this.restore();
      }

      this.enableClicks();
    }

    this.hasWon();

    this.variables.prevOne = selectedNumOne;
    this.processing = false;
  }

  async restore() {
    await new Promise((resolve) => {
      setTimeout(() => {
        document.getElementById(
          this.variables.selectedColorOne
        ).style.backgroundColor = "#b4b4b4";

        document.getElementById(
          this.variables.selectedColorOne
        ).style.backgroundImage = "none";

        document.getElementById(
          this.variables.selectedColorTwo
        ).style.backgroundColor = "#b4b4b4";

        document.getElementById(
          this.variables.selectedColorTwo
        ).style.backgroundImage = "none";

        document.getElementById(
          this.variables.selectedColorOne
        ).style.pointerEvents = "auto";
        document.getElementById(
          this.variables.selectedColorTwo
        ).style.pointerEvents = "auto";

        resolve();
      }, 350);
    });
  }

  async resolving() {
    const { selectedColorOne, selectedColorTwo } = this.variables;

    document.getElementById(selectedColorOne).style.pointerEvents = "none";
    document.getElementById(selectedColorTwo).style.pointerEvents = "none";

    this.variables.matches++;
  }

  hasWon() {
    if (this.variables.matches >= this.numberOfItems() / 2) {
      // document.getElementById("outer-box").style.display = "none";
      // document.getElementById("grid-size").style.display = "none";
      document.getElementById("memory-game").style.display = "none";
      document.getElementById("new-box").style.display = "block";
      //this is new
      document.getElementById("sec").innerHTML = `You took ${this.variables.seconds} seconds`;
    }
  }

  getElementId(number) {
    const elementMap = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
      10: "ten",
      11: "eleven",
      12: "twelve",
      13: "thirteen",
      14: "fourteen",
      15: "fifteen",
      16: "sixteen",
    };
    return elementMap[number];
  }

  disableClicks() {
    document.getElementById("main-box").style.pointerEvents = "none";
  }

  enableClicks() {
    document.getElementById("main-box").style.pointerEvents = "auto";
  }
}

module.exports = { Game };

/*

1️⃣ Resize the Image (change pixel dimensions)

If you want your image to be exactly 1920×1080 px:

Open your image in GIMP.

Go to Image → Scale Image…

In the dialog:

Set Width: 1920

Set Height: 1080

Make sure Interpolation is set to Cubic (good quality for scaling).

Click Scale.

✅ This changes the pixel dimensions, but it may stretch the image if the original aspect ratio isn’t 16:9.
*/