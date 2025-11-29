const navBtn = document.querySelector(`.nav_menu_btn i`);
const navLinks = document.querySelector(`.nav_links`);
navBtn.addEventListener(`click`, () => {
  navLinks.classList.toggle(`active`);
  navBtn.className === `ri-menu-4-line` ?
  navBtn.className = `ri-close-line` :
  navBtn.className = `ri-menu-4-line`;
});

const navLinkItems = document.querySelectorAll(`.nav_links li a`);
navLinkItems.forEach((link) => {
  link.addEventListener(`click`, () => {
    navLinks.classList.remove(`active`);
    navBtn.className = `ri-menu-4-line`;
  });
});



// Scroll Reveal Options

const sr = {
  distance: '60px',
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header_img img", {
  ...sr,
  origin: `right`
});
ScrollReveal().reveal(".header_content h2", {
  ...sr,
  delay: 500,
});
ScrollReveal().reveal(".header_content h1", {
  ...sr,
  delay: 1000,
});
ScrollReveal().reveal(".header_content p", {
  ...sr,
  delay: 1500,
});

ScrollReveal().reveal(".header_content .header_btn", {
  ...sr,
  delay: 2000,
  cleanup: true,
});
ScrollReveal().reveal(".social_media li", {
  ...sr,
  delay: 2500,
  interval: 400,
});





ScrollReveal({ reset: false, mobile: true, beforeReveal: function (el) {
  el.style.pointerEvents = "auto";
} });


