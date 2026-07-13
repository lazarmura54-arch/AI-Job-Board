/*==================================================
                AI JOB BOARD
                FAQ.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length === 0) return;

  /*==================================
            Initialize
    ==================================*/

  faqItems.forEach((item) => {
    const answer = item.querySelector(".faq-answer");

    if (!item.classList.contains("active")) {
      answer.style.maxHeight = "0px";
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });

  /*==================================
            Toggle FAQ
    ==================================*/

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    const answer = item.querySelector(".faq-answer");

    const icon = item.querySelector(".faq-icon i");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      /* Close All */

      faqItems.forEach((faq) => {
        faq.classList.remove("active");

        const faqAnswer = faq.querySelector(".faq-answer");

        const faqIcon = faq.querySelector(".faq-icon i");

        faqAnswer.style.maxHeight = "0px";

        faqIcon.classList.remove("fa-minus");

        faqIcon.classList.add("fa-plus");
      });

      /* Open Selected */

      if (!isActive) {
        item.classList.add("active");

        answer.style.maxHeight = answer.scrollHeight + "px";

        icon.classList.remove("fa-plus");

        icon.classList.add("fa-minus");
      }
    });

    /*==============================
                Keyboard Support
        ==============================*/

    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();

        question.click();
      }
    });
  });
});
