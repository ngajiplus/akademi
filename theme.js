(function () {
  "use strict";

  const KEY = "ngajiplus-theme";

  function isDark() {
    return document.body.classList.contains("dark-mode") ||
           document.body.classList.contains("dark");
  }

  function updateButtons() {
    const dark = isDark();
    document.querySelectorAll(
      "#themeToggle, #themeBtn, .theme-toggle, .theme-btn, .ngp-theme-floating"
    ).forEach(function (btn) {
      btn.textContent = dark ? "☀️" : "🌙";
      btn.title = dark ? "Gunakan Mode Terang" : "Gunakan Mode Gelap";
      btn.setAttribute("aria-label", dark ? "Gunakan Mode Terang" : "Gunakan Mode Gelap");
    });
  }

  function applyTheme(theme) {
    const dark = theme === "dark";
    document.body.classList.toggle("dark-mode", dark);
    document.body.classList.toggle("dark", dark);
    localStorage.setItem(KEY, dark ? "dark" : "light");
    updateButtons();
  }

  function toggleTheme() {
    applyTheme(isDark() ? "light" : "dark");
  }

  window.toggleTheme = toggleTheme;
  window.toggleDashboardTheme = toggleTheme;

  function setup() {
    const saved = localStorage.getItem(KEY) || "light";
    applyTheme(saved);

    document.querySelectorAll(
      "#themeToggle, #themeBtn, .theme-toggle, .theme-btn"
    ).forEach(function (btn) {
      if (btn.dataset.ngpThemeBound === "1") return;
      btn.dataset.ngpThemeBound = "1";
      btn.addEventListener("click", function (event) {
        // Buttons with an inline onclick are intentionally allowed to work once.
        if (btn.getAttribute("onclick")) return;
        event.preventDefault();
        toggleTheme();
      });
    });

    if (!document.querySelector("#themeToggle, #themeBtn, .theme-toggle, .theme-btn, .ngp-theme-floating")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ngp-theme-floating";
      btn.addEventListener("click", toggleTheme);
      document.body.appendChild(btn);
    }

    updateButtons();
  }

  window.addEventListener("storage", function (event) {
    if (event.key === KEY && event.newValue) {
      applyTheme(event.newValue);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
