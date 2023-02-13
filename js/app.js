'use strict';

let image1 = document.querySelector('section img:nth-child(2)');
let image2 = document.querySelector('section img:nth-child(3)');
let image3 = document.querySelector('section img:nth-child(4)');
let container = document.querySelector(`section`);
container.addEventListener(`click`, myEventHandler);
let myButton = document.querySelector(`section + div`);

let indexArr = [];


function Pic(name, fileExt = `jpg`) {
    this.productName = name;
    this.src = `./img/images/${name}.${fileExt}`;
    this.views = 0;
    this.likes = 0;

};

function storePic(picToStore) {
    let stringifiedPic = JSON.stringify(picToStore)
    console.log("pqpqpq", stringifiedPic)
    localStorage.setItem('pic', stringifiedPic)
}

function getStoredPic() {
    let potentialPicFromStore = localStorage.getItem(`pic`)
    if (potentialPicFromStore) {
        let parsedPic = JSON.parse(potentialPicFromStore)
        return parsedPic
    }
}


// console.log(backIntoPic)

// let wineGlass = new Pic(`wine-glass`);
// let waterCan = new Pic(`water-can`);
// let unicorn = new Pic(`unicorn`);
// let tauntaun = new Pic(`tauntaun`);
// let sweep = new Pic(`sweep`, `png`);
// let shark = new Pic(`shark`);
// let scissors = new Pic(`scissors`);
// let petSweep = new Pic(`pet-sweep`);
// let pen = new Pic(`pen`);
// let dragon = new Pic(`dragon`);
// let dogDuck = new Pic(`dog-duck`);
// let cthulhu = new Pic(`cthulhu`);
// let chair = new Pic(`chair`);
// let bubbleGum = new Pic(`bubblegum`);
// let breakfast = new Pic(`breakfast`);
// let boots = new Pic(`boots`);
// let bathroom = new Pic(`bathroom`);
// let banana = new Pic(`banana`);
// let bag = new Pic(`bag`);

let pictureArray = [];
console.log(pictureArray)

function createPicArray() {
    let myPicBackFromStorage = getStoredPic()
    if (myPicBackFromStorage) {
        pictureArray = myPicBackFromStorage
    }
    else {
        let wineGlass = new Pic(`wine-glass`);
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
        let bubbleGum = new Pic(`bubblegum`);
        let breakfast = new Pic(`breakfast`);
        let boots = new Pic(`boots`);
        let bathroom = new Pic(`bathroom`);
        let banana = new Pic(`banana`);
        let bag = new Pic(`bag`);
        pictureArray = [wineGlass, waterCan, unicorn, tauntaun,
            sweep, shark, scissors, petSweep, pen, dragon, dogDuck,
            cthulhu, chair, bubbleGum, breakfast, boots, bathroom,
            banana, bag
        ];
    }
}

let startingClicksCount = 0;
let clicksAllowed = 25;

function getRandomNumber() {
    return Math.floor(Math.random() * pictureArray.length);
};


function renderPics() {
    while (indexArr.length < 19) {
        let num = getRandomNumber();
        // console.log(num)
        if (!indexArr.includes(num)) {
            indexArr.push(num);

        }
    }

    console.log(indexArr);

    let randomPicOne = indexArr.shift();
    let randomPicTwo = indexArr.shift();
    let randomPicThree = indexArr.shift();
    console.log(randomPicOne)

    image1.src = pictureArray[randomPicOne].src;
    image2.src = pictureArray[randomPicTwo].src;
    image3.src = pictureArray[randomPicThree].src;
    image1.alt = pictureArray[randomPicOne].productName;
    image2.alt = pictureArray[randomPicTwo].productName;
    image3.alt = pictureArray[randomPicThree].productName;
    pictureArray[randomPicOne].views++;
    pictureArray[randomPicTwo].views++;
    pictureArray[randomPicThree].views++;
    // console.log(pictureArray[picOne])
    // console.log(pictureArray)

    if (randomPicOne === randomPicTwo || randomPicTwo === randomPicThree || randomPicThree === randomPicOne) {
        renderPics()
    }


};

function myEventHandler(e) {
    startingClicksCount++
    // console.log(startingClicksCount)
    let chosenPic = e.target.alt
    for (let i = 0; i < pictureArray.length; i++) {
        if (pictureArray[i].productName === chosenPic) {
            pictureArray[i].likes++
        }
    }
    renderPics()
    // console.log(pictureArray)

    function renderResults() {
        let results = document.querySelector('ul');
        for (let j = 0; j < pictureArray.length; j++) {
            let resultLi = document.createElement(`li`)
            resultLi.textContent = `${pictureArray[j].productName} had ${pictureArray[j].views} views and ${pictureArray[j].likes} likes.`
            results.appendChild(resultLi)
        };
    };

    if (startingClicksCount === clicksAllowed) {
        console.log("hi")
        container.removeEventListener(`click`, myEventHandler)
        myButton.addEventListener(`click`, renderResults)
        renderChart();
        storePic(pictureArray)
    };
};


function renderChart() {
    let productLikes = [];
    let product = [];
    let view = [];
    for (let i = 0; i < pictureArray.length; i++) {
        productLikes.push(pictureArray[i].likes)
        product.push(pictureArray[i].productName)
    }
    for (let i = 0; i < pictureArray.length; i++) {
        view.push(pictureArray[i].views)
    }
    // console.log(productLikes)
    const ctx = document.getElementById('myChart');
    let config = {
        type: 'bar',
        data: {
            labels: product,
            datasets: [
                {
                    label: '# of Votes',
                    data: productLikes,
                    borderWidth: 1
                },
                {
                    label: '# of Views',
                    data: view,
                    borderWidth: 1
                }
            ]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }

    new Chart(ctx, config);
};
createPicArray()
renderPics();

