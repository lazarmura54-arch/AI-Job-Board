/*==================================================
                AI JOB BOARD
                APP.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 AI Job Board Initialized");

  initializeBackToTop();

  initializeScrollAnimations();
});

/*==================================
        Back To Top
==================================*/

function initializeBackToTop() {
  const button = document.getElementById("backToTop");

  if (!button) return;

  button.addEventListener("click", function (e) {
    e.preventDefault();

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

/*==================================
        Scroll Animations
==================================*/

function initializeScrollAnimations() {
  const elements = document.querySelectorAll(
    ".stat-card, .company-card, .job-card, .category-card, .why-card, .testimonial-card, .tech-card",
  );

  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          observer.unobserve(entry.target);
        }
      });
    },

    {
      threshold: 0.15,
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

/*==================================
        Window Loaded
==================================*/

window.addEventListener("load", () => {
  console.log("✅ All assets loaded.");
});

/*==================================
        Resize
==================================*/

window.addEventListener("resize", () => {
  console.log("Window Width:", window.innerWidth);
});

/*==========================================
    CLICKABLE JOB CARD
==========================================*/

document.querySelectorAll(".clickable-card").forEach((card) => {
  card.addEventListener("click", function () {
    window.location.href = this.dataset.url;
  });
});

document.querySelectorAll(".stop-card-click").forEach((element) => {
  element.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});
