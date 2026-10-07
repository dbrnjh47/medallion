import "/resources/scss/main/faq.scss";

import svgArrow from '/temple/images/main/faq/plus.svg?raw';

document.querySelectorAll('.faq .faq__trigger').forEach(el => {
  el.insertAdjacentHTML('beforeend', svgArrow);
});

// 

const faqTriggers = document.querySelectorAll(".faq__answer");
const faqClass = "open";

faqTriggers.forEach(trigger => {
  trigger.addEventListener("click", function () {
      const item = this.closest(".faq__item");
      if (!item) return;

      const isActive = item.classList.contains(faqClass);

      // Закрываем все обёртки
      document.querySelectorAll(".faq__item").forEach(el => {
          el.classList.remove(faqClass);
      });

      // Открываем текущую, если она была закрыта
      if (!isActive) {
          item.classList.add(faqClass);
      }
  });
});