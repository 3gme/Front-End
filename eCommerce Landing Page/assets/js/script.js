"use strict";

const $header = document.querySelector("[data-header]");
const $navbar = document.querySelector("[data-navbar]");
const $navToggler = Array.from(document.querySelectorAll("[data-nav-toggler]"));
const $overlay = document.querySelector("[data-overlay]");
const $dropDownToggler = document.querySelector("[data-dropdown-toggler]");
const $dropDown = document.querySelector("[data-dropdown]");
const $cartToggler = document.querySelector("[data-cart-toggler]");
const $cartModal = document.querySelector("[data-cart-modal]");


$navToggler.forEach((e) => {
  e.addEventListener("click", () => {
    $navbar.classList.toggle("active");
    $overlay.classList.toggle("active");
  });
});

document.addEventListener("click", (e) => {
  if (e.target === $dropDownToggler) {
    $dropDown.classList.toggle("active");
  } else if (e.target === $cartToggler) {
    $cartModal.classList.toggle("active");
  } else if (e.target === $overlay) {
    $navbar.classList.remove("active");
    $overlay.classList.remove("active");
  } else {
    $dropDown.classList.remove("active");
    $cartModal.classList.remove("active");
  }
});


// active header 
window.addEventListener('scroll', e => {
  window.scrollY > 50 ?
  $header.classList.add('active'):
  $header.classList.remove('active');
})



// Slider Handling
const $sliderContainer = Array.from(document.querySelectorAll('[data-slider-container]'));


// Function Handle Sliders 
function handleSliders($sliderContainer) {
  const $slider = $sliderContainer.querySelector('[data-slider]');
  const $prevBtn = $sliderContainer.querySelector('[slider-next-button]')
  const $nextBtn = $sliderContainer.querySelector('[slider-prev-button]')
  
  function nextSlide() {
    $slider.appendChild($slider.firstElementChild)
  }
  $nextBtn.addEventListener('click', nextSlide);

  function prevSlide() {
    $slider.prepend($slider.lastElementChild)
  }
  $prevBtn.addEventListener('click', prevSlide);

  let autoSlideIntervalId;
  function autoSlide() {
    autoSlideIntervalId = setInterval(() => {
      nextSlide();
    },2000);
  }
  autoSlide();

  function deleteAutoSliding() {
    clearInterval(autoSlideIntervalId);
  }
  $slider.addEventListener('mouseover', deleteAutoSliding)
  $prevBtn.addEventListener('mouseover', deleteAutoSliding)
  $nextBtn.addEventListener('mouseover', deleteAutoSliding)

  $slider.addEventListener('mouseout', autoSlide)
  $prevBtn.addEventListener('mouseout', autoSlide)
  $nextBtn.addEventListener('mouseout', autoSlide)
}


for(let i = 0; i < $sliderContainer.length; i++){
  handleSliders($sliderContainer[i]);
}