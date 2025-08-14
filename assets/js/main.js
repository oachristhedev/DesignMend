/**
 * Template Name: DesignMend
 * Template URL: https://bootstrapmade.com/DesignMend-free-bootstrap-theme/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
    "use strict";

    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
        const selectBody = document.querySelector("body");
        const selectHeader = document.querySelector("#header");
        if (
            !selectHeader.classList.contains("scroll-up-sticky") &&
            !selectHeader.classList.contains("sticky-top") &&
            !selectHeader.classList.contains("fixed-top")
        )
            return;
        window.scrollY > 100
            ? selectBody.classList.add("scrolled")
            : selectBody.classList.remove("scrolled");
    }

    document.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    function mobileNavToogle() {
        document.querySelector("body").classList.toggle("mobile-nav-active");
        mobileNavToggleBtn.classList.toggle("bi-list");
        mobileNavToggleBtn.classList.toggle("bi-x");
    }
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll("#navmenu a").forEach(navmenu => {
        navmenu.addEventListener("click", () => {
            if (document.querySelector(".mobile-nav-active")) {
                mobileNavToogle();
            }
        });
    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll(".navmenu .toggle-dropdown").forEach(navmenu => {
        navmenu.addEventListener("click", function (e) {
            e.preventDefault();
            this.parentNode.classList.toggle("active");
            this.parentNode.nextElementSibling.classList.toggle(
                "dropdown-active"
            );
            e.stopImmediatePropagation();
        });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector("#preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.remove();
        });
    }

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector(".scroll-top");

    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100
                ? scrollTop.classList.add("active")
                : scrollTop.classList.remove("active");
        }
    }
    scrollTop.addEventListener("click", e => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);

    /**
     * Animation on scroll function and init
     */
    function aosInit() {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }
    window.addEventListener("load", aosInit);

    /**
     * Auto generate the carousel indicators
     */
    document
        .querySelectorAll(".carousel-indicators")
        .forEach(carouselIndicator => {
            carouselIndicator
                .closest(".carousel")
                .querySelectorAll(".carousel-item")
                .forEach((carouselItem, index) => {
                    if (index === 0) {
                        carouselIndicator.innerHTML += `<li data-bs-target="#${
                            carouselIndicator.closest(".carousel").id
                        }" data-bs-slide-to="${index}" class="active"></li>`;
                    } else {
                        carouselIndicator.innerHTML += `<li data-bs-target="#${
                            carouselIndicator.closest(".carousel").id
                        }" data-bs-slide-to="${index}"></li>`;
                    }
                });
        });

    /**
     * Initiate Pure Counter
     */
    new PureCounter();

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
        selector: ".glightbox",
    });

    /**
     * Init isotope layout and filters
     */
    document
        .querySelectorAll(".isotope-layout")
        .forEach(function (isotopeItem) {
            let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
            let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
            let sort =
                isotopeItem.getAttribute("data-sort") ?? "original-order";

            let initIsotope;
            imagesLoaded(
                isotopeItem.querySelector(".isotope-container"),
                function () {
                    initIsotope = new Isotope(
                        isotopeItem.querySelector(".isotope-container"),
                        {
                            itemSelector: ".isotope-item",
                            layoutMode: layout,
                            filter: filter,
                            sortBy: sort,
                        }
                    );
                }
            );

            isotopeItem
                .querySelectorAll(".isotope-filters li")
                .forEach(function (filters) {
                    filters.addEventListener(
                        "click",
                        function () {
                            isotopeItem
                                .querySelector(
                                    ".isotope-filters .filter-active"
                                )
                                .classList.remove("filter-active");
                            this.classList.add("filter-active");
                            initIsotope.arrange({
                                filter: this.getAttribute("data-filter"),
                            });
                            if (typeof aosInit === "function") {
                                aosInit();
                            }
                        },
                        false
                    );
                });
        });

    /**
     * Frequently Asked Questions Toggle
     */
    document
        .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
        .forEach(faqItem => {
            faqItem.addEventListener("click", () => {
                faqItem.parentNode.classList.toggle("faq-active");
            });
        });

    /**
     * Init swiper sliders
     */
    function initSwiper() {
        document
            .querySelectorAll(".init-swiper")
            .forEach(function (swiperElement) {
                let config = JSON.parse(
                    swiperElement
                        .querySelector(".swiper-config")
                        .innerHTML.trim()
                );

                if (swiperElement.classList.contains("swiper-tab")) {
                    initSwiperWithCustomPagination(swiperElement, config);
                } else {
                    new Swiper(swiperElement, config);
                }
            });
    }

    window.addEventListener("load", initSwiper);

    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener("load", function (e) {
        if (window.location.hash) {
            if (document.querySelector(window.location.hash)) {
                setTimeout(() => {
                    let section = document.querySelector(window.location.hash);
                    let scrollMarginTop =
                        getComputedStyle(section).scrollMarginTop;
                    window.scrollTo({
                        top: section.offsetTop - parseInt(scrollMarginTop),
                        behavior: "smooth",
                    });
                }, 100);
            }
        }
    });

    /**
     * Navmenu Scrollspy
     */
    let navmenulinks = document.querySelectorAll(".navmenu a");

    function navmenuScrollspy() {
        navmenulinks.forEach(navmenulink => {
            if (!navmenulink.hash) return;
            let section = document.querySelector(navmenulink.hash);
            if (!section) return;
            let position = window.scrollY + 200;
            if (
                position >= section.offsetTop &&
                position <= section.offsetTop + section.offsetHeight
            ) {
                document
                    .querySelectorAll(".navmenu a.active")
                    .forEach(link => link.classList.remove("active"));
                navmenulink.classList.add("active");
            } else {
                navmenulink.classList.remove("active");
            }
        });
    }
    window.addEventListener("load", navmenuScrollspy);
    document.addEventListener("scroll", navmenuScrollspy);

    const loaderBackdrop = `
        <div class="spinner-backdrop">
            <div class="spinner-grow text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;

    const loaderBackdropElem = document.createElement('div');
    loaderBackdropElem.innerHTML = loaderBackdrop;

    // Insert Loader Backdrop into the body
    document.body.append(loaderBackdropElem);

    const showLoader = () => {
        document.querySelector(".spinner-backdrop").style.display = "flex";
        document.body.classList.add("no-scroll");
    };

    const hideLoader = () => {
        document.querySelector(".spinner-backdrop").style.display = "none";
        document.body.classList.remove("no-scroll");
    };

    let backendHostURL;
    if (["127.0.0.1", "localhost"].includes(window.location.hostname)) {
        backendHostURL = "http://127.0.0.1:8000";
    } else if (
        ["www.designmend.com", "designmend.com"].includes(
            window.location.hostname
        )
    ) {
        backendHostURL = "https://api.designmend.com";
    }

    // contact form
    document.querySelectorAll(".php-email-form").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();

            // show loader
            showLoader();

            fetch(`${backendHostURL}/mailing/contact-us/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: e.target.name.value.trim(),
                    email: e.target.email.value.trim(),
                    subject: e.target.subject.value.trim(),
                    message: e.target.message.value.trim(),
                }),
            })
                .then(response => {
                    // if response is successful, alert
                    if (response.ok) {
                        alert("Your message has been delivered successfully!");
                        // reset form fields
                        e.target.reset();
                    } else {
                        alert("Failed to deliver message. Please try again.");
                    }
                })
                .catch(error => {
                    alert("Failed to deliver message. Please try again", error);
                })
                .finally(() => {
                    hideLoader();
                });
        });
    });
})();
