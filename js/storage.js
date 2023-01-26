'use strict'

// Save/Set products into localStorage 
function setProducts(state) {
    let data = JSON.stringify(state);
    localStorage.setItem('product', data);
    console.log('products saved!', localStorage)
}

// Retrieve products from localStorage
function getProducts() {
    let stringData = localStorage.getItem('product')
    console.log('getting products!', localStorage)
    return JSON.parse(stringData)
}

// Removes all app data
function removeProducts() {
    localStorage.clear();
}