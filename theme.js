
(function () {
  "use strict";

  const KEY = "ngajiplus-theme";

  function isDark() {
    return document.body.classList.contains("dark-mode") ||
           document.body.classList.contains("dark");
  }

  function applySavedTheme() {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    updateButton();
  }

  function updateButton() {
    const buttons = document.querySelectorAll(
      "#themeToggle, #themeBtn, .theme-toggle, .theme-btn, .ngp-theme-floating"
    );
    buttons.forEach(function (btn) {
      const dark = isDark();
      btn.textContent = dark ? "☀️" : "🌙";
      btn.title = dark ? "Gunakan Mode Terang" : "Gunakan Mode Gelap";
      btn.setAttribute("aria-label", dark ? "Gunakan Mode Terang" : "Gunakan Mode Gelap");
    });
  }

  function toggleTheme() {
    const nextDark = !isDark();

    document.body.classList.toggle("dark-mode", nextDark);

    // Beberapa halaman lama memakai class "dark".
    // Jangan menghapusnya; samakan agar semua halaman tetap kompatibel.
    if (document.body.classList.contains("dark")) {
      document.body.classList.toggle("dark", nextDark);
    }

    localStorage.setItem(KEY, nextDark ? "dark" : "light");
    updateButton();
  }

  function setup() {
    applySavedTheme();

    let buttons = document.querySelectorAll(
      "#themeToggle, #themeBtn, .theme-toggle, .theme-btn"
    );

    // Halaman lama tanpa tombol tema diberi tombol universal.
    if (!buttons.length) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ngp-theme-floating";
      btn.textContent = isDark() ? "☀️" : "🌙";
      btn.title = isDark() ? "Gunakan Mode Terang" : "Gunakan Mode Gelap";
      document.body.appendChild(btn);
      buttons = document.querySelectorAll(".ngp-theme-floating");
    }

    // Tombol lama (#themeToggle / #themeBtn) sudah mempunyai
    // handler sendiri. Kita hanya memasang handler pada tombol
    // universal yang dibuat oleh script ini.
    document.querySelectorAll(".ngp-theme-floating").forEach(function (btn) {
      if (btn.dataset.ngpThemeBound === "1") return;
      btn.dataset.ngpThemeBound = "1";
      btn.addEventListener("click", toggleTheme);
    });

    updateButton();
  }

  // Jalankan setelah body tersedia.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
