import { $ } from "./helpers/selectNode.js";

const modal = $(".rules-modal");
const modalBody = $(".rules-modal__content");
const openRulesBtn = $(".game__rules-btn");

const openModal = (_evt) => {
  scrollTo({
    top,
  });
  modal.classList.add("open");

  document.addEventListener("keyup", handleEscape);
};

const closeModal = () => {
  modal.classList.remove("open");

  document.removeEventListener("keyup", handleEscape);
};

const handleClick = ({ target }) => {
  if (target.tagName !== "BUTTON") return;

  closeModal();
};

const handleEscape = ({ code }) => {
  if (code !== "Escape") return;

  closeModal();
};

openRulesBtn.addEventListener("click", openModal);
modalBody.addEventListener("click", handleClick);
