$(document).ready(function () {
  //Set the colors
  var currentColor = "white";
  var colors = [
    "blue",
    "green",
    "red",
    "yellow",
    "orange",
    "pink",
    "white",
    "black",
    "brown",
    "lightgreen",
  ];

  //Get Game difficulty
  var typeMode = document.getElementById("modeType");
  // Get combination length
  var checkBoxSequence = document.getElementById("nSequence");
  checkBoxSequence.addEventListener("change", function () {
    var nSequence = parseInt(this.value);
    return nSequence;
  });

  //Generate non repeated numbers
  let haveIt = [];
  function generateUniqueRandom(maxNr) {
    //Generate random number
    let random = (Math.random() * maxNr).toFixed();

    //Coerce to number by boxing
    random = Number(random);

    if (!haveIt.includes(random)) {
      haveIt.push(random);
      return random;
    } else {
      if (haveIt.length < maxNr) {
        //Recursively generate number
        return generateUniqueRandom(maxNr);
      } else {
        console.log("No more numbers available.");
        return false;
      }
    }
  }

  //Check selected colors
  var checkBoxNColors = document.getElementById("nColors");
  checkBoxNColors.addEventListener("change", function () {
    var nColors = parseInt(this.value);
    return nColors;
  });

  //Define start button
  var startBtn = document.getElementById("start");
  //When start button is clicked
  $(startBtn).click(function () {
    if (
      nSequence.value == "Seleziona la sequenza" ||
      nColors.value == "Seleziona il numero possibile di colori" ||
      typeMode.value == "Modalità"
    ) {
      alert(
        "Seleziona la modalità di gioco, la sequenza e il numero possibile di colori prima di iniziare il gioco!"
      );
      return;
    }

    //Disable options
    checkBoxSequence.setAttribute("disabled", "");
    checkBoxNColors.setAttribute("disabled", "");
    startBtn.setAttribute("disabled", "");
    typeMode.setAttribute("disabled", "");
    colors.slice(0, -nColors);

    var hasWon = false;

    var currentBoardCells = [];
    var currentResultsCells = [];
    var cellColor = [];

    var currentBoardNumber = parseInt(nSequence.value);
    var currentResultsNumber = parseInt(nSequence.value);

    // Get the checkbox
    var isRepeatedColors = document.getElementById("repeatedColors");

    if (isRepeatedColors.checked == true) {
      repeatedColors = true;
    } else {
      repeatedColors = false;
    }

    //Disable checkbox
    isRepeatedColors.setAttribute("disabled", "");

    //Set sequence code
    var code = [];
    for (let i = 0; i < parseInt(nSequence.value); i++) {
      if (repeatedColors == true) {
        code[i] =
          colors[Math.floor(Math.random() * (parseInt(nColors.value) - 1))];
      } else {
        code[i] = colors[generateUniqueRandom(parseInt(nColors.value))];
      }

      currentBoardCells[i] = "board" + i;
      currentResultsCells[i] = "result" + i;
    }
    console.log(code);

    //Create color backgrounds
    for (var c = 0; c < parseInt(nColors.value); c++) {
      if (c < 5) {
        document
          .getElementById("colorsContent1")
          .insertAdjacentHTML(
            "beforeend",
            '<div class="square square-lg m-2"><button class="w-h-100 color" style="background-color:' +
              colors[c] +
              '" id="' +
              colors[c] +
              '"></div>'
          );
      } else {
        document
          .getElementById("colorsContent2")
          .insertAdjacentHTML(
            "beforeend",
            '<div class="square square-lg m-2"><button class="w-h-100 color" style="background-color:' +
              colors[c] +
              '" id="' +
              colors[c] +
              '"></div>'
          );
      }
    }

    var currentRow = 10;

    //Insert boards into the interface
    var boardId = 0;
    var resultId = 0;
    for (var i = 1; i <= 10; i++) {
      switch (typeMode.value) {
        case "easy":
          for (var s = 0; s < parseInt(nSequence.value); s++) {
            document
              .getElementById("slot" + i)
              .insertAdjacentHTML(
                "beforeend",
                '<div class="square square-lg m-2"><div class="container"><div class="row"><button class="w-h-100 socket" id="board' +
                  boardId +
                  '"></button></div><div class="row d-flex justify-content-center"><button class="w-h-100 result mt-2" disabled id="result"' +
                  boardId +
                  "></button></div></div></div>"
              );
            boardId++;
          }
          break;
        case "normal":
        case "difficult":
          for (var s = 0; s < parseInt(nSequence.value); s++, boardId++) {
            document
              .getElementById("slot" + i)
              .insertAdjacentHTML(
                "beforeend",
                '<div class="square square-lg m-2"><button class="w-h-100 socket" id="board' +
                  boardId +
                  '"></div>'
              );
          }
          switch (parseInt(nSequence.value)) {
            case 4:
              document
                .getElementById("slot" + i)
                .insertAdjacentHTML(
                  "beforeend",
                  '<div class="container" id="container' + i + '">'
                );
              document
                .getElementById("container" + i)
                .insertAdjacentHTML(
                  "beforeend",
                  '<div class="row"> <div class="d-flex"> <div class="square square-lg mr-1"><button class="w-h-100 result" id="result' +
                    resultId +
                    '" disabled></button></div><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    (resultId + 1) +
                    '"></div></div>'
                );
              resultId += 2;
              document
                .getElementById("container" + i)
                .insertAdjacentHTML(
                  "beforeend",
                  '<div class="row"><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    resultId +
                    '" disabled></button></div><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    (resultId + 1) +
                    '"></div></div>'
                );
              resultId += 2;
              break;
            case 5:
              document
                .getElementById("slot" + i)
                .insertAdjacentHTML(
                  "beforeend",
                  '<div class="container" id="container' + i + '">'
                );
              document
                .getElementById("container" + i)
                .insertAdjacentHTML(
                  "beforeend",
                  '<div class="row"> <div class="d-flex"> <div class="square square-lg mr-1"><button class="w-h-100 result" id="result' +
                    resultId +
                    '" disabled></button></div><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    (resultId + 1) +
                    '" disabled></button></div><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    (resultId + 2) +
                    '"></div></div>'
                );
              resultId += 3;
              document
                .getElementById("container" + i)
                .insertAdjacentHTML(
                  "beforeend",
                  '<div class="row"><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    resultId +
                    '" disabled></button></div><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    (resultId + 1) +
                    '"></div></div>'
                );
              resultId += 2;
              break;
            case 6:
              document
                .getElementById("slot" + i)
                .insertAdjacentHTML(
                  "beforeend",
                  '<div class="container" id="container' + i + '">'
                );
              document
                .getElementById("container" + i)
                .insertAdjacentHTML(
                  "beforeend",
                  '<div class="row"> <div class="d-flex"> <div class="square square-lg mr-1"><button class="w-h-100 result" id="result' +
                    resultId +
                    '" disabled></button></div><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    (resultId + 1) +
                    '" disabled></button></div><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    (resultId + 2) +
                    '"></div></div>'
                );
              resultId += 3;
              document
                .getElementById("container" + i)
                .insertAdjacentHTML(
                  "beforeend",
                  '<div class="row"> <div class="d-flex"> <div class="square square-lg mr-1"><button class="w-h-100 result" id="result' +
                    resultId +
                    '" disabled></button></div><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    (resultId + 1) +
                    '" disabled></button></div><div class="d-flex"><div class="square square-lg mr-1"><button class="w-h-100 result" disabled id="result' +
                    (resultId + 2) +
                    '"></div></div>'
                );
              resultId += 3;

              break;
          }

          break;
      }
    }

    //change the current color when the user clicks on the color board
    $(".color").click(function () {
      let color = $(this).attr("id");
      currentColor = color;
      $(".currentColor").css("background-color", color);
    });

    // change the color of a board cell on click
    $(".socket").click(function () {
      var id = $(this).attr("id");
      if (isValid(id)) {
        $(this).css("background-color", currentColor);
      }
    });

    // do actions when the submit button is clicked
    $(".submit").click(function () {
      var completed = true;
      for (var i = 0; i < parseInt(nSequence.value); i++) {
        cellColor[i] = document.getElementById(
          currentBoardCells[i]
        ).style.backgroundColor;
        if (cellColor[i] == "") {
          completed = false;
        }
      }
      if (completed == true) {
        checkWin();
        updateResults();
        changeCurrentRow();
      } else {
        alert("Prima completa tutta la sequenza!");
      }
    });

    function isValid(id) {
      if (currentBoardCells.includes(id) && hasWon === false) {
        return true;
      }
      return false;
    }

    //check if the player has won
    function checkWin() {
      hasWon = true;

      for (var c = 0; c < parseInt(nSequence.value); c++) {
        if (code[c] != cellColor[c]) {
          hasWon = false;
        }
      }
      if (hasWon == true) {
        alert(
          "Congratulations, you have won!\nThe code will now be displayed."
        );
      }
      return hasWon;
    }

    function changeCurrentRow() {
      currentRow -= 1;
      if (currentRow != 0) {
        for (let i = 0; i < parseInt(nSequence.value); i++) {
          currentBoardCells[i] = "board" + currentBoardNumber;
          currentBoardNumber++;
        }
      } else {
        alert("Hai perso! :(");
      }
    }

    function updateResults() {
      /*Mod facile: posso vedere quali sono nella posizione giusta con il colore giusto
      e nella posizione sbagliata ma con un colore presente nella sequenza e 
      quelli nella posizione sbagliata NON presenti nella sequenza
      
      Mod Normale: posso sapere se ci sono colori nella posizione giusta e con il colore giusto
      e quelli nella posizione sbagliata ma con un colore presente nella sequenza

      Mod difficile: posso sapere se ci sono colori nella posizione giusta con il colore giusto*/

      switch (typeMode.value) {
        case "easy":
          
          break;
        case "normal":
          for (var i = 0; i < parseInt(nSequence.value); i++) {
            if( == code[i]){
              
            }
          }
          break;
        case "difficult":
          break;
      }
    }
  });
});
