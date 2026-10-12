import svgArrow from '/temple/images/service/doctor_needed/check.svg?raw';

document.querySelectorAll('.doctor_needed__next a').forEach(el => {
  el.insertAdjacentHTML('afterbegin', svgArrow);
});