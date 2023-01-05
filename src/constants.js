import { $ } from "./helpers/selectNode.js";

const [normalLogo, bonusLogo] = document.querySelectorAll(".game__logo");
const [normalRuleImage, bonusRuleImage] = document.querySelectorAll(
  ".rules-modal__image"
);

export const classNames = {
  ACTIVE: "active",
  WINNING_HAND: "game__choice-btn--winner",
  RESULT_BTN_WIN: "game__results-btn--win",
  RESULT_BTN_LOSE: "game__results-btn--lose",
  SHOW_BANNER: "game__result-banner--show",
};

export const modes = {
  NORMAL: "normal",
  BONUS: "bonus",
};

export const documentTitles = {
  [modes.NORMAL]: "FM | Rock, Paper, Scissors Game",
  [modes.BONUS]:  "FM | Rock, Paper, Scissors, Lizard, Spock Game",
  default:  "FM | Selection Mode"
}

export const boards = {
  [modes.NORMAL]: $(".game__board[data-mode='normal']"),
  [modes.BONUS]: $(".game__board[data-mode='bonus']"),
  game: $(".game__board[data-step='2']"),
};

const HANDS = ["rock", "paper", "scissors"];

export const hands = {
  [modes.NORMAL]: HANDS,
  [modes.BONUS]: [...HANDS, "lizard", "spock"],
};

export const logos = {
  [modes.NORMAL]: normalLogo,
  [modes.BONUS]: bonusLogo,
};

export const ruleImages = {
  [modes.NORMAL]: normalRuleImage,
  [modes.BONUS]: bonusRuleImage,
};

export const RULES = {
  rock: ["scissors"],
  scissors: ["paper"],
  paper: ["rock"],
};

export const bonusRules = {
  rock: [...RULES.rock, "lizard"],
  scissors: [...RULES.scissors, "lizard"],
  paper: [...RULES.paper, "spock"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

export const players = {
  PLAYER1: "player",
  PLAYER2: "machine",
};

export const resultMessages = {
  [players.PLAYER1]: "You win",
  [players.PLAYER2]: "You lose",
  default: "It's a draw",
};
