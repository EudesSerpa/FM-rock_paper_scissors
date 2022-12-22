import { $ } from "./helpers/selectNode.js";

const modal = $(".rules-modal");
const openRulesBtn = $(".game__rules-btn");
const closeRulesBtn = $(".rules-modal__close-btn");

const openModal = (_evt) => {
  scrollTo({
    top,
  });
  modal.classList.add("open");
};

const closeModal = (_evt) => modal.classList.remove("open");

openRulesBtn.addEventListener("click", openModal);
closeRulesBtn.addEventListener("click", closeModal);
