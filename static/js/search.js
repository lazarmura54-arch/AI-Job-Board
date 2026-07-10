const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", filterJobs);

function filterJobs() {
  const keyword = searchInput.value.toLowerCase();

  const location = document
    .getElementById("locationFilter")
    .value.toLowerCase();

  const type = document.getElementById("typeFilter").value.toLowerCase();

  const cards = document.querySelectorAll(".job-card");

  cards.forEach((card) => {
    const title = card.querySelector("h3").innerText.toLowerCase();

    const company = card.querySelector(".company-name").innerText.toLowerCase();

    const locationText = card.querySelectorAll("p")[1].innerText.toLowerCase();

    const typeText = card.querySelectorAll("p")[2].innerText.toLowerCase();

    const matchSearch = title.includes(keyword) || company.includes(keyword);

    const matchLocation = location === "" || locationText.includes(location);

    const matchType = type === "" || typeText.includes(type);

    if (matchSearch && matchLocation && matchType) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
