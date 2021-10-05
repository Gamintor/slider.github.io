"use strict";

var topRowImages = $(".topSlider img");
var bottomRowImages = $(".bottomSlider img"); // Razmak između slika, odnosno column-gap

var pictureGap = 10; // Boolske varijable korištene za ograničavanje izvođenja funkcije za pomak

var transitionLastsTopRow = false;
var transitionLastsBottomRow = false; // Vrijednost pomaka po x-osi u pikselima

var topDistance = topRowImages[0].width + pictureGap;
var bottomDistance = bottomRowImages[0].width + pictureGap; // Funkcija koja se poziva unutar document.ready callback funkcije

var startingShift = function startingShift() {
  // Početni pomak gornjih slika u desno, zbog toga što želimo da red počne od prve slike a ne od klona zadnje slike
  $(".topSlider").css("transform", "translateX(".concat(topDistance, "px)")); // Početni pomak donjih slika u desno

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
  } // Pomak po x-osi uz animaciju


  $(".topSlider").css({
    transform: "translateX(".concat(topDistance, "px)"),
    transition: "transform 0.3s ease-in-out"
  }); // Event listener koji se aktivira kada je gotova CSS tranzicija te sukladno stanju varijable "sljedecaSlika" pomiče slider

  $(".topSlider").on("transitionend", function () {
    if (nextImage.attr("id") === "copyFirst") {
      // Vracamo se na pocetak reda, bez tranzicije
      topDistance = topRowImages[0].width + pictureGap;
      nextImage = topRowImages.eq(1);
      $(".topSlider").css({
        transform: "translateX(".concat(topDistance, "px)"),
        transition: "none"
      });
    }

    if (nextImage.attr("id") === "copyLast") {
      // Vracamo se na isti taj element predkraj reda, bez tranzicije
      topDistance = 1830;
      nextImage = topRowImages.eq(9);
      $(".topSlider").css({
        transform: "translateX(".concat(topDistance, "px)"),
        transition: "none"
      });
    } // Tek kada je CSS tranzicija gotova, postavljamo "tranzicijaTrajeGore" u stanje false


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
}; // Kada je DOM učitan, napravi početni pomak oba slidera sa nulte na prvu sliku, te dodaj event handlere za button


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