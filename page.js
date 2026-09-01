document.addEventListener("DOMContentLoaded", () => {
    /* ===================================================
       A. トップページ用の処理 (要素がある場合のみ実行)
    =================================================== */

    /* 1. 星空の生成 */
    const starsContainer = document.querySelector(".fv-stars");
    if (starsContainer) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i <= 100; i++) {
            const starEl = document.createElement("span");
            starEl.className = "star";
            const size = Math.random() * 2 + 1;
            starEl.style.width = `${size}px`;
            starEl.style.height = `${size}px`;
            starEl.style.left = `${Math.random() * 100}%`;
            starEl.style.top = `${Math.random() * 100}%`;
            starEl.style.animationDelay = `${Math.random() * 10}s`;
            fragment.appendChild(starEl);
        }
        starsContainer.appendChild(fragment);
    }

    /* 2. 流れ星の生成 */
    const layer = document.querySelector(".fv-shooting-layer");
    const fv = document.querySelector(".main-visual");

    if (layer && fv) {
        function createShootingStar() {
            const star = document.createElement("div");
            star.classList.add("shooting-star");

            const duration = Math.random() * 1 + 0.8;
            const length = Math.random() * 80 + 80;

            const directions = [
                {
                    moveX: -600,
                    moveY: 600,
                    rotate: 135,
                    startX: window.innerWidth * 0.8,
                    startY: window.innerHeight * 0.4,
                },
                {
                    moveX: 600,
                    moveY: 600,
                    rotate: 45,
                    startX: window.innerWidth * 0.2,
                    startY: window.innerHeight * 0.4,
                },
                {
                    moveX: -600,
                    moveY: 600,
                    rotate: 135,
                    startX: window.innerWidth * 0.8,
                    startY: window.innerHeight * 0.1,
                },
                {
                    moveX: 600,
                    moveY: 600,
                    rotate: 45,
                    startX: window.innerWidth * 0.2,
                    startY: window.innerHeight * 0.1,
                },
            ];

            const dir =
                directions[Math.floor(Math.random() * directions.length)];

            star.style.setProperty("--moveX", dir.moveX + "px");
            star.style.setProperty("--moveY", dir.moveY + "px");
            star.style.setProperty("--rotate", dir.rotate + "deg");

            star.style.left = dir.startX + "px";
            star.style.top = dir.startY + "px";
            star.style.width = length + "px";
            star.style.animation = `fall ${duration}s linear forwards`;

            layer.appendChild(star);
            setTimeout(() => star.remove(), duration * 1000);
        }
        setInterval(createShootingStar, 3000);
    }

    /* 3. スクロールイベント制御 */
    const cloud1 = document.querySelector(".cloud-set1");
    const cloud2 = document.querySelector(".cloud-set2");
    const cloud3 = document.querySelector(".cloud-set3");
    const moon2 = document.querySelector(".moon2");

    const message = document.querySelector("#message");
    const about = document.querySelector("#about");
    const works = document.querySelector("#works");
    const flow = document.querySelector("#flow");

    const hamburgerEl = document.querySelector(".hamburger");
    const headerNav = document.querySelector(".header-nav");
    const logo = document.querySelector(".logo");
    const allClouds = document.querySelectorAll(".cloud-set, .moon2");

    let isTicking = false;

    /* 固定状態フラグ */
    let cloud1Fixed = false;
    let cloud2Fixed = false;
    let cloud3Fixed = false;
    let moon2Fixed = false;

    function onScroll() {
        const scrollY = window.scrollY;

        const messageTop = message ? message.offsetTop : 0;
        const aboutTop = about ? about.offsetTop : 0;
        const worksTop = works ? works.offsetTop : 0;

        const aboutBottom = about ? aboutTop + about.offsetHeight : 0;
        const worksBottom = works ? worksTop + works.offsetHeight : 0;
        const flowBottom = flow ? flow.offsetTop + flow.offsetHeight : 0;

        const isMobile = window.innerWidth <= 768;

        const Z = {
            cloud: 15,
            moon: 2,
            content: 10,
        };

        // スマホ版とPC版で固定するトップ位置を適切に調整
        const cloudTop1 = isMobile ? "60px" : "100px";
        const cloudTop2 = isMobile ? "70px" : "110px";
        const cloudTop3 = isMobile ? "60px" : "100px";
        /* --- cloud1 --- */
        const trigger1 = messageTop - (isMobile ? 100 : 300);

        if (!cloud1Fixed && scrollY > trigger1) {
            cloud1Fixed = true;
            cloud1.classList.add("cloud-fixed");
            cloud1.style.top = cloudTop1;
            cloud1.style.zIndex = Z.cloud;
        } else if (cloud1Fixed && scrollY <= trigger1) {
            cloud1Fixed = false;
            cloud1.classList.remove("cloud-fixed");
            cloud1.style.top = "";
            cloud1.style.zIndex = "";
        }

        /* --- cloud2 + moon2 --- */
        const trigger2 = aboutTop - (isMobile ? 100 : 300);

        if (!cloud2Fixed && scrollY > trigger2) {
            cloud2Fixed = true;
            cloud2.classList.add("cloud-fixed");
            cloud2.style.top = cloudTop2;
            cloud2.style.zIndex = Z.cloud;

            if (moon2 && !moon2Fixed) {
                moon2Fixed = true;
                moon2.style.position = "fixed";
                moon2.style.top = isMobile ? "50px" : "30px";
                moon2.style.right = "10%";
                moon2.style.zIndex = Z.moon;
            }
        } else if (cloud2Fixed && scrollY <= trigger2) {
            cloud2Fixed = false;
            cloud2.classList.remove("cloud-fixed");
            cloud2.style.top = "";
            cloud2.style.zIndex = "";

            if (moon2Fixed) {
                moon2Fixed = false;
                moon2.style.position = "";
                moon2.style.top = "";
                moon2.style.right = "";
                moon2.style.zIndex = "";
            }
        }

        /* --- cloud3 --- */
        const trigger3 = worksTop - (isMobile ? 100 : 300);

        if (!cloud3Fixed && scrollY > trigger3) {
            cloud3Fixed = true;
            cloud3.classList.add("cloud-fixed");
            cloud3.style.top = cloudTop3;
            cloud3.style.zIndex = Z.cloud;
        } else if (cloud3Fixed && scrollY <= trigger3) {
            cloud3Fixed = false;
            cloud3.classList.remove("cloud-fixed");
            cloud3.style.top = "";
            cloud3.style.zIndex = "";
        }

        /* --- コンテンツの z-index --- */
        document
            .querySelectorAll(".section, #about, #works, #flow, #contact")
            .forEach((el) => (el.style.zIndex = Z.content));

        /* --- ヘッダー色切り替え --- */
        if (headerNav && logo && hamburgerEl) {
            if (scrollY >= aboutBottom - 100 && scrollY < flowBottom - 100) {
                headerNav.classList.add("after-works");
                logo.classList.add("after-works");
                hamburgerEl.classList.add("after-works");

                headerNav.classList.remove("back-white");
                logo.classList.remove("back-white");
                hamburgerEl.classList.remove("back-white");
            } else {
                headerNav.classList.remove("after-works");
                logo.classList.remove("after-works");
                hamburgerEl.classList.remove("after-works");

                headerNav.classList.add("back-white");
                logo.classList.add("back-white");
                hamburgerEl.classList.add("back-white");
            }
        }

        /* --- works 終了で雲を消す --- */
        if (scrollY >= worksBottom - 100) {
            allClouds.forEach((el) => el.classList.add("cloud-hidden"));
        } else {
            allClouds.forEach((el) => el.classList.remove("cloud-hidden"));
        }

        isTicking = false;
    }

    /* スクロールイベント（パフォーマンス最適化） */
    window.addEventListener("scroll", () => {
        if (!isTicking) {
            window.requestAnimationFrame(onScroll);
            isTicking = true;
        }
    });

    /* ===================================================
       B. all-work.html 用の処理 (要素がある場合のみ実行)
    =================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    if (filterButtons.length > 0) {
        const cards = document.querySelectorAll(".graphic-card");
        const moreBtn = document.getElementById("moreBtn");
        const hiddenCards = document.querySelectorAll(".hidden-card");

        // 1. フィルター機能
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.dataset.filter;

                cards.forEach((card) => {
                    const category = card.dataset.category;

                    if (filter === "all" || filter === category) {
                        if (card.classList.contains("hidden-card")) {
                            if (card.classList.contains("show")) {
                                card.style.display = "block";
                            } else {
                                card.style.display = "none";
                            }
                        } else {
                            card.style.display = "block";
                        }
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });

        // URLパラメータの初期フィルター適用
        const params = new URLSearchParams(window.location.search);
        const initialFilter = params.get("filter");
        if (initialFilter) {
            const targetBtn = document.querySelector(
                `.filter-btn[data-filter="${initialFilter}"]`,
            );
            if (targetBtn) targetBtn.click();
        }

        // 2. 「もっと見る」ボタン
        if (moreBtn) {
            moreBtn.addEventListener("click", () => {
                hiddenCards.forEach((card) => {
                    card.classList.add("show");
                    const currentFilter =
                        document.querySelector(".filter-btn.active")?.dataset
                            .filter || "all";
                    if (
                        currentFilter === "all" ||
                        card.dataset.category === currentFilter
                    ) {
                        card.style.display = "block";
                    }
                });
                moreBtn.style.display = "none";
            });
        }
    }

    // 3. モーダル機能
    const modal = document.getElementById("modal");
    if (modal) {
        const modalImg = document.getElementById("modal-img");
        const modalText = document.getElementById("modal-text");
        const closeBtn = document.querySelector(".modal-close");

        const workData = [
            { img: "images/modal-01.png", spImg: "images/sp_modal-1.png" },
            { img: "images/modal-02.png", spImg: "images/sp_modal-2.png" },
            { img: "images/modal-03.png", spImg: "images/sp_modal-3.png" },
            { img: "images/modal-04.png", spImg: "images/sp_modal-4.png" },
            { img: "images/modal-05.png", spImg: "images/sp_modal-5.png" },
            { img: "images/modal-06.png", spImg: "images/sp_modal-6.png" },
            { img: "images/modal-07.png", spImg: "images/sp_modal-7.png" },
            { img: "images/modal-08.png", spImg: "images/sp_modal-8.png" },
            { img: "images/modal-09.png", spImg: "images/sp_modal-9.png" },
            { img: "images/modal-10.png", spImg: "images/sp_modal-10.png" },
            { img: "images/modal-11.png", spImg: "images/sp_modal-11.png" },
            { img: "images/modal-12.png", spImg: "images/sp_modal-12.png" },
            { img: "images/modal-13.png", spImg: "images/sp_modal-13.png" },
            { img: "images/modal-14.png", spImg: "images/sp_modal-14.png" },
            { img: "images/modal-15.png", spImg: "images/sp_modal-15.png" },
            { img: "images/modal-16.png", spImg: "images/sp_modal-16.png" },
            { img: "images/modal-17.png", spImg: "images/sp_modal-17.png" },
            { img: "images/modal-18.png", spImg: "images/sp_modal-18.png" },
            { img: "images/modal-19.png", spImg: "images/sp_modal-19.png" },
        ];

        const workImages = document.querySelectorAll(".graphic-card img");

        workImages.forEach((img, index) => {
            img.addEventListener("click", () => {
                const item = workData[index];
                if (item) {
                    modal.style.display = "block";

                    const isMobile = window.innerWidth <= 768;
                    if (isMobile && item.spImg) {
                        modalImg.src = item.spImg;
                    } else {
                        modalImg.src = item.img;
                    }

                    if (modalText && item.text) {
                        modalText.textContent = item.text;
                    }
                }
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.style.display === "block") {
                modal.style.display = "none";
            }
        });
    }
});
