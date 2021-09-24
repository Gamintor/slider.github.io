const gornjeSlike = $(".gornjiSlider img");
const donjeSlike = $(".donjiSlider img");

// Razmak između slika, odnosno column-gap
const razmak = 10;

// Boolske varijable korištene za ograničavanje
let tranzicijaTrajeGore = false;
let tranzicijaTrajeDolje = false;

// Vrijednost pomaka po x-osi u pikselima
let gornjiPut = gornjeSlike[0].width + razmak;
let donjiPut = donjeSlike[0].width + razmak;

// Početni pomak gornjih slika u lijevo, zbog toga što želimo da red počne od prve slike a ne od klona zadnje slike
$(".gornjiSlider").css("transform", `translateX(${gornjiPut}px)`);

function pomakGornjiRed(smjer) {
    if (tranzicijaTrajeGore) return;
    tranzicijaTrajeGore = true;

    const trenutnaSlika = gornjeSlike.filter(".aktivnaSlika");
    let sljedecaSlika, sirina;

    if (smjer == "lijevo") {
        sljedecaSlika = trenutnaSlika.next();
        sirina = trenutnaSlika[0].width;
        gornjiPut += sirina + razmak;
    } else {
        sljedecaSlika = trenutnaSlika.prev();
        sirina = sljedecaSlika[0].width;
        gornjiPut -= sirina + razmak;
    }

    // Pomak po x-osi uz animaciju
    $(".gornjiSlider").css({ transform: `translateX(${gornjiPut}px)`, transition: "transform 0.3s ease-in-out" });

    // Event listener koji se aktivira kada je gotova CSS tranzicija te sukladno stanju varijable "sljedecaSlika" pomiče slider
    $(".gornjiSlider").on("transitionend", function () {
        if (sljedecaSlika.attr("id") == "kopijaPrve") {
            // Vracamo se na pocetak reda, bez tranzicije
            gornjiPut = gornjeSlike[0].width + razmak;
            sljedecaSlika = gornjeSlike.eq(1);
            $(this).css({ transform: `translateX(${gornjiPut}px)`, transition: "none" });
        }
        if (sljedecaSlika.attr("id") == "kopijaZadnje") {
            // Vracamo se na isti taj element predkraj reda, bez tranzicije
            gornjiPut = 1010;
            sljedecaSlika = gornjeSlike.eq(5);
            $(this).css({ transform: `translateX(${gornjiPut}px)`, transition: "none" });
        }
        // Tek kada je CSS tranzicija gotova, postavljamo "tranzicijaTrajeGore" u stanje false
        tranzicijaTrajeGore = false;
        trenutnaSlika.removeClass("aktivnaSlika");
        sljedecaSlika.addClass("aktivnaSlika");
    });
}

$(".donjiSlider").css("transform", `translateX(${donjiPut}px)`);

function pomakDonjiRed(smjer) {
    if (tranzicijaTrajeDolje) return;
    tranzicijaTrajeDolje = true;

    const trenutnaSlika = donjeSlike.filter(".aktivnaSlika");
    let sljedecaSlika, sirina;

    if (smjer == "lijevo") {
        sljedecaSlika = trenutnaSlika.next();
        sirina = trenutnaSlika[0].width;
        donjiPut += sirina + razmak;
    } else {
        sljedecaSlika = trenutnaSlika.prev();
        sirina = sljedecaSlika[0].width;
        donjiPut -= sirina + razmak;
    }

    $(".donjiSlider").css({ transform: `translateX(${donjiPut}px)`, transition: "transform 0.3s ease-in-out" });

    $(".donjiSlider").on("transitionend", function () {
        if (sljedecaSlika.attr("id") == "kopijaPrve") {
            donjiPut = donjeSlike[0].width + razmak;
            sljedecaSlika = donjeSlike.eq(1);
            $(this).css({ transform: `translateX(${donjiPut}px)`, transition: "none" });
        }
        if (sljedecaSlika.attr("id") == "kopijaZadnje") {
            donjiPut = 820;
            sljedecaSlika = donjeSlike.eq(4);
            $(this).css({ transform: `translateX(${donjiPut}px)`, transition: "none" });
        }
        trenutnaSlika.removeClass("aktivnaSlika");
        sljedecaSlika.addClass("aktivnaSlika");
        tranzicijaTrajeDolje = false;
    });
}

$("#tipkaLijevo").click(() => {
    pomakGornjiRed("lijevo");
    pomakDonjiRed("lijevo");
});
$("#tipkaDesno").click(() => {
    pomakGornjiRed("desno");
    pomakDonjiRed("desno");
});

// Stajling tipki za pomak
$("#tipkaDesno")
    .hover(
        function () {
            $(this).css("border", "2px solid #134880");
            $(this).children("img").attr("src", "./Assets/arrow-blue-right.png");
        },
        function () {
            $(this).css("border", "3px solid #DDDDDD");
            $(this).children("img").attr("src", "./Assets/arrow-gray-right.png");
        }
    )
    .mousedown(function () {
        $(this).css({ backgroundColor: "#b3b3b3", transform: "scale(0.90)" });
    })
    .mouseup(function () {
        $(this).css({ backgroundColor: "#fff", transform: "scale(1)" });
    });

$("#tipkaLijevo")
    .hover(
        function () {
            $(this).css("border", "2px solid #134880");
            $(this).children("img").attr("src", "./Assets/arrow-blue-left.png");
        },
        function () {
            $(this).css("border", "3px solid #DDDDDD");
            $(this).children("img").attr("src", "./Assets/arrow-gray-left.png");
        }
    )
    .mousedown(function () {
        $(this).css({ backgroundColor: "#b3b3b3", transform: "scale(0.90)" });
    })
    .mouseup(function () {
        $(this).css({ backgroundColor: "#fff", transform: "scale(1)" });
    });
