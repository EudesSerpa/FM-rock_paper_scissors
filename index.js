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
const board = $(".game__content");

board.addEventListener("click", ({ target }) => {
  if (target.tagName !== "BUTTON") return;

  const choice = target.dataset.choice?.toLowerCase();
  console.log(
    "🚀 ~ file: index.js:31 ~ board.addEventListener ~ choice",
    choice
  );
});
