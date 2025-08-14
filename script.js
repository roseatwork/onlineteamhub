document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    /** -------------------------------
     *  MOBILE MENU TOGGLE
     * ------------------------------- */
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });

    /** -------------------------------
     *  FADE-IN SECTIONS (GENERAL)
     * ------------------------------- */
    const fadeTargets = document.querySelectorAll("section, .about-wsb");
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    fadeTargets.forEach(target => fadeObserver.observe(target));

    /** -------------------------------
     *  KNOWLEDGE ITEMS — STAGGERED FADE-IN
     * ------------------------------- */
    const knowledgeItems = document.querySelectorAll(".knowledge-item");
    const knowledgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll(".knowledge-item");
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add("visible");
                    }, index * 150); // stagger delay: 150ms each
                });
                knowledgeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const knowledgeSection = document.querySelector(".knowledge");
    if (knowledgeSection) {
        knowledgeObserver.observe(knowledgeSection);
    }

    /** -------------------------------
     *  ROLLING COUNTER
     * ------------------------------- */
    function animateCounter(id, start, end, duration) {
        const element = document.getElementById(id);
        let startTime = null;

        function updateCounter(timestamp) {
            if (startTime === null) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.innerText = currentValue.toLocaleString() + " Million";

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Run counter when WSB section appears
    const counterSection = document.querySelector(".about-wsb");
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter("counter", 0, 30, 2000);
                counterObserver.unobserve(counterSection);
            }
        });
    }, { threshold: 0.5 });

    if (counterSection) counterObserver.observe(counterSection);
});
