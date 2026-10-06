const nextBtn = document.querySelector('#stocks_slider .btn_slide.right');
const prevBtn = document.querySelector('#stocks_slider .btn_slide'); 

var slider = new Swiper("#stocks_slider", {
  modules: [SwiperNavigation, SwiperAutoplay, SwiperMousewheel],
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
  spaceBetween: 48,
  keyboard: {
      enabled: 1
  },
  navigation: {
    nextEl: nextBtn,
    prevEl: prevBtn,
  },
  breakpoints: {
    800: { 
      slidesPerView: 2,
    },
    1400: { 
      slidesPerView: 3,
    },
  }
});