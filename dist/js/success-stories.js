document.addEventListener('DOMContentLoaded', () => {

  /* AOS */
  if (typeof AOS !== 'undefined') {

    AOS.init({
      duration: 900,
      once: true
    });

  }

  /* Swiper */
  if (
    typeof Swiper !== 'undefined' &&
    document.querySelector('.swiper-stories')
  ) {

    new Swiper('.swiper-stories', {

      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,

      autoplay: {
        delay: 3500
      },

      pagination: {
        el: '.swiper-pagination-stories',
        clickable: true
      },

      breakpoints: {

        768: {
          slidesPerView: 2
        },

        1200: {
          slidesPerView: 3
        }

      }

    });

  }

});