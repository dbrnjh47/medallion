const header = document.querySelector('.header');
const wrapper = document.querySelector('body');
const scrollTarget = document.body;
const THRESHOLD = 50;

let ticking = false;

scrollTarget.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      header.classList.toggle('header__bg', wrapper.scrollTop > THRESHOLD);
      ticking = false;
    });
    ticking = true;
  }
});

// 

import svgArrow from '/temple/images/layout/header/arrow.svg?raw';

wrapper.querySelectorAll('.header__menu_arrow').forEach(el => {
  el.insertAdjacentHTML('beforeend', svgArrow);
});

//

document.addEventListener('DOMContentLoaded', () => {
  const header__menu = document.querySelector('.header__menu');
  const searchBlock = document.querySelector('.header__search');
  if (!searchBlock) {return;}

  const searchIcon = searchBlock.querySelector('svg');
  if (!searchIcon) {return;}

  searchIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      header__menu.style.display = "none";
      searchBlock.classList.toggle('header__search__open');
  });

  document.addEventListener('click', (e) => {
      if (!searchBlock.contains(e.target)) {
        header__menu.style.display = "flex";
          searchBlock.classList.remove('header__search__open');
      }
  });
});