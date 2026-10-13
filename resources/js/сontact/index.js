import "/resources/scss/сontact/index.scss";

import { initYandexMap } from '/resources/js/custom/yandex_map.js';

// Загружаем скрипт Яндекс.Карт динамически
const script = document.createElement('script');
script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
script.onload = () => {
  initYandexMap();
};
document.head.appendChild(script);