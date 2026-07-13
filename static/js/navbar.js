/*==================================================
                AI JOB BOARD
                NAVBAR.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const backToTop = document.getElementById("backToTop");
  const loader = document.getElementById("loader");

  /*==============================
            Safety Check
    ==============================*/

  if (!header || !menuToggle || !navMenu) {
    console.warn("Navbar elements not found.");
    return;
  }

  /*==============================
            Mobile Menu
    ==============================*/

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  /*==============================
            Close Menu
    ==============================*/

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  /*==============================
            Smooth Scroll
    ==============================*/

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId.startsWith("#")) return;

      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  /*==============================
            Active Section
    ==============================*/

  function updateActiveMenu() {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  /*==============================
            Scroll Events
    ==============================*/

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    updateActiveMenu();

    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  });

  /*==============================
            Outside Click
    ==============================*/

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });

  /*==============================
            ESC Key
    ==============================*/

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });

  /*==============================
            Hide Loader
    ==============================*/

  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
      }, 400);
    });
  }
});
