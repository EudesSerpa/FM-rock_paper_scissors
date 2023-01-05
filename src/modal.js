import { $ } from "./helpers/selectNode.js";

const body = $("body");
const modal = $(".rules-modal");
const openRulesBtn = $(".game__rules-btn");

const openModal = (_evt) => {
  body.style.overflow = "hidden";
  modal.showModal();
};

const closeModal = () => {
  body.style.overflow = "";
  modal.close();
};

const handleClick = ({ target }) => {
  if (target.tagName !== "BUTTON") return;

  closeModal();
};

openRulesBtn.addEventListener("click", openModal);
modal.addEventListener("click", handleClick);
