import { $ } from "./helpers/selectNode.js";
import { removeClassNames } from "./helpers/removeClassNames.js";
import { randomIndex } from "./helpers/randomIndex.js";
import { sleep } from "./helpers/sleep.js";
import {
  boards,
  bonusRules,
  classNames,
  hands,
  players,
  modes,
  RULES,
  resultMessages,
} from "./constants.js";

const INIT_SCORE = 0;
const SLEEP_TIME = 2000;

const score = $(".game__score");
const resultBanners = document.querySelectorAll(".game__result-banner");
const resultBannerButtons = document.querySelectorAll(".game__results-btn");
const [player1Button, player2Button] = document.querySelectorAll(
  ".game__choice-btn[data-step='2']"
);

/**
 * Renders a banner displaying the result of the game.
 * @param {Object} param0 - An object containing the winner and game mode.
 * @param {string} param0.winner - The winner of the game.
 * @param {string} param0.mode - The game mode.
 * @returns {void}
 */
const renderResultBanner = ({ winner, mode }) => {
  resultBanners.forEach((banner) => {
    banner.querySelector(".game__results-title").textContent =
      resultMessages[winner] || resultMessages.default;

    const button = banner.querySelector(".game__results-btn");

    if (winner) {
      button.classList.add(
        winner === players.PLAYER1
          ? classNames.RESULT_BTN_WIN
          : classNames.RESULT_BTN_LOSE
      );
    }

    button.onclick = () => initialStateGame({ mode });

    banner.classList.add(classNames.SHOW_BANNER);
  });
};

/**
 * Renders the specified hand on the provided node.
 * @param {Object} param0 - An object containing the hand and node to render the hand on.
 * @param {string} param0.hand - The hand to render.
 * @param {HTMLElement} param0.node - The node to render the hand on.
 * @returns {void}
 */
const renderHand = ({ hand, node }) => {
  node.classList.remove(classNames.WINNING_HAND);

  node.removeAttribute("data-hand");
  node.setAttribute("data-hand", hand);
  node.innerHTML = `<span class="visually-hidden">${hand}</span>`;
};

/**
 * Adds a class to the provided node to highlight it as the winning hand.
 * @param {Object} param0 - An object containing the node to add the class to.
 * @param {HTMLElement} param0.winningNode - The node to add the class to.
 * @returns {void}
 */
const addClassToWinner = ({ winningNode }) => {
  winningNode.classList.add(classNames.WINNING_HAND);
};

/**
 * Determines the winner of a game.
 * @param {Object} param0 - An object containing the player choices and game mode.
 * @param {string} param0.player1 - The hand choice of player 1.
 * @param {string} param0.player2 - The hand choice of player 2.
 * @param {string} param0.mode - The game mode.
 * @returns {string|null} The winner of the game, or null if the game is a draw.
 */
const getWinner = ({ player1, player2, mode }) => {
  if (player1 === player2) return null;

  const rules = mode === modes.NORMAL ? RULES : bonusRules;

  const isPlayer1Winner = rules[player1].includes(player2);

  return isPlayer1Winner ? players.PLAYER1 : players.PLAYER2;
};

/**
 * Get the score for the player based on whether they won or not.
 * @param {number} score - The current score.
 * @returns {Object} An object containing the updated score.
 */
const getNewScore = (score) => ({
  [players.PLAYER1]: score + 1,
  [players.PLAYER2]: score === 0 ? 0 : score - 1,
});

/**
 * Synchronizes the score on the page with the updated scores and save it in the local storage.
 * @param {Object} param0 - An object containing the winner and game mode.
 * @param {string} param0.winner - The winner of the game.
 * @param {string} param0.mode - The game mode.
 * @returns {void}
 */
const synchronizeScore = ({ winner, mode }) => {
  const prevScore = Number(score.textContent);
  const newScore = getNewScore(prevScore)[winner] ?? prevScore;
  score.textContent = newScore;

  localStorage.setItem(`${mode}-score`, newScore);
};

/**
 * Synchronizes the game boards by activating the specified board and deactivating the others.
 * @param {Object} param0 - An object containing the active board.
 * @param {HTMLElement} param0.activeBoard - The board that should be activated.
 * @returns {void}
 */
const synchronizeBoards = ({ activeBoard }) => {
  removeClassNames({
    nodes: Object.values(boards),
    classNames: [classNames.ACTIVE],
  });

  activeBoard.classList.add(classNames.ACTIVE);
};

/**
 * Resets the game to its initial state.
 * @param {Object} param0 - An object containing the game mode.
 * @param {string} param0.mode - The game mode.
 * @returns {void}
 */
export const initialStateGame = ({ mode }) => {
  synchronizeBoards({ activeBoard: boards[mode] });

  score.textContent = localStorage.getItem(`${mode}-score`) ?? INIT_SCORE;

  removeClassNames({
    nodes: [...resultBanners, ...resultBannerButtons],
    classNames: [
      classNames.SHOW_BANNER,
      classNames.RESULT_BTN_WIN,
      classNames.RESULT_BTN_LOSE,
    ],
  });

  removeClassNames({
    nodes: [player1Button, player2Button],
    classNames: [classNames.WINNING_HAND],
  });

  player1Button.removeAttribute("data-hand");
  player2Button.removeAttribute("data-hand");
};

/**
 * Begins a game with the given player choices and game mode, and displays the result to the user.
 * @param {Object} param - An object containing the player choices and game mode.
 * @param {string} param.player1 - The hand choice of player 1.
 * @param {string} param.player2 - The hand choice of player 2.
 * @param {string} param.mode - The game mode.
 * @returns {void}
 */
const game = ({ player1, player2, mode }) => {
  synchronizeBoards({ activeBoard: boards.game });

  renderHand({ hand: player1, node: player1Button });

  sleep(SLEEP_TIME).then(() => {
    renderHand({ hand: player2, node: player2Button });

    const winner = getWinner({ player1, player2, mode });

    if (winner) {
      const winningNode =
        winner === players.PLAYER1 ? player1Button : player2Button;
      addClassToWinner({ winningNode });
    }

    synchronizeScore({ winner, mode });
    renderResultBanner({ winner, mode });
  });
};

/**
 * Handles the player's selection of hand.
 * @param {Object} param - An object containing the target DOM element and game mode.
 * @param {HTMLElement} param.target - The target DOM element that was clicked.
 * @param {string} param.mode - The game mode.
 * @returns {void}
 */
export const handleSelectionHand = ({ target, mode }) => {
  if (target.tagName !== "BUTTON") return;

  const player1 = target.dataset.hand?.toLowerCase();
  const handsToChoice = hands[mode];
  const player2 = handsToChoice[randomIndex(handsToChoice)];

  game({ player1, player2, mode });
};
