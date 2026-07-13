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

  const jobCards = document.querySelectorAll(".job-card");

  const chips = document.querySelectorAll(".filter-chip");

  /*==================================
            Filter Function
    ==================================*/

  function filterJobs() {
    const title = titleInput.value.trim().toLowerCase();

    const location = locationInput.value.trim().toLowerCase();

    const category = categorySelect.value.trim().toLowerCase();

    const experience = experienceSelect.value.trim().toLowerCase();

    let visible = 0;

    jobCards.forEach((card) => {
      const jobTitle = card.dataset.title || "";
      const jobCompany = card.dataset.company || "";
      const jobLocation = card.dataset.location || "";
      const jobCategory = card.dataset.category || "";
      const jobExperience = card.dataset.experience || "";

      const matchTitle =
        title === "" || jobTitle.includes(title) || jobCompany.includes(title);

      const matchLocation = location === "" || jobLocation.includes(location);

      const matchCategory = category === "" || jobCategory.includes(category);

      const matchExperience =
        experience === "" || jobExperience.includes(experience);

      if (matchTitle && matchLocation && matchCategory && matchExperience) {
        card.style.display = "";

        visible++;
      } else {
        card.style.display = "none";
      }
    });

    console.log(`${visible} job(s) found`);
  }

  /*==================================
            Submit
    ==================================*/

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    filterJobs();
  });

  /*==================================
            Live Search
    ==================================*/

  titleInput.addEventListener("input", filterJobs);

  locationInput.addEventListener("input", filterJobs);

  categorySelect.addEventListener("change", filterJobs);

  experienceSelect.addEventListener("change", filterJobs);

  /*==================================
            Popular Search Chips
    ==================================*/

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      titleInput.value = chip.textContent.trim();

      filterJobs();
    });
  });
});
