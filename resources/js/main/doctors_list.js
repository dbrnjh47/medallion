var slider = new Swiper("#doctors_list_slider", {
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
  slidesPerGroup: 1,
  // centeredSlides: 1,
  grabCursor: 1,
  spaceBetween: 20,
  keyboard: {
    enabled: 1
  },
  pagination: {
    el: '#doctors_list_slider .swiper-pagination',
    clickable: true,
    // dynamicBullets: true,
  },
  breakpoints: {
    550: { slidesPerView: 2, slidesPerGroup: 2,},
    1250: { slidesPerView: 3,},
    1710: { slidesPerView: 4, spaceBetween: 48,},
  }
});