"use strict"; //// VARIABLES
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
var surfaceButtons = document.querySelectorAll('.e4__11-Surfaces__close-btn'); // Tooltips

var tooltips = document.querySelectorAll('.tooltip');
var tooltipTexts = document.querySelectorAll('.tooltiptext');
var closeTooltipBtns = document.querySelectorAll('.tooltipCloseBtn'); //// REUSABLE FUNCTIONS

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

surfaceBoxes = Array.from(surfaceBoxes);

var _loop = function _loop(i) {
  surfaceBoxes[i].addEventListener('click', function () {
    // close any other overlay
    var index = surfaceBoxes.indexOf(surfaceBoxes[i]);
    var clonedSurfaceBoxes = surfaceBoxes.slice(0);
    clonedSurfaceBoxes.splice(index, 1);
    clonedSurfaceBoxes.forEach(function (el) {
      el.firstElementChild.classList.remove('displayNone');
      el.firstElementChild.nextElementSibling.classList.add('displayNone');
      el.lastElementChild.classList.remove('btnSurface-active');
    }); // open/close selected overlay

    surfaceHeadings[i].classList.toggle('displayNone');
    surfaceOverlays[i].classList.toggle('displayNone');
    surfaceButtons[i].classList.toggle('btnSurface-active');
  });
};

for (var i = 0; i < surfaceBoxes.length; i++) {
  _loop(i);
} // ** END OF: 11 Surfaces **
/// *** Tooltips ***


tooltips = Array.from(tooltips);

var _loop2 = function _loop2(_i) {
  tooltips[_i].addEventListener('click', function () {
    // close any other open tooltip
    var index = tooltips.indexOf(tooltips[_i]);
    var clonedTooltips = tooltips.slice(0);
    clonedTooltips.splice(index, 1);
    clonedTooltips.forEach(function (el) {
      var tooltipBox = el.nextElementSibling.nextElementSibling;
      var closeBtn = tooltipBox.firstChild;
      tooltipBox.classList.remove('showTooltipText');
      closeBtn.classList.add('displayNone'); // make closeBtn keyboard unaccessible

      el.classList.remove('colorInfo');
    }); // open selected tooltip

    var tooltipBox = tooltips[_i].nextElementSibling.nextElementSibling;
    tooltipBox.classList.toggle('showTooltipText');

    tooltips[_i].classList.toggle('colorInfo');

    closeTooltipBtns[_i].classList.toggle('displayNone'); // close tooltip on close button press


    closeTooltipBtns[_i].addEventListener('click', function () {
      tooltipBox.classList.remove('showTooltipText');

      tooltips[_i].classList.remove('colorInfo');

      this.classList.add('displayNone');
    });
  });
};

for (var _i = 0; _i < tooltips.length; _i++) {
  _loop2(_i);
} /// ** END OF: Tooltips **