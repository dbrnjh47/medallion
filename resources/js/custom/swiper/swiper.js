import Swiper from "swiper";
import {
  Autoplay,
  Mousewheel,
  Navigation,
  Thumbs,
  Scrollbar,
  Grid,
  Pagination
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/grid";

import "./swiper.scss";

window.Swiper = Swiper;
window.SwiperAutoplay = Autoplay;
window.SwiperMousewheel = Mousewheel;
window.SwiperNavigation = Navigation;
window.SwiperThumbs = Thumbs;
window.SwiperScrollbar = Scrollbar;
window.SwiperGrid = Grid;
window.SwiperPagination = Pagination;

// 

import svgArrow from '/temple/images/app/arrow_slide.svg?raw';
const btns = document.querySelectorAll('.btn_slide');

btns.forEach(el => {
  el.insertAdjacentHTML('beforeend', svgArrow);
});