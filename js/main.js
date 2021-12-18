const nav_toggle = document.querySelector('.nav-btn');
const nav_links = document.querySelector(".nav__links-container");
const nav = document.querySelector('.nav-bar');
const logos = document.querySelectorAll('.logo');
nav_toggle.addEventListener('click', (e) =>{
    e.preventDefault();
    nav_links.classList.toggle('collapsed');
    nav_toggle.classList.toggle("clicked"); 
});

if(window.innerWidth >= 992){
    logos[0].classList.add('--hide');
    logos[1].classList.remove('--hide');
}

let scrollPos = window.scrollY;
window.addEventListener('scroll', ()=>{
    if(window.innerWidth < 992)
        return false;
    scrollPos = window.scrollY;
    if (scrollPos >= 30) {
        nav.classList.add('nav--scrolled');
        logos[1].classList.add('--hide');
        logos[0].classList.remove('--hide');
    } else {
        nav.classList.remove('nav--scrolled');
        logos[1].classList.remove('--hide');
        logos[0].classList.add('--hide');
    }

});
