import products from '../data/products.js';

const quantity = document.querySelector('.quantity');
const cart = [];
const savedCartLength = getLocalStorage();
quantity.innerHTML = savedCartLength;

export const renderProduct = (selector, data) => {
    

    const parent = document.querySelector(selector);
    let productsHtml = '';
    const { id, img, title, descrMini, price } = data;
    const imgName = img ? img : 'noimg.webp';

    const html = 
        `<div class="product" data-id="${ id }">
            <div class="product__img">
                <img src="./img/products/${ imgName }" alt="">
            </div>
            <h3 class="product__title">${ title }</h3>
            <p class="product__descr">${ descrMini }</p>
            <div class="product__price-block">
                <span class="product__price">${ price }</span>
                <button class="product__add-to-cart" data-id="${ id }">Add to cart</button>
            </div>
        </div>`;

    parent.insertAdjacentHTML('beforeend', html);
    productsHtml = document.querySelectorAll('.product__add-to-cart');

    productsHtml.forEach(btn => {
        btn.addEventListener('click', addToCartHandler);
        // btn.onclick = addToCartHandler;
    });
}

function getProductById(productId) {
    return products.find(product => product.id === parseInt(productId));
}

function addToCartHandler() {
    const productId = this.dataset.id;
    const selectedProduct = getProductById(productId);
    
    if (selectedProduct) {
        cart.push(selectedProduct);
        quantity.innerHTML = cart.length;
        console.log(cart);
        saveLocalStorage();
    }

    const parent = this.closest('.product');
    const id = parent.dataset.id;
    
    console.log('click', id);
}

// localStorage.clear(); // Очищує localStorage, наприклад, від даних попередніх задач

function saveLocalStorage() {
    localStorage.setItem('cartLength', String(cart.length));  
    console.log('Data saved:', cart.length);
}
  
function getLocalStorage() {
    const getData = localStorage.getItem('cartLength');    
    console.log('Data loaded:', getData);
    return parseInt(getData) || 0;
}