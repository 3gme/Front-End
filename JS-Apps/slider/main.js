// Get Slider Items
const sliderItems = Array.from(
  document.querySelectorAll(`.slider-container img`)
);

// Number Of Imgs
var slideCount = sliderItems.length;

// Current Index .. By Default 1
var currentSlide = 0;

// Slider Action
const fade = document.getElementById(`fade`);
const slide = document.getElementById(`slide`);
fade.classList.add("active");

// true for fade and false for slide
let actionFlag = true;

function orderInSlideMode() {
  if (actionFlag) {
    sliderItems.forEach((e) => {
      e.style.left = "10px";
    });
    return;
  }
  sliderItems.forEach((e, i) => {
    if (i === currentSlide) e.style.left = "10px";
    else if (i < currentSlide) e.style.left = "-110%";
    else if (i > currentSlide) e.style.left = "110%";
  });
}
function checkAction() {
  sliderItems.forEach((e) => {
    if (actionFlag === false) {
      e.classList.add("slideMode");
    } else e.classList.remove("slideMode");
  });
  orderInSlideMode();
}
fade.onclick = () => {
  if (fade.classList.contains("active")) return;
  fade.classList.add("active");
  slide.classList.remove("active");
  actionFlag = true;
  checkAction();
};
slide.onclick = () => {
  if (slide.classList.contains("active")) return;
  slide.classList.add("active");
  fade.classList.remove("active");
  actionFlag = false;
  checkAction();
};

// slide-number
const slideNumberString = document.querySelector(`.slide-number`);
function updateSlideNumberString(currentSlide) {
  slideNumberString.innerHTML = `Slide #${currentSlide + 1}`;
}
slideNumberString.innerHTML = `Slide #${currentSlide + 1}`;

// Show Slides
const next = document.querySelector(`#next`);
const prev = document.querySelector(`#prev`);
if (currentSlide === 0) prev.classList.add(`inactive`);
sliderItems[0].classList.add("active");

// Slider Indicators
const sliderIndicator = document.querySelector(`#indicators ul`);

for (let i = 1; i <= sliderItems.length; i++) {
  let ele = document.createElement("li");
  ele.innerHTML = i;
  sliderIndicator.appendChild(ele);
}

const sliderIndicatorArray = Array.from(
  document.querySelectorAll(`#indicators ul li`)
);
sliderIndicatorArray[0].classList.add("active");

next.addEventListener("click", () => {
  if (currentSlide === sliderItems.length - 1) next.classList.add(`inactive`);
  else {
    prev.classList.remove(`inactive`);
    removeActiveFrom();
    currentSlide++;
    updateSlideNumberString(currentSlide);
    sliderItems[currentSlide].classList.add(`active`);
    if (currentSlide === sliderItems.length - 1) next.classList.add(`inactive`);
    sliderIndicatorArray[currentSlide].classList.add("active");
  }
  orderInSlideMode();
});
prev.addEventListener("click", () => {
  if (currentSlide === 0) prev.classList.add(`inactive`);
  else {
    next.classList.remove(`inactive`);
    removeActiveFrom();
    currentSlide--;
    updateSlideNumberString(currentSlide);
    sliderItems[currentSlide].classList.add(`active`);
    if (currentSlide === 0) prev.classList.add(`inactive`);
    sliderIndicatorArray[currentSlide].classList.add("active");
  }
  orderInSlideMode();
});

function removeActiveFrom() {
  sliderItems.forEach((e) => e.classList.remove(`active`));
  sliderIndicatorArray.forEach((e) => e.classList.remove(`active`));
}
