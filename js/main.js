const nav_toggle = document.querySelector(".nav-btn");
const nav_links = document.querySelector(".nav__links-container");
const nav = document.querySelector(".nav-bar");
const logos = document.querySelectorAll(".logo");
let lang = localStorage.getItem("lang");

window.onload = () => {
  if (window.location.pathname === "/index") localStorage.setItem("lang", "es");
  else localStorage.setItem("lang", "en");
  lang = localStorage.getItem("lang");
  if (lang === "es" && window.location.pathname !== "/index")
    window.location.assign("./index");
  if (lang === "en" && window.location.pathname !== "/index_EN")
    window.location.assign("./index_EN");
};

nav_toggle.addEventListener("click", (e) => {
  e.preventDefault();
  nav_links.classList.toggle("collapsed");
  nav_toggle.classList.toggle("clicked");
});

if (window.innerWidth >= 992) {
  logos[0].classList.add("--hide");
  logos[1].classList.remove("--hide");
}

let scrollPos = window.scrollY;
window.addEventListener("scroll", () => {
  if (window.innerWidth < 992) return false;
  scrollPos = window.scrollY;
  if (scrollPos >= 30) {
    nav.classList.add("nav--scrolled");
    logos[1].classList.add("--hide");
    logos[0].classList.remove("--hide");
  } else {
    nav.classList.remove("nav--scrolled");
    logos[1].classList.remove("--hide");
    logos[0].classList.add("--hide");
  }
});

document.querySelectorAll('a.smooth-scroll[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    nav_links.classList.toggle("collapsed");
    nav_toggle.classList.toggle("clicked");
  });
});
