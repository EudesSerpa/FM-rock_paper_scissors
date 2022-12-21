const $ = (selector) => document.querySelector(selector);

// Rules Modal
const modal = $(".rules-modal");
const openRulesBtn = $(".game__rules-btn");
const closeRulesBtn = $(".rules-modal__close-btn");

const openModal = (_evt) => {
  $("body").style.overflow = "hidden";
  scrollTo({
    top,
  });
  modal.classList.add("open");
};

const closeModal = (_evt) => {
  modal.classList.remove("open");
  $("body").style.overflow = "initial";
};

openRulesBtn.addEventListener("click", openModal);
closeRulesBtn.addEventListener("click", closeModal);

// Board: Select hand
const choices = ["rock", "paper", "scissors"];

const rules = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

const results = {
  TIE: "Tie",
  WIN: "You win",
  LOSE: "You lose",
};

const boards = document.querySelectorAll(".game__board");
const choiceBoard = $(".game__content");
const score = $(".game__score");

const firstBoard = boards[0];
firstBoard.classList.add("active");

let playerScore = Number(localStorage.getItem("score")) ?? 0;
score.textContent = playerScore;

const createResultBanner = (title, isWinner = false) => {
  const banner = document.createElement("div");
  const heading = document.createElement("h2");
  const button = document.createElement("button");

  heading.classList.add("game__results-title");
  heading.textContent = title;

  button.classList.add(
    "btn",
    "game__results-btn",
    isWinner ? "game__results-btn--winner" : "game__results-btn--loser"
  );
  button.textContent = "Play again";
  button.onclick = () => {
    location.reload();
  };

  banner.append(heading, button);

  return banner;
};

choiceBoard.addEventListener("click", ({ target }) => {
  if (target.tagName !== "BUTTON") return;

  const playerChoice = target.dataset.choice?.toLowerCase();

  boards.forEach((board) => {
    board.classList.remove("active");
  });

  // Second board
  boards[1].classList.add("active");

  const buttons = boards[1].querySelectorAll(".game__choice-btn");
  buttons[0].setAttribute("data-choice", playerChoice);

  // Machine choice
  const machineChoice = choices[Math.floor(Math.random() * choices.length)];
  buttons[1].setAttribute("data-choice", machineChoice);

  let resultBanner = undefined;

  if (playerChoice === machineChoice) {
    resultBanner = createResultBanner(results.TIE);
    boards[1].append(resultBanner);
    return;
  }

  const isPlayerWinner = rules[playerChoice] === machineChoice;

  if (isPlayerWinner) {
    buttons[0].classList.add("game__choice-btn--winner");

    resultBanner = createResultBanner(results.WIN, true);

    playerScore += 1;
  } else {
    buttons[1].classList.add("game__choice-btn--winner");

    resultBanner = createResultBanner(results.LOSE);

    console.log(typeof playerScore);
    playerScore = playerScore === 0 ? 0 : playerScore - 1;
  }

  boards[1].append(resultBanner);

  score.textContent = playerScore;
  localStorage.setItem("score", playerScore);
});
