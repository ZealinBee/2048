

document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  let box = [];
  const width = 4;
  let score = 0;


  function create() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      box.push(square);
    }
    generate();
    generate();
  }
  create();


  

  function moveR() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let total1 = box[i].innerHTML;
        let totalTwo = box[i + 1].innerHTML;
        let totalThree = box[i + 2].innerHTML;
        let totalFour = box[i + 3].innerHTML;
        let row = [
          parseInt(total1),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        box[i].innerHTML = newRow[0];
        box[i + 1].innerHTML = newRow[1];
        box[i + 2].innerHTML = newRow[2];
        box[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveL() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let total1 = box[i].innerHTML;
        let totalTwo = box[i + 1].innerHTML;
        let totalThree = box[i + 2].innerHTML;
        let totalFour = box[i + 3].innerHTML;
        let row = [
          parseInt(total1),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        box[i].innerHTML = newRow[0];
        box[i + 1].innerHTML = newRow[1];
        box[i + 2].innerHTML = newRow[2];
        box[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function generate() {
    randomNumber = Math.floor(Math.random() * box.length);
    if (box[randomNumber].innerHTML == 0) {
      box[randomNumber].innerHTML = 2;
      checkForGameOver();
    } else generate();
  }

 

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let total1 = box[i].innerHTML;
      let totalTwo = box[i + width].innerHTML;
      let totalThree = box[i + width * 2].innerHTML;
      let totalFour = box[i + width * 3].innerHTML;
      let column = [
        parseInt(total1),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      box[i].innerHTML = newColumn[0];
      box[i + width].innerHTML = newColumn[1];
      box[i + width * 2].innerHTML = newColumn[2];
      box[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let total1 = box[i].innerHTML;
      let totalTwo = box[i + width].innerHTML;
      let totalThree = box[i + width * 2].innerHTML;
      let totalFour = box[i + width * 3].innerHTML;
      let column = [
        parseInt(total1),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      box[i].innerHTML = newColumn[0];
      box[i + width].innerHTML = newColumn[1];
      box[i + width * 2].innerHTML = newColumn[2];
      box[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (box[i].innerHTML === box[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(box[i].innerHTML) + parseInt(box[i + 1].innerHTML);
        box[i].innerHTML = combinedTotal;
        box[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (box[i].innerHTML === box[i + width].innerHTML) {
        let combinedTotal =
          parseInt(box[i].innerHTML) +
          parseInt(box[i + width].innerHTML);
        box[i].innerHTML = combinedTotal;
        box[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }


  function control(e) {
    if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }



  document.addEventListener("keyup", control);

  function keyRight() {
    moveR();
    combineRow();
    moveR();
    generate();
  }


  function keyLeft() {
    moveL();
    combineRow();
    moveL();
    generate();
  }


  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
  }



  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
  }



  function checkForWin() {
    for (let i = 0; i < box.length; i++) {
      if (box[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "Congrats!";
        document.removeEventListener("keyup", control);
        setTimeout(() => clear(), 3000);
      }
    }
  }

  function clear() {
    clearInterval(myTimer);
  }

  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < box.length; i++) {
      if (box[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "game over";
      document.removeEventListener("keyup", control);
      setTimeout(() => clear(), 3000);
    }
  }

  function addColours() {
    for (let i = 0; i < box.length; i++) {
      if (box[i].innerHTML == 0)
        box[i].style.backgroundColor = "#afa192";
      else if (box[i].innerHTML == 2)
        box[i].style.backgroundColor = "#eee4da";
      else if (box[i].innerHTML == 4)
        box[i].style.backgroundColor = "#ede0c8";
      else if (box[i].innerHTML == 8)
        box[i].style.backgroundColor = "#f2b179";
      else if (box[i].innerHTML == 16)
        box[i].style.backgroundColor = "#ffcea4";
      else if (box[i].innerHTML == 32)
        box[i].style.backgroundColor = "#e8c064";
      else if (box[i].innerHTML == 64)
        box[i].style.backgroundColor = "#ffab6e";
      else if (box[i].innerHTML == 128)
        box[i].style.backgroundColor = "#fd9982";
      else if (box[i].innerHTML == 256)
        box[i].style.backgroundColor = "#ead79c";
      else if (box[i].innerHTML == 512)
        box[i].style.backgroundColor = "#76daff";
      else if (box[i].innerHTML == 1024)
        box[i].style.backgroundColor = "#beeaa5";
      else if (box[i].innerHTML == 2048)
        box[i].style.backgroundColor = "#d7d4f0";
    }
  }
  addColours();


  // shadow wizard money gangggg
  var myTimer = setInterval(addColours, 25);
});
