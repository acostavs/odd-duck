'use strict';

let image1 = document.querySelector('section img:nth-child(2)');
let image2 = document.querySelector('section img:nth-child(3)');
let image3 = document.querySelector('section img:nth-child(4)')
let container = document.querySelector(`section`)

let wineGlass = new Pic(`wine-glassjpg`);
let waterCan = new Pic(`water-can`);
let unicorn = new Pic(`unicorn`);
let tauntaun = new Pic(`tauntaun`);
let sweep = new Pic(`sweep`, `png`);
let shark = new Pic(`shark`);
let scissors = new Pic(`scissors`);
let petSweep = new Pic(`pet-sweep`);
let pen = new Pic(`pen`);
let dragon = new Pic(`dragon`);
let dogDuck = new Pic(`dog-duck`);
let cthulhu = new Pic(`cthulhu`);
let chair = new Pic(`chair`);
let bubbleGum = new Pic(`bubblegumjpg`);
let breakfast = new Pic(`breakfast`);
let boots = new Pic(`boots`);
let bathroom = new Pic(`bathroom`);
let banana = new Pic(`banana`);
let bag = new Pic(`bag`);

let pictureArray = [wineGlass, waterCan, unicorn, tauntaun,
    sweep, shark, scissors, petSweep, pen, dragon, dogDuck,
    cthulhu, chair, bubbleGum, breakfast, boots, bathroom,
    banana, bag
];

let startingClicksCount = 0;
let clicksAllowed = 25;

function Pic(name, fileExt = `jpg`) {
    this.productName = name;
    this.src = `../img/images/${name}.${fileExt}`;
    this.views = 0;
    this.likes = 0

};

function getRandomNumber() {
    return Math.floor(Math.random() * pictureArray.length);
};

function renderPics() {
    let randomPicOne = getRandomNumber()
    let randomPicTwo = getRandomNumber()
    let randomPicThree = getRandomNumber()
    image1.src = pictureArray[randomPicOne].src;
    image2.src = pictureArray[randomPicTwo].src;
    image3.src = pictureArray[randomPicThree].src;
    image1.alt = pictureArray[randomPicOne].productName
    image2.alt = pictureArray[randomPicTwo].productName
    image3.alt = pictureArray[randomPicThree].productName
    pictureArray[randomPicOne].views++
    pictureArray[randomPicTwo].views++
    pictureArray[randomPicThree].views++
    // console.log(pictureArray[picOne])
    // console.log(pictureArray)

    while (randomPicOne === randomPicTwo || randomPicOne === randomPicThree || randomPicTwo === randomPicThree) {
        renderPics()
    }
};

function myEventHandler(e) {
    // console.log(e.target.currentSrc)
    let chosenPic = e.target.alt
    for (let i = 0; i < pictureArray.length; i++) {
        if (pictureArray[i].productName === chosenPic) {
            pictureArray[i].likes++
        }
    }
    console.log(pictureArray)
    renderPics()
}


if (startingClicksCount < clicksAllowed) {
    renderPics()
}
else {
    container.removeEventListener(`click`, myEventHandler)
}

renderPics()

container.addEventListener(`click`, myEventHandler)
