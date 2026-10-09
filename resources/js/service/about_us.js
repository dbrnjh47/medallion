import svgArrow from '/temple/images/app/arrow_slide.svg?raw';
const btns = document.querySelectorAll('.about_us__more a');

btns.forEach(el => {
  el.insertAdjacentHTML('beforeend', svgArrow);
});

// 

// Данные слайдов

// Находим элементы
(() => {
  const aboutUs = document.querySelector('.about_us');
  if (!aboutUs) return;

  const titleEl = aboutUs.querySelector('.about_us__text h4');
  const textEl = aboutUs.querySelector('.about_us__text_content');
  const imgEl = aboutUs.querySelector('.app__text_block__banner img');
  const btnPrev = aboutUs.querySelector('.about_us__more_buttons .btn_slide:not(.right)');
  const btnNext = aboutUs.querySelector('.about_us__more_buttons .btn_slide.right');

  let currentIndex = 0;

  // Рендер слайда по индексу
  function renderSlide(index) {
    const slide = window.aboutUsSlides[index];
    if (!slide) return;

    // Обновляем контент
    if (titleEl) titleEl.textContent = slide.title;
    if (textEl) textEl.innerHTML = slide.text;
    if (imgEl) imgEl.src = slide.img;
  }

  // Инициализация: ставим первый слайд при загрузке
  renderSlide(currentIndex);


  btnPrev?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + window.aboutUsSlides.length) % window.aboutUsSlides.length;
    renderSlide(currentIndex);
  });

  btnNext?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % window.aboutUsSlides.length;
    renderSlide(currentIndex);
  });
})();