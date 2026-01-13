let lastScrollY = window.scrollY;
const nav = document.getElementById("UpperNavBar");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 10) {
        // scrolling down → hide
        nav.classList.add("hidden");
    } else {
        // scrolling up → show
        nav.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
});

// Show navbar when mouse is near top
document.addEventListener("mousemove", (e) => {
    if (e.clientY < 50) {
        nav.classList.remove("hidden");
    }
});