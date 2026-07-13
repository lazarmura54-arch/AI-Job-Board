/*==================================================
                AI JOB BOARD
                COUNTER.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  if (counters.length === 0) return;

  let started = false;

  /*==================================
            Animate Counter
    ==================================*/

  function animateCounter(counter) {
    const target = Number(counter.dataset.target);

    const duration = 2000;

    const stepTime = 20;

    const totalSteps = duration / stepTime;

    const increment = target / totalSteps;

    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        counter.textContent = formatNumber(target);

        clearInterval(timer);
      } else {
        counter.textContent = formatNumber(Math.floor(current));
      }
    }, stepTime);
  }

  /*==================================
            Format Numbers
    ==================================*/

  function formatNumber(number) {
    if (number >= 1000) {
      return number.toLocaleString();
    }

    return number;
  }

  /*==================================
            Start Animation
    ==================================*/

  function startCounters() {
    if (started) return;

    started = true;

    counters.forEach((counter) => {
      animateCounter(counter);
    });
  }

  /*==================================
            Observe Statistics Section
    ==================================*/

  const statistics = document.querySelector(".statistics");

  if (!statistics) {
    startCounters();

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();

          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  observer.observe(statistics);
});
