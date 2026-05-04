document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentFile) {
      link.classList.add("active");
    }

    link.addEventListener("click", () => {
      if (siteNav) {
        siteNav.classList.remove("open");
      }
    });
  });

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      siteNav.classList.toggle("open");
    });
  }

  const searchInput = document.getElementById("search-books");
  const filterSelect = document.getElementById("book-filter");
  const bookCards = document.querySelectorAll(".book-card");

  function filterBooks() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const genre = filterSelect ? filterSelect.value : "all";

    bookCards.forEach((card) => {
      const title = card.querySelector("h2")?.textContent.toLowerCase() || "";
      const meta = card.querySelector(".book-meta")?.textContent.toLowerCase() || "";
      const matchesQuery = query === "" || title.includes(query) || meta.includes(query);
      const category = card.dataset.category || "all";
      const matchesGenre = genre === "all" || category.toLowerCase() === genre.toLowerCase();

      card.style.display = matchesQuery && matchesGenre ? "grid" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterBooks);
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", filterBooks);
  }
});
