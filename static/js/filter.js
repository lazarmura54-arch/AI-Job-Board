/*==================================================
                AI JOB BOARD
                FILTER.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const jobGrid = document.querySelector(".jobs-grid");

  if (!jobGrid) return;

  const jobCards = [...document.querySelectorAll(".job-card")];

  const sortSelect = document.getElementById("sortJobs");

  const resetButton = document.getElementById("resetFilters");

  const featuredButton = document.getElementById("featuredFilter");

  const remoteButton = document.getElementById("remoteFilter");

  /*==================================
            Sort Jobs
    ==================================*/

  function sortJobs(type) {
    const sorted = [...jobCards];

    switch (type) {
      case "title":
        sorted.sort((a, b) => {
          const titleA = a.dataset.title || "";

          const titleB = b.dataset.title || "";

          return titleA.localeCompare(titleB);
        });

        break;

      case "company":
        sorted.sort((a, b) => {
          const companyA = a.dataset.company || "";

          const companyB = b.dataset.company || "";

          return companyA.localeCompare(companyB);
        });

        break;

      default:
        return;
    }

    sorted.forEach((card) => jobGrid.appendChild(card));
  }

  /*==================================
            Reset
    ==================================*/

  function resetJobs() {
    jobCards.forEach((card) => {
      card.style.display = "";
    });

    if (sortSelect) {
      sortSelect.selectedIndex = 0;
    }
  }

  /*==================================
            Featured Filter
    ==================================*/

  function showFeatured() {
    jobCards.forEach((card) => {
      const featured = card.querySelector(".featured-badge");

      card.style.display = featured ? "" : "none";
    });
  }

  /*==================================
            Remote Filter
    ==================================*/

  function showRemote() {
    jobCards.forEach((card) => {
      const location = (card.dataset.location || "").toLowerCase();

      card.style.display = location.includes("remote") ? "" : "none";
    });
  }

  /*==================================
            Events
    ==================================*/

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      sortJobs(this.value);
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetJobs);
  }

  if (featuredButton) {
    featuredButton.addEventListener("click", showFeatured);
  }

  if (remoteButton) {
    remoteButton.addEventListener("click", showRemote);
  }
});
