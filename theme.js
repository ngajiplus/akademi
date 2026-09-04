/* =========================================================
   NGAJIPLUS AKADEMI
   GLOBAL THEME SYSTEM
   Versi 1.0
========================================================= */

(function () {

    const STORAGE_KEY = "ngajiplus-theme";

    /* =====================================================
       AMBIL TEMA
    ===================================================== */

    function getSavedTheme() {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (
            saved === "dark" ||
            saved === "light"
        ) {
            return saved;
        }

        if (
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
        ) {
            return "dark";
        }

        return "light";
    }


    /* =====================================================
       TERAPKAN TEMA
    ===================================================== */

    function applyGlobalTheme(theme) {

        if (theme !== "dark") {
            theme = "light";
        }

        /* HTML */

        document.documentElement
            .setAttribute(
                "data-theme",
                theme
            );


        /* BODY
           Dipertahankan agar halaman lama
           yang memakai body.dark tetap kompatibel.
        */

        if (document.body) {

            document.body.classList.toggle(
                "dark",
                theme === "dark"
            );

            document.body.classList.toggle(
                "dark-mode",
                theme === "dark"
            );

        }


        /* Simpan */

        localStorage.setItem(
            STORAGE_KEY,
            theme
        );


        /* Theme color browser */

        const themeColor =
            document.getElementById(
                "themeColor"
            );

        if (themeColor) {

            themeColor.setAttribute(
                "content",
                theme === "dark"
                    ? "#07120d"
                    : "#009b59"
            );

        }


        /* Semua tombol tema */

        document
            .querySelectorAll(
                "#themeBtn, .theme-btn, .themebtn"
            )
            .forEach(function (button) {

                button.textContent =
                    theme === "dark"
                        ? "☀️"
                        : "🌙";

                button.title =
                    theme === "dark"
                        ? "Mode terang"
                        : "Mode gelap";

                button.setAttribute(
                    "aria-label",
                    theme === "dark"
                        ? "Aktifkan mode terang"
                        : "Aktifkan mode gelap"
                );

            });


        /* Event untuk komponen lain */

        window.dispatchEvent(
            new CustomEvent(
                "ngajiplus-theme-change",
                {
                    detail: {
                        theme: theme
                    }
                }
            )
        );

    }


    /* =====================================================
       TOGGLE
    ===================================================== */

    function toggleGlobalTheme() {

        const current =
            document.documentElement
                .getAttribute("data-theme") ||
            "light";

        applyGlobalTheme(
            current === "dark"
                ? "light"
                : "dark"
        );

    }


    /* =====================================================
       FUNGSI GLOBAL
       Kompatibel dengan kode lama
    ===================================================== */

    window.applyGlobalTheme =
        applyGlobalTheme;

    window.toggleGlobalTheme =
        toggleGlobalTheme;

    window.toggleTheme =
        toggleGlobalTheme;

    window.toggleDashboardTheme =
        toggleGlobalTheme;


    /* =====================================================
       TERAPKAN SECEPAT MUNGKIN
    ===================================================== */

    applyGlobalTheme(
        getSavedTheme()
    );


    /* =====================================================
       SINKRONISASI ANTAR TAB
    ===================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === STORAGE_KEY &&
                (
                    event.newValue === "dark" ||
                    event.newValue === "light"
                )
            ) {

                applyGlobalTheme(
                    event.newValue
                );

            }

        }
    );


})();
