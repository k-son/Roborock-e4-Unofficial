//// VARIABLES

// 04 Features
const dynamicTextGyroscopes = document.querySelector('.e4__04-Gyroscopes__dinamical-text');
const textGyroscopesFeature_1 = document.querySelector('.gyro-text--1').innerHTML;
const textGyroscopesFeature_2 = document.querySelector('.gyro-text--2').innerHTML;
const textGyroscopesFeature_3 = document.querySelector('.gyro-text--3').innerHTML;
const imageGyroscope_2 = document.querySelector('.gyro-image--2');
const imageGyroscope_3 = document.querySelector('.gyro-image--3');

// 11 Surfaces
let surfaceBoxes = document.querySelectorAll('.e4__11-Surfaces__surface');
const surfaceHeadings = document.querySelectorAll('.e4__11-Surfaces__surface > h3');
const surfaceOverlays = document.querySelectorAll('.e4__11-Surfaces__overlay');
const surfaceButtons = document.querySelectorAll('.e4__11-Surfaces__close-btn');



//// REUSABLE FUNCTIONS

function throttled(delay, fn) {
  let lastCall = 0;

  return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
          return;
      }
      lastCall = now;
      return fn(...args);
  }
}

//checks if element has emerged from the bottom certain number of pixels
function ifElementScrolledUpIntoView(el, pixels) {
  if (el) {
    const position = el.getBoundingClientRect();

    return (
      (position.top >= 0 && position.top <= (window.innerHeight - pixels) 
      || (position.top < 0))
    );
  }
}



//// MAIN SCRIPTS

/// *** 04 Features ***
// insert first text on page load then insert next texts when appropriate image comes fully into view

dynamicTextGyroscopes.innerHTML = textGyroscopesFeature_1;

const insertTextGyroscope_2 = throttled(200, function() {
  if (ifElementScrolledUpIntoView(imageGyroscope_2, 300)) {
    dynamicTextGyroscopes.innerHTML = textGyroscopesFeature_2;
  } else {
    dynamicTextGyroscopes.innerHTML = textGyroscopesFeature_1;
  }
})

window.addEventListener('scroll', insertTextGyroscope_2);


const insertTextGyroscope_3 = throttled(200, function() {
  if (ifElementScrolledUpIntoView(imageGyroscope_3, 300)) {
    dynamicTextGyroscopes.innerHTML = textGyroscopesFeature_3;
  } else {
    insertTextGyroscope_2();
  }
})

window.addEventListener('scroll', insertTextGyroscope_3);
// ** END OF: 04 Features **


/// *** 11 Surfaces ***
// after click open/close overlay and rotate button

for (let i=0; i<surfaceBoxes.length; i++) {
  surfaceBoxes[i].addEventListener('click', function() {
    surfaceHeadings[i].classList.toggle('displayNone');
    surfaceOverlays[i].classList.toggle('displayNone');
    surfaceButtons[i].classList.toggle('btnSurface-active');
})};
// ** END OF: 11 Surfaces **