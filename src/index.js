import { randomIndex } from "./helpers/randomIndex.js";
import { $ } from "./helpers/selectNode.js";

const boards = document.querySelectorAll(".game__board");
const selectionBoard = $(".game__content");
const score = $(".game__score");

const firstBoard = boards[0];
const secondBoard = boards[1];

const choices = ["rock", "paper", "scissors"];

const rules = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

const players = {
  PLAYER1: "player",
  PLAYER2: "machine",
};

const resultMessages = {
  [players.PLAYER1]: "You win",
  [players.PLAYER2]: "You lose",
};

const getWinner = ({ player1, player2 }) => {
  if (player1 === player2) return null;

  const isPlayer1Winner = rules[player1] === player2;

  return isPlayer1Winner ? players.PLAYER1 : players.PLAYER2;
};

const createResultBanner = ({ title }) => {
  const banner = document.createElement("div");
  const heading = document.createElement("h2");
  const button = document.createElement("button");

  banner.id = "resultBanner";

  heading.textContent = title;
  heading.classList.add("game__results-title");

  button.textContent = "Play again";
  button.classList.add("btn", "game__results-btn");
  button.onclick = () => {
    initState();
  };

  banner.append(heading, button);

  return banner;
};

const removeResultBannerNode = () => {
  const banner = $("#resultBanner");
  banner && secondBoard.removeChild(banner);
};

const renderResultBanner = ({ winner }) => {
  const banner = createResultBanner({ title: resultMessages[winner] || "Tie" });

  secondBoard.append(banner);
};

const renderChoices = ({ player1Choice, player2Choice, winner }) => {
  const [player1Button, player2Button] =
    secondBoard.querySelectorAll(".game__choice-btn");

  player1Button.classList.remove("game__choice-btn--winner");
  player2Button.classList.remove("game__choice-btn--winner");

  player1Button.setAttribute("data-choice", player1Choice);
  player2Button.setAttribute("data-choice", player2Choice);

  if (winner === players.PLAYER1) {
    player1Button.classList.add("game__choice-btn--winner");
  } else if (winner === players.PLAYER2) {
    player2Button.classList.add("game__choice-btn--winner");
  }
};

const setScore = (score) => ({
  [players.PLAYER1]: score + 1,
  [players.PLAYER2]: score === 0 ? 0 : score - 1,
});

const synchronizeScore = ({ winner }) => {
  const prevScore = Number(score.textContent);

  score.textContent = setScore(prevScore)[winner] ?? prevScore;

  localStorage.setItem("score", score.textContent);
};

const synchronizeBoards = ({ activeBoard }) => {
  boards.forEach((board) => {
    board.classList.remove("active");
  });

  activeBoard.classList.add("active");
};

const initState = () => {
  synchronizeBoards({ activeBoard: firstBoard });

  score.textContent = localStorage.getItem("score") ?? 0;

  removeResultBannerNode();
};

const game = ({ player1, player2 }) => {
  synchronizeBoards({ activeBoard: secondBoard });

  const winner = getWinner({ player1, player2 });

  renderChoices({ player1Choice: player1, player2Choice: player2, winner });
  synchronizeScore({ winner });
  renderResultBanner({ winner });
};

const handleSelection = ({ target }) => {
  if (target.tagName !== "BUTTON") return;

  const player1 = target.dataset.choice?.toLowerCase();
  const player2 = choices[randomIndex(choices)];

  game({ player1, player2 });
};

initState();

selectionBoard.addEventListener("click", handleSelection);
