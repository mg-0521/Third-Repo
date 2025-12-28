/* Getting HTML elements */
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnMsg = document.querySelector("#turn-msg");

/* Game state variables */

let turnO = true; // Player O starts first
let count = 0; // To track Ties

/* Winning Combination */

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

/* 🎯 Reset Game */
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  msg.classList.remove("player-o", "player-x");
  updateTurnMsg("Player O's Turn", "player-o");
};

/* 🎮 Box Click Event */
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("o");
      turnO = false;
      updateTurnMsg("Player X's Turn", "player-x");
    } else {
      box.innerText = "X";
      box.classList.add("x");
      turnO = true;
      updateTurnMsg("Player O's Turn", "player-o");
    }
    box.disabled = true; // Prevent clicking again
    count++; // Track number of moves

    let isWinner = checkWinner();

 /* If all 9 boxes are filled and no winner → Tie */

    if (count === 9 && !isWinner) {
      gameTie();
    }
  });
});

/* 🤝 Tie Game */
const gameTie = () => {
  msg.innerText = `🤝 Game is a Tie!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  turnMsg.innerText = "";
};

/* 🚫 Disable / Enable Boxes */
const disableBoxes = () => {
  for (let box of boxes) box.disabled = true;
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("o", "x");
  }
};

/* 🏆 Show Winner (with color) */
const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations, Player ${winner} Wins! 🎉`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  turnMsg.innerText = "";

  /* Add color based on winner */
  msg.classList.remove("player-o", "player-x");
  if (winner === "O") {
    msg.classList.add("player-o");
  } else {
    msg.classList.add("player-x");
  }
};

/* 🔍 Check for Winner  */
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

/* ✨ Update Turn Message */
const updateTurnMsg = (text, playerClass) => {
  turnMsg.innerText = text;

  /* Remove old color classes */
  turnMsg.classList.remove("player-o", "player-x");

  /* Apply new color class */
  turnMsg.classList.add(playerClass);

  /* Restart animation */
  turnMsg.style.animation = "none";
  turnMsg.offsetHeight; // trigger reflow
  turnMsg.style.animation = null;
};

/* 🔄 Button Events */
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

/* 🚀 Initial State */
updateTurnMsg("Player O's Turn", "player-o");
