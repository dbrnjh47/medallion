
const wrapper = document.querySelector('.price_tabel');

import svgArrow from '/temple/images/main/price_tabel/arrow.svg?raw';

wrapper.querySelectorAll('.price_tabel__steps_arrow').forEach(el => {
  el.insertAdjacentHTML('beforeend', svgArrow);
});