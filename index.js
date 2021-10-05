const topRowImages = $(".topSlider img");
const bottomRowImages = $(".bottomSlider img");

// Razmak između slika, odnosno column-gap
const pictureGap = 10;

// Boolske varijable korištene za ograničavanje izvođenja funkcije za pomak
let transitionLastsTopRow = false;
let transitionLastsBottomRow = false;

// Vrijednost pomaka po x-osi u pikselima
let topDistance = topRowImages[0].width + pictureGap;
let bottomDistance = bottomRowImages[0].width + pictureGap;

// Funkcija koja se poziva unutar document.ready callback funkcije
const startingShift = () => {
    // Početni pomak gornjih slika u desno, zbog toga što želimo da red počne od prve slike a ne od klona zadnje slike
    $(".topSlider").css("transform", `translateX(${topDistance}px)`);

    // Početni pomak donjih slika u desno
    $(".bottomSlider").css("transform", `translateX(${bottomDistance}px)`);
};

const shiftTopRow = direction => {
    if (transitionLastsTopRow) return;
    transitionLastsTopRow = true;

    const currentImage = topRowImages.filter(".activeImage");
    let nextImage, imageWidth;

    if (direction === "left") {
        nextImage = currentImage.next();
        imageWidth = currentImage[0].width;
        topDistance += imageWidth + pictureGap;
    } else {
        nextImage = currentImage.prev();
        imageWidth = nextImage[0].width;
        topDistance -= imageWidth + pictureGap;
    }

    // Pomak po x-osi uz animaciju
    $(".topSlider").css({ transform: `translateX(${topDistance}px)`, transition: "transform 0.3s ease-in-out" });

    // Event listener koji se aktivira kada je gotova CSS tranzicija te sukladno stanju varijable "sljedecaSlika" pomiče slider
    $(".topSlider").on("transitionend", () => {
        if (nextImage.attr("id") === "copyFirst") {
            // Vracamo se na pocetak reda, bez tranzicije
            topDistance = topRowImages[0].width + pictureGap;
            nextImage = topRowImages.eq(1);
            $(".topSlider").css({ transform: `translateX(${topDistance}px)`, transition: "none" });
        }
        if (nextImage.attr("id") === "copyLast") {
            // Vracamo se na isti taj element predkraj reda, bez tranzicije
            topDistance = 1830;
            nextImage = topRowImages.eq(9);
            $(".topSlider").css({ transform: `translateX(${topDistance}px)`, transition: "none" });
        }
        // Tek kada je CSS tranzicija gotova, postavljamo "tranzicijaTrajeGore" u stanje false
        transitionLastsTopRow = false;
        currentImage.removeClass("activeImage");
        nextImage.addClass("activeImage");
    });
};

const shiftBottomRow = direction => {
    if (transitionLastsBottomRow) return;
    transitionLastsBottomRow = true;

    const currentImage = bottomRowImages.filter(".activeImage");
    let nextImage, imageWidth;

    if (direction === "left") {
        nextImage = currentImage.next();
        imageWidth = currentImage[0].width;
        bottomDistance += imageWidth + pictureGap;
    } else {
        nextImage = currentImage.prev();
        imageWidth = nextImage[0].width;
        bottomDistance -= imageWidth + pictureGap;
    }

    $(".bottomSlider").css({ transform: `translateX(${bottomDistance}px)`, transition: "transform 0.3s ease-in-out" });

    $(".bottomSlider").on("transitionend", () => {
        if (nextImage.attr("id") === "copyFirst") {
            bottomDistance = bottomRowImages[0].width + pictureGap;
            nextImage = bottomRowImages.eq(1);
            $(".bottomSlider").css({ transform: `translateX(${bottomDistance}px)`, transition: "none" });
        }
        if (nextImage.attr("id") === "copyLast") {
            bottomDistance = 1830;
            nextImage = bottomRowImages.eq(9);
            $(".bottomSlider").css({ transform: `translateX(${bottomDistance}px)`, transition: "none" });
        }
        transitionLastsBottomRow = false;
        currentImage.removeClass("activeImage");
        nextImage.addClass("activeImage");
    });
};

// Kada je DOM učitan, napravi početni pomak oba slidera sa nulte na prvu sliku, te dodaj event handlere za button
$(document).ready(() => {
    startingShift();

    $("#buttonLeft").on("click", () => {
        shiftTopRow("left");
        shiftBottomRow("left");
    });
    $("#buttonRight").on("click", () => {
        shiftTopRow("right");
        shiftBottomRow("right");
    });
});
