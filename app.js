let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let msgTurnContainer = document.querySelector(".msgturn-container");
let msgTurn = document.querySelector("#msg-turn");
let newGameBtn = document.querySelector("#new-btn");
let resetBtn = document.querySelector("#reset-btn");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "X";
      box.style.color = "green";
      turnO = false;
    } else {
      box.innerText = "O";
      box.style.color = "orange";
      turnO = true;
    }
    box.disabled = true;
    playerTurn(box);
    checkWinner();
  });
});

const playerTurn = (box) => {
  msgTurnContainer.classList.remove("secrete");
  if (box.innerText == "X") {
    msgTurn.innerText = `O turn`;
  } else {
    msgTurn.innerText = `X turn`;
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  msgTurnContainer.classList.add("secrete");
  showGameContainer();
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation's ,Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  highlightWinner();
  hideGameContainer();
};

const showNoWinner = () => {
  msg.innerText = "It's a tie! No one wins.";
  msgContainer.classList.add("tie");
  msgContainer.classList.remove("hide");
  disableBoxes();
  hideGameContainer();
};

const hideGameContainer = () => {
  const mainContainer = document.querySelector("main");
  if (mainContainer) {
    mainContainer.style.display = "none";
  }
};

const showGameContainer = () => {
  const mainContainer = document.querySelector("main");
  if (mainContainer) {
    mainContainer.style.display = "block";
  }
};

const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        winnerFound = true;
        break;
      }
    }
  }

  if (!winnerFound) {
    let allBoxesFilled = true;

    for (let box of boxes) {
      if (box.innerText === "") {
        allBoxesFilled = false;
        break;
      }
    }
    if (allBoxesFilled) {
      showNoWinner();
    }
  }
};

const highlightWinner = () => {
  msgContainer.classList.add("winner");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
