"use strict";

var topRowImages = $(".topSlider img");
var bottomRowImages = $(".bottomSlider img"); // Space between pictures, column-gap

var pictureGap = 10; // Boolean variables used for limiting the execution of shift functions

var transitionLastsTopRow = false;
var transitionLastsBottomRow = false; // Value of x-axis distance by which the images move

var topDistance = topRowImages[0].width + pictureGap;
var bottomDistance = bottomRowImages[0].width + pictureGap; // Function that is called inside document.ready callback function

var startingShift = function startingShift() {
  // Starting shift of the top row because we want it to start from the 1st image
  $(".topSlider").css("transform", "translateX(".concat(topDistance, "px)")); // Starting shift of the bottom row

  $(".bottomSlider").css("transform", "translateX(".concat(bottomDistance, "px)"));
};

var shiftTopRow = function shiftTopRow(direction) {
  if (transitionLastsTopRow) return;
  transitionLastsTopRow = true;
  var currentImage = topRowImages.filter(".activeImage");
  var nextImage, imageWidth;

  if (direction === "left") {
    nextImage = currentImage.next();
    imageWidth = currentImage[0].width;
    topDistance += imageWidth + pictureGap;
  } else {
    nextImage = currentImage.prev();
    imageWidth = nextImage[0].width;
    topDistance -= imageWidth + pictureGap;
  } // x-axis shift of the top slider, with animation


  $(".topSlider").css({
    transform: "translateX(".concat(topDistance, "px)"),
    transition: "transform 0.3s ease-in-out"
  }); // Event listener which is activated when a CSS transition is over, and moves the slider according to a value of "nextImage" variable

  $(".topSlider").on("transitionend", function () {
    if (nextImage.attr("id") === "copyFirst") {
      // Going back to the start of the row, without transition
      topDistance = topRowImages[0].width + pictureGap;
      nextImage = topRowImages.eq(1);
      $(".topSlider").css({
        transform: "translateX(".concat(topDistance, "px)"),
        transition: "none"
      });
    }

    if (nextImage.attr("id") === "copyLast") {
      // Going back to that image near the end of the row, without transition
      topDistance = 1830;
      nextImage = topRowImages.eq(9);
      $(".topSlider").css({
        transform: "translateX(".concat(topDistance, "px)"),
        transition: "none"
      });
    } // Only when the CSS transition is over, "transitionLastsTopRow" is set to false


    transitionLastsTopRow = false;
    currentImage.removeClass("activeImage");
    nextImage.addClass("activeImage");
  });
};

var shiftBottomRow = function shiftBottomRow(direction) {
  if (transitionLastsBottomRow) return;
  transitionLastsBottomRow = true;
  var currentImage = bottomRowImages.filter(".activeImage");
  var nextImage, imageWidth;

  if (direction === "left") {
    nextImage = currentImage.next();
    imageWidth = currentImage[0].width;
    bottomDistance += imageWidth + pictureGap;
  } else {
    nextImage = currentImage.prev();
    imageWidth = nextImage[0].width;
    bottomDistance -= imageWidth + pictureGap;
  }

  $(".bottomSlider").css({
    transform: "translateX(".concat(bottomDistance, "px)"),
    transition: "transform 0.3s ease-in-out"
  });
  $(".bottomSlider").on("transitionend", function () {
    if (nextImage.attr("id") === "copyFirst") {
      bottomDistance = bottomRowImages[0].width + pictureGap;
      nextImage = bottomRowImages.eq(1);
      $(".bottomSlider").css({
        transform: "translateX(".concat(bottomDistance, "px)"),
        transition: "none"
      });
    }

    if (nextImage.attr("id") === "copyLast") {
      bottomDistance = 1830;
      nextImage = bottomRowImages.eq(9);
      $(".bottomSlider").css({
        transform: "translateX(".concat(bottomDistance, "px)"),
        transition: "none"
      });
    }

    transitionLastsBottomRow = false;
    currentImage.removeClass("activeImage");
    nextImage.addClass("activeImage");
  });
}; // When DOM is loaded make a starting shift of both sliders to show first picture, and add event handler for button


$(document).ready(function () {
  startingShift();
  $("#buttonLeft").on("click", function () {
    shiftTopRow("left");
    shiftBottomRow("left");
  });
  $("#buttonRight").on("click", function () {
    shiftTopRow("right");
    shiftBottomRow("right");
  });
});