"use strict";

//// VARIABLES
// 04 Features
var dynamicTextGyroscopes = document.querySelector('.e4__04-Gyroscopes__dinamical-text');
var textGyroscopesFeature_1 = document.querySelector('.gyro-text--1').innerHTML;
var textGyroscopesFeature_2 = document.querySelector('.gyro-text--2').innerHTML;
var textGyroscopesFeature_3 = document.querySelector('.gyro-text--3').innerHTML;
var imageGyroscope_2 = document.querySelector('.gyro-image--2');
var imageGyroscope_3 = document.querySelector('.gyro-image--3'); // 11 Surfaces

var surfaceBoxes = document.querySelectorAll('.e4__11-Surfaces__surface');
var surfaceHeadings = document.querySelectorAll('.e4__11-Surfaces__surface > h3');
var surfaceOverlays = document.querySelectorAll('.e4__11-Surfaces__overlay');
var surfaceButtons = document.querySelectorAll('.e4__11-Surfaces__close-btn'); //// REUSABLE FUNCTIONS

function throttled(delay, fn) {
  var lastCall = 0;
  return function () {
    var now = new Date().getTime();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    return fn.apply(void 0, arguments);
  };
} //checks if element has emerged from the bottom certain number of pixels


function ifElementScrolledUpIntoView(el, pixels) {
  if (el) {
    var position = el.getBoundingClientRect();
    return position.top >= 0 && position.top <= window.innerHeight - pixels || position.top < 0;
  }
} //// MAIN SCRIPTS
/// *** 04 Features ***
// insert first text on page load then insert next texts when appropriate image comes fully into view


dynamicTextGyroscopes.innerHTML = textGyroscopesFeature_1;
var insertTextGyroscope_2 = throttled(200, function () {
  if (ifElementScrolledUpIntoView(imageGyroscope_2, 300)) {
    dynamicTextGyroscopes.innerHTML = textGyroscopesFeature_2;
  } else {
    dynamicTextGyroscopes.innerHTML = textGyroscopesFeature_1;
  }
});
window.addEventListener('scroll', insertTextGyroscope_2);
var insertTextGyroscope_3 = throttled(200, function () {
  if (ifElementScrolledUpIntoView(imageGyroscope_3, 300)) {
    dynamicTextGyroscopes.innerHTML = textGyroscopesFeature_3;
  } else {
    insertTextGyroscope_2();
  }
});
window.addEventListener('scroll', insertTextGyroscope_3); // ** END OF: 04 Features **
/// *** 11 Surfaces ***
// after click open/close overlay and rotate button

var _loop = function _loop(i) {
  surfaceBoxes[i].addEventListener('click', function () {
    surfaceHeadings[i].classList.toggle('displayNone');
    surfaceOverlays[i].classList.toggle('displayNone');
    surfaceButtons[i].classList.toggle('btnSurface-active');
  });
};

for (var i = 0; i < surfaceBoxes.length; i++) {
  _loop(i);
}

; // ** END OF: 11 Surfaces **