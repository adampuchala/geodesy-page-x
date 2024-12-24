const baseUrl = window.location.href; // Replace with your base URL

window.addEventListener('load', () => {
    setUpHideNav();
    setUpAppearingImagesAnimation();
    setUpSmoothScroll();
    setUpNavigationHighlighting();
    setUpMobileSideNav();
    setUpHideSideMenuOnHrefClick();
});

function setUpHideSideMenuOnHrefClick() {
    const navLinks = document.querySelectorAll('a');

    // Add click event listeners to each link
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent default behavior (optional)
            event.preventDefault();

            // Log the href or perform an action
            const targetHref = link.getAttribute('href');
            console.log(`Navigating to: ${targetHref}`);

            hideMobileSideNav();

            // Optionally navigate to the section
            setTimeout(() => {
                window.location.href = targetHref;
            }, 300); // Delay navigation for smooth animation
        });
    });
}

function setUpMobileSideNav() {
    document.getElementById("menu-toggle").addEventListener("click", function () {
        const sideNav = document.getElementById("side-nav");
        if (sideNav.classList.contains("translate-x-[100%]")) {
            showMobileSideNav();
        } else {
            hideMobileSideNav();
        }
    });
}

function showMobileSideNav() {
    const sideNav = document.getElementById("side-nav");
    sideNav.classList.add("translate-x-[20%]");
    sideNav.classList.remove("translate-x-[100%]");
}

function hideMobileSideNav() {
    const sideNav = document.getElementById("side-nav");
    sideNav.classList.remove("translate-x-[20%]");
    sideNav.classList.add("translate-x-[100%]");
}

function setUpHideNav() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const footerHeight = footer.offsetHeight;
    const windowHeight = window.innerHeight;

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const footerTop = footer.getBoundingClientRect().top;

        if (footerTop <= windowHeight * 0.10) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    });
}

function setUpAppearingImagesAnimation() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after the first scroll into view
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });
}

function setUpSmoothScroll() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            });
        });
    });
}

function setUpNavigationHighlighting() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    const highlightSectionAtTop = () => {
        const headerHeight = header.offsetHeight + 10;

        let sectionAtTopId = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < headerHeight && rect.bottom > headerHeight) {
                sectionAtTopId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === sectionAtTopId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', highlightSectionAtTop);
    window.addEventListener('resize', highlightSectionAtTop);

    // Initial call to highlight the correct section on page load
    highlightSectionAtTop();
}
