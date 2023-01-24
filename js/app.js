'use strict'

let listOfProducts = [];
let productSectionEl = document.getElementById('product-container');
let voteCountSectionEl = document.getElementById('voting-rounds-container');
let voteCount = 25;
let resultButtonEl = document.getElementById('results-button');
let resultsSectionEl = document.getElementById('results-container');

function Product(name, imagePath) {
    this.name = name;
    this.imagePath = `assets/img/${imagePath}`;
    this.timesShown = 0;
    this.timesClicked = 0;
    listOfProducts.push(this);
};

Product.prototype.render = function () {

    let voteNumber = document.createElement('h1');
    let img = document.createElement('img');
    let p = document.createElement('p');

    voteNumber.innerText = voteCount;

    img.src = this.imagePath;
    img.id = this.name;
    img.alt = this.name;
    img.className = "products-displayed"

    p.innerText = this.timesClicked;

    this.timesShown++;

    voteCountSectionEl.innerHTML = '';
    voteCountSectionEl.appendChild(voteNumber);
    img.appendChild(p);
    productSectionEl.appendChild(img)
};

new Product('bag', 'bag.jpg');
new Product('banana', 'banana.jpg');
new Product('bathroom', 'bathroom.jpg');
new Product('boots', 'boots.jpg');
new Product('breakfast', 'breakfast.jpg');
new Product('bubblegum', 'bubblegum.jpg');
new Product('chair', 'chair.jpg');
new Product('cthulhu', 'cthulhu.jpg');
new Product('dog-duck', 'dog-duck.jpg');
new Product('dragon', 'dragon.jpg');
new Product('pen', 'pen.jpg');
new Product('pet-sweep', 'pet-sweep.jpg');
new Product('scissors', 'scissors.jpg');
new Product('shark', 'shark.jpg');
new Product('sweep', 'sweep.png');
new Product('tauntaun', 'tauntaun.jpg');
new Product('sweep', 'sweep.png');
new Product('unicorn', 'unicorn.jpg');
new Product('water-can', 'water-can.jpg');
new Product('wine-glass', 'wine-glass.jpg');

function getRandomProduct() {
    return Math.floor(Math.random() * listOfProducts.length);
};

function renderRandomThree(arr) {

    let randomProducts = [];

    for (let i = 0; i < 3; i++) {
        randomProducts[i] = arr[getRandomProduct()];
    };

    while (randomProducts[0] === randomProducts[1]) {
        randomProducts[0] = arr[getRandomProduct()];
    };

    while (randomProducts[1] === randomProducts[2]) {
        randomProducts[1] = arr[getRandomProduct()];
    };

    while (randomProducts[0] === randomProducts[2]) {
        randomProducts[2] = arr[getRandomProduct()];
    };

    for (let product of randomProducts) {
        product.render();
    };
};

function addEventListeners(arr) {
    for (let item of arr) {
        item.addEventListener('click', handleClick)
    }
};

renderRandomThree(listOfProducts);

let renderedElements = document.querySelectorAll('img');
console.log(renderedElements)

function handleClick(event) {
    if (voteCount > 0) {
        console.log(event.target.id)
        listOfProducts.forEach((product) => {
            if (event.target.id === product.name) {
                product.timesClicked++;
            }
        })

        voteCount -= 1;
        productSectionEl.innerHTML = '';
        renderRandomThree(listOfProducts);
        renderedElements = document.querySelectorAll('img');
        addEventListeners(renderedElements);
    }
};

function handleResultClick() {

    let ul = document.createElement('ul');
    let liData = [];

    resultsSectionEl.innerHTML = '';

    for (let i = 0; i < listOfProducts.length; i++) {
        let li = document.createElement('li');

        liData[i] = `${listOfProducts[i].name} had ${listOfProducts[i].timesClicked} votes, and was seen ${listOfProducts[i].timesShown} times.`

        li.innerText = liData[i]

        ul.appendChild(li);
    }

    resultsSectionEl.append(ul);

}

resultButtonEl.addEventListener('click', handleResultClick)

addEventListeners(renderedElements);

