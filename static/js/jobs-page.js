/*==================================================
        AI JOB BOARD - SEARCH & FILTERS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("jobSearch");

  const locationFilter = document.getElementById("locationFilter");
  const experienceFilter = document.getElementById("experienceFilter");
  const typeFilter = document.getElementById("typeFilter");

  const modeFilter = document.getElementById("modeFilter");

  const jobCards = document.querySelectorAll(".job-row");

  const jobCount = document.getElementById("jobCount");

  function filterJobs() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const locationValue = locationFilter.value.toLowerCase();

    const experienceValue = experienceFilter.value.toLowerCase();

    const typeValue = typeFilter.value.toLowerCase();

    const modeValue = modeFilter.value.toLowerCase();

    let visibleJobs = 0;

    jobCards.forEach((card) => {
      const title = card.dataset.title;

      const company = card.dataset.company;

      const location = card.dataset.location;

      const experience = card.dataset.experience;

      const type = card.dataset.type;

      const mode = card.dataset.mode;

      const skills = card.dataset.skills;

      const searchMatch =
        title.includes(searchValue) ||
        company.includes(searchValue) ||
        skills.includes(searchValue);

      const locationMatch =
        locationValue === "all locations" || location.includes(locationValue);

      const experienceMatch =
        experienceValue === "all" || experience.includes(experienceValue);

      const typeMatch = typeValue === "all" || type.includes(typeValue);

      const modeMatch = modeValue === "all" || mode.includes(modeValue);

      if (
        searchMatch &&
        locationMatch &&
        experienceMatch &&
        typeMatch &&
        modeMatch
      ) {
        card.style.display = "flex";

        visibleJobs++;
      } else {
        card.style.display = "none";
      }
    });

    jobCount.textContent = visibleJobs;
  }

  searchInput.addEventListener("keyup", filterJobs);

  locationFilter.addEventListener("change", filterJobs);

  experienceFilter.addEventListener("change", filterJobs);

  typeFilter.addEventListener("change", filterJobs);

  modeFilter.addEventListener("change", filterJobs);
});
