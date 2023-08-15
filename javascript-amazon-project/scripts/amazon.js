import {cart} from '../data/cart.js'; // import the variable to avoid name conflict (put it at the top of the file)

// Save the data
// data/products.js this file will do it

// Generating HTML
let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
        <img
            class="product-image"
            src="${product.image}"
        />
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
        <img
            class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png"
        />
        <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>

        <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

        <div class="product-quantity-container">
        <select class='js-quantity-selector-${product.id}'>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-button"
        data-product-id='${product.id}'>
            Add to Cart
        </button>
    </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    let timeoutId; // Using JS closure property, every for loop has its own timeoutId variable

    button.addEventListener('click', () => {
        const {productId} = button.dataset; // dataset property gave us all the data attributes
                                            // use camel case to access it
        const selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
        let match;                                        
        
        cart.forEach((item) => { // Add the selected quantity
            if(item.productId === productId) match = item;
        });
        if(match) match.quantity += Number(selectQuantity);
        else{
            cart.push({
                productId,
                quantity: Number(selectQuantity)
            });
        }

        let cartQuantity = 0;
        cart.forEach((item) => { // calculate the total quantity
            cartQuantity += item.quantity;
        });
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        
        document.querySelector(`.js-added-to-cart-${productId}`).classList.add('product-selected');

        if(timeoutId) clearTimeout(timeoutId); // 重複購買會重製setTimeout
        timeoutId = setTimeout(() => {
            document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('product-selected');
        }, 2000);
    })
});