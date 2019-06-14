const cardPics = [
    {image: "./images/Charlotte_day.jpg", value: 1},
    {image: "./images/Charlotte_day.jpg", value: 1},
    {image: "./images/Charlotte_night.jpg", value: 2},
    {image: "./images/Charlotte_night.jpg", value: 2},
    {image: "./images/stadium.jpg", value: 3},
    {image: "./images/stadium.jpg", value: 3},
    {image: "./images/disc.jpg", value: 4},
    {image: "./images/disc.jpg", value: 4},
    {image: "./images/firebird.jpg", value: 5},
    {image: "./images/firebird.jpg", value: 5}
    ];

let matchArr = [];
let matchCount = 0;
let clickCount = 0;
let oneScore = 0;
let twoScore = 0;
let player = 1;
let id = 1;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

function gameOver() {
    $(".gameOver").toggle(".gameOver");
    (oneScore > twoScore) ? $(".winner").text(`Blue Player wins ${oneScore} to ${twoScore}!`) 
    : $(".winner").text(`Red Player wins ${twoScore} to ${oneScore}!`);
};

function playRound() {
    if (matchCount === 5) {
        gameOver();
    };
};

function matchCheck() {
    if (clickCount === 2) {
        if (matchArr[0] === matchArr[1]) {
            clickCount = 0;
            matchCount++;
            matchArr = [];
            (player === 1) ? oneScore++ : twoScore++;
            $(".pOneScore").text("Blue Player Matches: " + oneScore);
            $(".pTwoScore").text("Red Player Matches: " + twoScore);
            $(".is-flipped").remove(".is-flipped");
            playRound();
        } else {
            clickCount = 0;
            matchArr = [];
            (player === 1) ? player = 2 : player = 1;
            $(".is-flipped").toggleClass("is-flipped");
            $(".board").toggleClass("blue");
            $(".board").toggleClass("red");
            $(".gameOver").toggleClass("blue");
            $(".gameOver").toggleClass("red");
            $(".pOneScore").toggleClass("turn");
            $(".pTwoScore").toggleClass("turn");
        };
    };
};

function startGame() {
    $(".gameOver").hide();
    $(".board").toggleClass("blue");
    $(".board").toggleClass("red");
    $(".gameOver").toggleClass("blue");
    $(".gameOVer").toggleClass("red");
    $(".pOneScore").toggleClass("turn");
    $(".pTwoScore").toggleClass("turn");

    shuffle(cardPics);

    //---------------------Example of using vanilla JS----------------------//

    cardPics.forEach((pic) => {
        let playRow = document.getElementById("playArea");
        let sceneDiv = document.createElement("div");
        let cardDiv = document.createElement("div");
        let frontDiv = document.createElement("div");
        let frontImg = document.createElement("img");
        let backDiv = document.createElement("div");
        let backImg = document.createElement("img");

        sceneDiv.setAttribute("class", "scene");
        cardDiv.setAttribute("id", `${id}`);
        cardDiv.setAttribute("class", "card");
        cardDiv.setAttribute("data-value", `${pic.value}`);
        cardDiv.addEventListener("click", function() {
                if (!this.classList.contains("is-flipped")) {
                    this.classList.toggle("is-flipped");
                    clickCount++;
                    matchArr.push(this.getAttribute("data-value"));
                    setTimeout(() => {matchCheck()}, 1000);
                };
            });
        frontDiv.setAttribute("class", "cardFace front");
        frontImg.setAttribute("src", "./images/crown.png");
        frontImg.setAttribute("alt", "Crown");
        backDiv.setAttribute("class", "cardFace back");
        backImg.setAttribute("src", `${pic.image}`);
        backImg.setAttribute("alt", `${pic.value}`);

        backDiv.appendChild(backImg);
        frontDiv.appendChild(frontImg);
        cardDiv.appendChild(frontDiv);
        cardDiv.appendChild(backDiv);
        sceneDiv.appendChild(cardDiv);
        playRow.appendChild(sceneDiv);

        id++;
    });

    //-----------------------------------------------------------------------//
    setTimeout(() => {
        id--;
        for (let i = 1; i < 11; i++) {
            setTimeout(() => {
                $(`#${id}`).toggleClass("center");
                id--;
            }, (1000 + ((i+1)*50)));
        }
    }, 1);

    setTimeout(() => {
        id++;
        for (let i = 1; i < 11; i++) {
            setTimeout(() => {
                $(`#${id}`).toggleClass("center");
                id++;
            }, (1500 + ((i+1)*50)));
        }
    }, 1);

    setTimeout(() => {$("#1").toggleClass("center")}, 1550);
};

$(".begin").on("click", () => {
    $(".begin").hide();
    startGame();
    $(".pOneScore").text("Blue Player Matches: 0");
    $(".pTwoScore").text("Red Player Matches: 0");
});


$(".playAgain").on("click", () => {
    $(".scene").remove(".scene");
    $(".pOneScore").text("Blue Player Matches: 0");
    $(".pTwoScore").text("Red Player Matches: 0");
    (player === 1) ? player = 2 : player = 1;
    oneScore = 0;
    twoScore = 0;
    matchCount = 0;
    id = 1;
    startGame();
});

$(".gameOver").hide();