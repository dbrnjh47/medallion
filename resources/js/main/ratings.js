

// 

var slider = new Swiper("#ratings_slider", {
  modules: [SwiperNavigation, SwiperPagination, SwiperAutoplay, SwiperMousewheel],
  // autoplay: {
  //     delay: 2000,
  //     disableOnInteraction: false,
  //     pauseOnMouseEnter: true,
  // },
  // loopAddBlankSlides: true,
  // loop: 1,

  mousewheel: true,
  slidesPerView: 1,
  slidesPerGroup: 2,
  // centeredSlides: 1,
  grabCursor: 1,
  spaceBetween: 20,
  keyboard: {
    enabled: 1
  },
  pagination: {
    el: '#ratings_slider .swiper-pagination',
    clickable: true,
    // dynamicBullets: true,
  },
  breakpoints: {
    485: { slidesPerView: 2,},
    800: { slidesPerView: 3,},
    1150: { slidesPerView: 4, spaceBetween: 48,},
  }
});