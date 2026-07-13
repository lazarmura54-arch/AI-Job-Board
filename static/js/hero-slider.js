/*==================================================
                AI JOB BOARD
                HERO-SLIDER.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("heroSlider");

  if (!slider) return;

  const slides = slider.querySelectorAll(".slide");

  const dots = document.querySelectorAll(".dot");

  if (slides.length === 0) return;

  let currentSlide = 0;

  let sliderInterval;

  /*==================================
            Show Slide
    ==================================*/

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    slides[index].classList.add("active");

    if (dots[index]) {
      dots[index].classList.add("active");
    }

    currentSlide = index;
  }

  /*==================================
            Next Slide
    ==================================*/

  function nextSlide() {
    let next = currentSlide + 1;

    if (next >= slides.length) {
      next = 0;
    }

    showSlide(next);
  }

  /*==================================
            Previous Slide
    ==================================*/

  function previousSlide() {
    let previous = currentSlide - 1;

    if (previous < 0) {
      previous = slides.length - 1;
    }

    showSlide(previous);
  }

  /*==================================
            Auto Slide
    ==================================*/

  function startSlider() {
    sliderInterval = setInterval(nextSlide, 4000);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  /*==================================
            Dot Click
    ==================================*/

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopSlider();

      showSlide(index);

      startSlider();
    });
  });

  /*==================================
            Pause on Hover
    ==================================*/

  slider.addEventListener("mouseenter", stopSlider);

  slider.addEventListener("mouseleave", startSlider);

  /*==================================
            Keyboard Support
    ==================================*/

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      stopSlider();

      nextSlide();

      startSlider();
    }

    if (e.key === "ArrowLeft") {
      stopSlider();

      previousSlide();

      startSlider();
    }
  });

  /*==================================
            Touch Swipe
    ==================================*/

  let touchStartX = 0;

  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    if (touchStartX - touchEndX > 50) {
      stopSlider();

      nextSlide();

      startSlider();
    }

    if (touchEndX - touchStartX > 50) {
      stopSlider();

      previousSlide();

      startSlider();
    }
  });

  /*==================================
            Initialize
    ==================================*/

  showSlide(0);

  startSlider();
});
