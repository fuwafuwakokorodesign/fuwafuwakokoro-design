document.addEventListener("DOMContentLoaded", () => {
    /* 1. ハンバーガーメニュー制御 */
    const hamburger = document.querySelector(".hamburger");
    const spMenu = document.querySelector(".sp-menu");

    if (hamburger && spMenu) {
        const toggleMenu = () => {
            hamburger.classList.toggle("open");
            spMenu.classList.toggle("active");
        };

        hamburger.addEventListener("click", toggleMenu);
        hamburger.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") toggleMenu();
        });

        document.querySelectorAll(".sp-menu a").forEach((link) => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("open");
                spMenu.classList.remove("active");
            });
        });
    }

    /* 2. トップへ戻るボタンの滑らかなスクロール */
    const toTopBtn = document.querySelector(".to-top a");
    if (toTopBtn) {
        toTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
