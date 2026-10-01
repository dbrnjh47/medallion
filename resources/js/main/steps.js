window.step_index = 1;
const steps__img = document.querySelector('.steps__img');
const steps__text = document.querySelector('.steps__text');
const steps__img_item = steps__img.querySelector('.steps__img_item');
const steps__list = document.querySelector('.steps__list');
const steps__list_items = steps__list.querySelectorAll('li');
let running = true;
let autoPlayId = null;

window.setStep = function () {
  if (!steps__img || !steps__text) return;
  if (window.step_index === undefined || window.steps[window.step_index] === undefined) {
    return;
  }
  let step = window.steps[window.step_index];

  //
  steps__list_items.forEach(el => {
    el.classList.remove('steps__list_item_strong');
  });

  steps__text.querySelectorAll('div').forEach(el => {
    el.classList.remove('active');
  });

  // добавить текущему
  let item = steps__list.querySelector('li[data-index="'+window.step_index+'"]');
  item.classList.add('steps__list_item_strong');

  item = steps__text.querySelector('div[data-index="'+window.step_index+'"]');
  item.classList.add('active');

  // 

  const oldImg = steps__img_item.querySelector('img');
  if (oldImg) oldImg.remove();

  steps__img_item.insertAdjacentHTML('afterbegin', `
    <img src="/assets/main/steps/${step.img}" alt="Шаги лечения">
  `);
  steps__img.style.display = 'block';

  steps__img_item.className = 'steps__img_item steps__img_item_'+window.step_index;

  // 
}

window.setStep();
// 
steps__list_items.forEach(item => {
  item.addEventListener('click', () => {
    stopAutoPlay();
    // обновить индекс
    let index = item.dataset.index;
    window.step_index = Number(index);
    window.setStep();
  });
});

function stopAutoPlay() {
  if (autoPlayId) clearInterval(autoPlayId);
}

autoPlayId = setInterval(() => {
  if (!running) return;

  window.step_index++;
  if (window.step_index > 5) window.step_index = 1;
  window.setStep();
}, 5000);