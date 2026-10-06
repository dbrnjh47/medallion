import { createImageGallery } from '/resources/js/custom/gallery/img.js';
createImageGallery('.centers__slider')();

// var swiper2 = new Swiper("#centers_slider", {
//   modules: [SwiperNavigation, SwiperAutoplay, SwiperScrollbar, SwiperMousewheel],
//   // autoplay: {
//   //     delay: 2000,
//   //     disableOnInteraction: false,
//   //     pauseOnMouseEnter: true,
//   // },
//   mousewheel: true,
//   slidesPerView: "auto",
//   centeredSlides: 1,
//   grabCursor: 1,
//   spaceBetween: 40,
//   keyboard: {
//       enabled: 1
//   },
//   // scrollbar: {
//   //     el: ".swiper-scrollbar"
//   // },
//   // navigation: {
//   //     nextEl: ".swiper-button-next",
//   //     prevEl: ".swiper-button-prev",
//   // },
//   // pagination: {
//   //     el: ".swiper-pagination",
//   //     clickable: 1
//   // },
// });

const nextBtn = document.querySelector('.centers .btn_slide.right');
const prevBtn = document.querySelector('.centers .btn_slide'); 

var slider = new Swiper("#centers_slider", {
  modules: [SwiperNavigation, SwiperAutoplay, SwiperMousewheel],
  // autoplay: {
  //     delay: 2000,
  //     disableOnInteraction: false,
  //     pauseOnMouseEnter: true,
  // },
  // loopAddBlankSlides: true,
  // loop: 1,

  mousewheel: true,
  slidesPerView: "auto",
  slidesPerGroup: 1,
  // centeredSlides: 1,
  grabCursor: 1,
  spaceBetween: 15,
  keyboard: {
      enabled: 1
  },
  navigation: {
    nextEl: nextBtn,
    prevEl: prevBtn,
  },
  breakpoints: {
    1200: { spaceBetween: 40, },
  }
});