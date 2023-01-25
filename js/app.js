'use strict'

// Global Lists 
let listOfProducts = new Array();
let listOfPrevRender = new Array;
let listOfUsedProducts = new Array();
let listOfRandomProductsToRender = new Array();

// Global Variables 
let voteCount = 25;

// DOM Elements 
let resultButtonEl = document.getElementById('results-button');
let resultsSectionEl = document.getElementById('results-container');
let canvasEl = document.getElementById('chart');
let productSectionEl = document.getElementById('product-container');
let voteCountSectionEl = document.getElementById('voting-rounds-container');

let chart = null;



// get random number, if image get from random number, while loop run 6 times, use random number to fill array, if array does not already include the random product, push it to rendering array of 6 unique items, 

// if product[1] !== product[2] && product[1] !== product[3]


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
new Product('unicorn', 'unicorn.jpg');
new Product('water-can', 'water-can.jpg');
new Product('wine-glass', 'wine-glass.jpg');

function getRandomProduct() {
    return Math.floor(Math.random() * listOfProducts.length);
};

function compareArrays(firstArr, secondArr) {
    console.log(firstArr.some(product => secondArr.includes(product)))

    return firstArr.some(product => secondArr.includes(product));
}

function getRandomThree(arr) {

    console.log(`start of get randomThree func: ${listOfUsedProducts[0]}`)

    listOfRandomProductsToRender = [];

    for (let i = 0; i < 3; i++) {
        listOfRandomProductsToRender[i] = arr[getRandomProduct()];
    };

    while (listOfRandomProductsToRender[0] === listOfRandomProductsToRender[1]) {
        listOfRandomProductsToRender[0] = arr[getRandomProduct()];
    };

    while (listOfRandomProductsToRender[1] === listOfRandomProductsToRender[2]) {
        listOfRandomProductsToRender[1] = arr[getRandomProduct()];
    };

    while (listOfRandomProductsToRender[0] === listOfRandomProductsToRender[2]) {
        listOfRandomProductsToRender[2] = arr[getRandomProduct()];
    };



    listOfUsedProducts = [...listOfRandomProductsToRender]
}


function renderRandomThree(array) {

    for (let product of array) {
        console.log(`product rendered: ${product.name}`)
        product.render();
    };

};



function addEventListeners(arr) {
    for (let item of arr) {
        item.addEventListener('click', handleClick)
    }
};




function handleClick(event) {
    if (voteCount > 0) {
        listOfProducts.forEach((product) => {
            if (event.target.id === product.name) {
                product.timesClicked++;
            }
        })

        listOfPrevRender = [...listOfUsedProducts];

        voteCount -= 1;
        productSectionEl.innerHTML = '';

        getRandomThree(listOfProducts);

        while (compareArrays(listOfPrevRender, listOfRandomProductsToRender)) {
            getRandomThree(listOfProducts);
        }
        
        renderRandomThree(listOfRandomProductsToRender)

        console.log(`list of prev img in click func AFTER renderrando3 func called: ${listOfPrevRender[0]}`);

        renderedElements = document.querySelectorAll('img');
        addEventListeners(renderedElements);
    }
};

function handleResultClick() {

    let clickData = [];
    let viewData = [];
    let nameValues = [];

    for (let i = 0; i < listOfProducts.length; i++) {
        nameValues.push(listOfProducts[i].name);
        clickData.push(listOfProducts[i].timesClicked)
        viewData.push(listOfProducts[i].timesShown)
    }


    if (voteCount === 0) {
        chart = new Chart(canvasEl, {
            type: 'bar',
            data: {
                labels: nameValues,
                datasets: [{
                    label: '# of Votes',
                    data: clickData,
                    borderWidth: 1
                }, {
                    label: '# of Views',
                    data: viewData,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        alert(`You have ${voteCount} votes left!`)
    }
};


getRandomThree(listOfProducts);
renderRandomThree(listOfRandomProductsToRender);

let renderedElements = document.querySelectorAll('img');
addEventListeners(renderedElements);
resultButtonEl.addEventListener('click', handleResultClick)


