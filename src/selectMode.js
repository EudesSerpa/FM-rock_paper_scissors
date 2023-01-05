import { $ } from "./helpers/selectNode.js";
import { removeClassNames } from "./helpers/removeClassNames.js";
import { initialStateGame, handleSelectionHand } from "./game.js";
import {
  boards,
  classNames,
  logos,
  modes,
  ruleImages,
  documentTitles,
} from "./constants.js";

const mainTag = $("main");
const modePage = $(".mode");
const gamePage = $(".game");

let mode = undefined;

document.title = documentTitles.default;

/**
 * Resets the game page to its initial state.
 * @returns {void}
 */
function initialStatePage() {
  gamePage.removeAttribute("data-game");

  document.title = documentTitles.default;

  removeClassNames({
    nodes: [
      ...Object.values(boards),
      ...Object.values(logos),
      ...Object.values(ruleImages),
    ],
    classNames: [classNames.ACTIVE],
  });
}

/**
 * Changes the active page.
 * @param {Object} param0 - An object containing the active page.
 * @param {HTMLElement} param0.activePage - The DOM element representing the active page.
 * @returns {void}
 */
function changePage({ activePage }) {
  mainTag.style.position = activePage === gamePage ? "relative" : "initial";

  removeClassNames({
    nodes: [modePage, gamePage],
    classNames: [classNames.ACTIVE],
  });

  activePage.classList.add(classNames.ACTIVE);
}

/**
 * Configures the active page to display its corresponding elements.
 * @param {Object} param0 - n object containing the mode and board values.
 * @param {HTMLElement} param0.board - The DOM element representing the board to synchronize with.
 * @returns {void}
 */
function synchronizePage({ board }) {
  // config board
  gamePage.setAttribute("data-game", mode);

  document.title =
    mode === modes.NORMAL
      ? documentTitles[modes.NORMAL]
      : documentTitles[modes.BONUS];

  // show board, logo and rules image
  board.classList.add(classNames.ACTIVE);
  logos[mode].classList.add(classNames.ACTIVE);
  ruleImages[mode].classList.add(classNames.ACTIVE);
}

function handleClick({ target }) {
  handleSelectionHand({ target, mode });
}

/**
 * Handles the selection mode.
 * @param {Event} event - The event object.
 * @param {HTMLElement} event.target - The DOM element that was clicked.
 * @returns {void}
 */
function handleSelectionMode({ target }) {
  if (target.tagName !== "BUTTON") return;

  mode = target.dataset.mode?.toLowerCase() || modes.NORMAL;
  const board = boards[mode];

  changePage({ activePage: gamePage });
  synchronizePage({ board });

  initialStateGame({ mode });

  $(
    `.game__content--${mode === modes.NORMAL ? modes.BONUS : modes.NORMAL}`
  ).removeEventListener("click", handleClick);

  const selectionBoard = $(`.game__content--${mode}`);
  selectionBoard.addEventListener("click", handleClick);
}

/**
 * Handles a change in game mode.
 * @param {Event} _evt - The event object.
 * @returns {void}
 */
function handleChangeMode(_evt) {
  initialStatePage();
  changePage({ activePage: modePage });
}

// Event listeners
$(".mode__buttons").addEventListener("click", handleSelectionMode);
$(".game__mode-btn").addEventListener("click", handleChangeMode);
