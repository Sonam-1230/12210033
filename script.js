let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let header = document.querySelector("header");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
});

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    // Sticky Navbar
    header.classList.toggle("sticky", scrollY > 100);

    // Active Link Highlighting
    sections.forEach((sec) => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.id;

        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach((link) => link.classList.remove("active"));
            let activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });

    // Close menu on scroll
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
});

// ✅ Move ScrollReveal Outside Scroll Event
ScrollReveal({
    reset: false,
    distance: "80px",
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// typedjs
const typed = new Typed(".Multiple-text" , {
    strings: ['Backend Developer','Blockchain Developer','UIUX Designer','Frontend Developer'],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true


});