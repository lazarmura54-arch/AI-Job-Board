/*==================================================
                AI JOB BOARD
                SEARCH.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobSearchForm");

  if (!form) return;

  const titleInput = document.getElementById("jobSearch");
  const locationInput = document.getElementById("locationSearch");
  const categorySelect = document.getElementById("categoryFilter");
  const experienceSelect = document.getElementById("experienceFilter");

  const jobGrid = document.querySelector(".jobs-grid");
  const jobCards = document.querySelectorAll(".job-card");

  const chips = document.querySelectorAll(".search-chip, .filter-chip");

  /*==================================
            NO RESULTS MESSAGE
  ==================================*/

  const noResults = document.createElement("div");

  noResults.className = "no-results";

  noResults.style.display = "none";

  noResults.style.textAlign = "center";

  noResults.style.padding = "3rem";

  noResults.innerHTML = `
      <i class="fa-solid fa-face-frown" style="font-size:3rem;color:#6366f1;"></i>
      <h3 style="margin-top:1rem;">No Jobs Found</h3>
      <p>Try changing your search or filters.</p>
  `;

  jobGrid.after(noResults);

  /*==================================
            FILTER JOBS
  ==================================*/

  function filterJobs() {
    const title = titleInput.value.trim().toLowerCase();

    const location = locationInput.value.trim().toLowerCase();

    const category = categorySelect.value.trim().toLowerCase();

    const experience = experienceSelect.value.trim().toLowerCase();

    let visibleJobs = 0;

    jobCards.forEach((card) => {
      const jobTitle = (card.dataset.title || "").toLowerCase();

      const company = (card.dataset.company || "").toLowerCase();

      const jobLocation = (card.dataset.location || "").toLowerCase();

      const jobCategory = (card.dataset.category || "").toLowerCase();

      const jobExperience = (card.dataset.experience || "").toLowerCase();

      const titleMatch =
        !title || jobTitle.includes(title) || company.includes(title);

      const locationMatch = !location || jobLocation.includes(location);

      const categoryMatch = !category || jobCategory.includes(category);

      const experienceMatch = !experience || jobExperience.includes(experience);

      if (titleMatch && locationMatch && categoryMatch && experienceMatch) {
        card.style.display = "";

        visibleJobs++;
      } else {
        card.style.display = "none";
      }
    });

    if (visibleJobs === 0) {
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }
  }

  /*==================================
            RESET FILTERS
  ==================================*/

  function resetFilters() {
    titleInput.value = "";

    locationInput.value = "";

    categorySelect.selectedIndex = 0;

    experienceSelect.selectedIndex = 0;

    filterJobs();
  }

  /*==================================
            FORM SUBMIT
  ==================================*/

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    filterJobs();
  });

  /*==================================
            LIVE SEARCH
  ==================================*/

  titleInput.addEventListener("input", filterJobs);

  locationInput.addEventListener("input", filterJobs);

  categorySelect.addEventListener("change", filterJobs);

  experienceSelect.addEventListener("change", filterJobs);

  /*==================================
            SEARCH CHIPS
  ==================================*/

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      titleInput.value = chip.textContent.trim();

      filterJobs();
    });
  });

  /*==================================
            AUTO RESET
  ==================================*/

  [titleInput, locationInput].forEach((input) => {
    input.addEventListener("keyup", () => {
      if (
        titleInput.value === "" &&
        locationInput.value === "" &&
        categorySelect.value === "" &&
        experienceSelect.value === ""
      ) {
        resetFilters();
      }
    });
  });

  categorySelect.addEventListener("change", () => {
    if (
      titleInput.value === "" &&
      locationInput.value === "" &&
      categorySelect.value === "" &&
      experienceSelect.value === ""
    ) {
      resetFilters();
    }
  });

  experienceSelect.addEventListener("change", () => {
    if (
      titleInput.value === "" &&
      locationInput.value === "" &&
      categorySelect.value === "" &&
      experienceSelect.value === ""
    ) {
      resetFilters();
    }
  });
});
