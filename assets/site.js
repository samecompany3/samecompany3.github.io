'use strict';
const filterButtons = document.querySelectorAll('[data-filter]');
const bonusCards = document.querySelectorAll('[data-category]');
const counter = document.getElementById('count');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    let visible = 0;
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    bonusCards.forEach(card => {
      card.hidden = selected !== 'すべて' && card.dataset.category !== selected;
      if (!card.hidden) visible += 1;
    });
    if (counter) counter.textContent = `${visible}件の特典`;
  });
});
