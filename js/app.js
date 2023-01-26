'use strict'

// Global Lists 
let listOfProducts = new Array();
let listOfPrevRender = new Array;
let listOfUsedProducts = new Array();

// Global Variables 
let voteCount = 25;

// DOM Elements 
let resultButtonEl = document.getElementById('results-button');
let clearDataButtonEl = document.getElementById('clear-data-button');
let resultsSectionEl = document.getElementById('results-container');
let canvasEl = document.getElementById('chart');
let productSectionEl = document.getElementById('product-container');
let voteCountSectionEl = document.getElementById('voting-rounds-container');
let voteNumber;

// Chart
let chart = null;

// Local Storage States
const productsFromlocalStorage = getProducts();
// console.log('products from local storage', productsFromlocalStorage)
let state = null;

if (productsFromlocalStorage) {
    console.log(`products exist`);
    state = productsFromlocalStorage;
} else {
    console.log('products do not exist')
    state = {
        allProducts: [new Product('bag', 'bag.jpg'),
        new Product('banana', 'banana.jpg'),
        new Product('bathroom', 'bathroom.jpg'),
        new Product('boots', 'boots.jpg'),
        new Product('breakfast', 'breakfast.jpg'),
        new Product('bubblegum', 'bubblegum.jpg'),
        new Product('chair', 'chair.jpg'),
        new Product('cthulhu', 'cthulhu.jpg'),
        new Product('dog-duck', 'dog-duck.jpg'),
        new Product('dragon', 'dragon.jpg'),
        new Product('pen', 'pen.jpg'),
        new Product('pet-sweep', 'pet-sweep.jpg'),
        new Product('scissors', 'scissors.jpg'),
        new Product('shark', 'shark.jpg'),
        new Product('sweep', 'sweep.png'),
        new Product('tauntaun', 'tauntaun.jpg'),
        new Product('unicorn', 'unicorn.jpg'),
        new Product('water-can', 'water-can.jpg'),
        new Product('wine-glass', 'wine-glass.jpg'),],
        currentProducts: [],
        prevProducts: []
    };
}

function Product(name, imagePath) {
    this.name = name;
    this.imagePath = `assets/img/${imagePath}`;
    this.timesShown = 0;
    this.timesClicked = 0;
    listOfProducts.push(this);
};

function render(product) {


    let img = document.createElement('img');
    // let p = document.createElement('p');




    img.src = product.imagePath;
    img.id = product.name;
    img.alt = product.name;
    img.className = "products-displayed"

    // p.innerText = this.timesClicked;

    product.timesShown++;
    productSectionEl.appendChild(img)


    // img.appendChild(p);

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

function generateRandomProductIndex() {
    return Math.floor(Math.random() * state.allProducts.length);
};

function compareArrays(firstArr, secondArr) {
    console.log(firstArr.some(product => secondArr.includes(product)))

    return firstArr.some(product => secondArr.includes(product));
};

function hasDuplicate(array) {
    return new Set(array).size !== array.length;
}

function generateUniqueRandomProductIndex() {
    let index = generateRandomProductIndex();
    while (state.currentProducts.includes(index)) {
        index = generateRandomProductIndex();
    };
    return index;
};

function generateProductsToRender() {
    let listOfRandomGeneratedProducts = [];
    for (let i = 0; i < 3; i++) {
        listOfRandomGeneratedProducts[i] = state.allProducts[generateUniqueRandomProductIndex()];
    }

    while (hasDuplicate(listOfRandomGeneratedProducts)) {
        listOfRandomGeneratedProducts[0] = state.allProducts[generateRandomProductIndex()];
        listOfRandomGeneratedProducts[1] = state.allProducts[generateRandomProductIndex()];
        listOfRandomGeneratedProducts[2] = state.allProducts[generateRandomProductIndex()];
    }

    listOfUsedProducts = [...listOfRandomGeneratedProducts]

    state.currentProducts = [];
    for (let product of listOfRandomGeneratedProducts) {
        state.currentProducts.push(product)
    }

    return listOfRandomGeneratedProducts;
};


function renderRandomThree(array) {
    setProducts(state);
    // state = getProducts();
    state.prevProducts = [];
    for (let product of array) {
        console.log(`product rendered: ${product.name}`)
        state.prevProducts.push(product);
        render(product);
    };

    voteNumber = document.createElement('h1');
    voteNumber.innerText = voteCount;
    voteCountSectionEl.appendChild(voteNumber);

};


function addEventListeners(arr) {
    for (let item of arr) {
        item.addEventListener('click', handleClick)
    }
};


listOfPrevRender = [...listOfUsedProducts];

function handleClick(event) {
    if (voteCount > 0) {
        state.allProducts.forEach((product) => {
            if (event.target.id === product.name) {
                product.timesClicked++;
            }
        })

        voteCountSectionEl.innerHTML = '';

        voteNumber = document.createElement('h1');
        voteNumber.innerText = voteCount;
        voteCount -= 1;

        productSectionEl.innerHTML = '';

        let listOfItemsToRender = generateProductsToRender();
        while (compareArrays(state.prevProducts, listOfItemsToRender)) {
            listOfItemsToRender = generateProductsToRender();
        }

        renderRandomThree(listOfItemsToRender);


        renderedElements = document.querySelectorAll('img');
        addEventListeners(renderedElements);
    }
};

function handleResultBtnClick() {

    let clickData = [];
    let viewData = [];
    let nameValues = [];

    for (let i = 0; i < state.allProducts.length; i++) {
        nameValues.push(state.allProducts[i].name);
        clickData.push(state.allProducts[i].timesClicked)
        viewData.push(state.allProducts[i].timesShown)
    };

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

function handleClearBtnClick() {
    removeProducts();
}

renderRandomThree(generateProductsToRender());

let renderedElements = document.querySelectorAll('img');
addEventListeners(renderedElements);

resultButtonEl.addEventListener('click', handleResultBtnClick)
clearDataButtonEl.addEventListener('click', handleClearBtnClick)

