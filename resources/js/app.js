import "./custom/mask/phone.js";

import svgArrow from '/temple/images/main/ratings/star.svg?raw';

document.querySelectorAll('.star_list div').forEach(el => {
  el.insertAdjacentHTML('beforeend', svgArrow);
});

import svgBreadcrumb from '/temple/images/app/breadcrumb.svg?raw';

document.querySelectorAll('.breadcrumb__link.off').forEach(el => {
  el.insertAdjacentHTML('beforeend', svgBreadcrumb);
});