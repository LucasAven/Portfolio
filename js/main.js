const nav_toggle = document.querySelector('.nav-btn');
const nav = document.querySelector(".nav__links-container");
nav_toggle.addEventListener('click', (e) =>{
    e.preventDefault();
    nav.classList.toggle('collapsed');
    nav_toggle.classList.toggle("clicked"); 
});