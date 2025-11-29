const menuBtm = document.querySelector(`nav .nav__content i`);
let navMenu = document.querySelector(`nav .nav__links`);
menuBtm.addEventListener(`click`, () => {
  navMenu.classList.toggle(`open`);
});

const navLinks = document.querySelectorAll(`nav .nav__links a`);
navLinks.forEach((link) => {
  link.addEventListener(`click`, () => {
    navMenu.classList.remove(`open`);
  });
});

// handle Scroll Reveal

const ScrollOptions = {
  distance: `50px`,
  duration: 1000,
  origin: `bottom`,
}

const node = document.querySelector(`.header__img img`);
console.log(node);

ScrollReveal().reveal(`.header__img img`, {
  ...ScrollOptions,
  origin: `right`,
  delay: 200,
});
ScrollReveal().reveal(`.header_content h1`, {
  ...ScrollOptions,
  delay: 600,
});
ScrollReveal().reveal(`.header_content .p1`, {
  ...ScrollOptions,
  delay: 1100,
});
ScrollReveal().reveal(`.header_content .big-box`, {
  ...ScrollOptions,
  delay: 1600,
});
ScrollReveal().reveal(`.header_content > p:last-child`, {
  ...ScrollOptions,
  delay: 2100,
});

ScrollReveal().reveal(`.header__img .TR`, {
  distance: 0,
  duration: 1000,
  opacity: 0,
  delay: 3100,
});
ScrollReveal().reveal(`.header__img .TL`, {
  distance: 0,
  duration: 1000,
  opacity: 0,
  delay: 2600,
});
ScrollReveal().reveal(`.header__img .BR`, {
  distance: 0,
  duration: 1000,
  opacity: 0,
  delay: 4100,
});
ScrollReveal().reveal(`.header__img .BL`, {
  distance: 0,
  duration: 1000,
  opacity: 0,
  delay: 3600,
});
