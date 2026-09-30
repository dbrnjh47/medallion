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