
const wrapper = document.querySelector('.price_tabel');

import svgArrow from '/temple/images/main/price_tabel/arrow.svg?raw';

wrapper.querySelectorAll('.price_tabel__steps_arrow').forEach(el => {
  el.insertAdjacentHTML('beforeend', svgArrow);
});

// 

const buttons = document.querySelectorAll('.price_tabel__steps__item');
const wrappers = document.querySelectorAll('.price_tabel__tebels_wrapper');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // если уже активен — ничего не делаем
    if (button.classList.contains('activ')) return;

    // убираем activ у всех кнопок
    buttons.forEach(b => b.classList.remove('activ'));

    // убираем activ у всех обёрток
    wrappers.forEach(w => w.classList.remove('activ'));

    // добавляем текущей кнопке
    button.classList.add('activ');

    // находим нужную обёртку и активируем
    const id = button.dataset.id; // предполагаем, что data-id есть у кнопки
    const target = document.querySelector(`.price_tabel__tebels_wrapper[data-id="${id}"]`);
    if (target) target.classList.add('activ');
  });
});