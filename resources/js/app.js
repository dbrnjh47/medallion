import "./custom/mask/phone.js";

import svgArrow from '/temple/images/main/ratings/star.svg?raw';

document.querySelectorAll('.star_list div').forEach(el => {
  el.insertAdjacentHTML('beforeend', svgArrow);
});

import svgBreadcrumb from '/temple/images/app/breadcrumb.svg?raw';

document.querySelectorAll('.breadcrumb__link.off').forEach(el => {
  el.insertAdjacentHTML('beforeend', svgBreadcrumb);
});

// 
import MicroModal from 'micromodal';

MicroModal.init();

// 

document.addEventListener('DOMContentLoaded', function() {

  const cookieNotice = document.getElementById('cookie-notice');
  const cookieAcceptBtn = document.getElementById('cookie-accept');

  if (!localStorage.getItem('cookiesAccepted')) {
      cookieNotice.style.display = 'block';
  }

  cookieAcceptBtn.addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieNotice.style.display = 'none';
  });

});