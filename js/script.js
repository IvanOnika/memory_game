"use strict";

const cardsFinder = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

const flipCard = (e) => {
  if (boardLocked) return;

  const target = e.target.parentElement;

  if (target === firstCard) return;

  target.classList.add("flip");
  console.log(target.dataset.framework);

  if (!hasFlippedCard) {
    hasFlippedCard = true;

    firstCard = target;
  } else {
    hasFlippedCard = false;

    secondCard = target;

    checkForPair();
  }
};

const checkForPair = () => {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  } else {
    boardLocked = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      boardLocked = false;
    }, 1000);
  }
};

cardsFinder.forEach((card) => {
  card.addEventListener("click", flipCard);

  const randomIndex = Math.floor(Math.random() * cardsFinder.length);
  card.style.order = randomIndex;
});
