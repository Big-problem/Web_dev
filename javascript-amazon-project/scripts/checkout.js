import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";

function updateCartQuantity(){ // Update total quantity
	const cartQuantity = calculateCartQuantity();
	document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity} items`;
}

function updateItemQuantity(productId, newQuantity) { // Update the quantity of a specific item
	if(newQuantity <= 0 || newQuantity > 1000) {
		alert('Updated quantity should > 0 and <= 1000');
		document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
	}
	else {
		updateQuantity(productId, newQuantity);
		updateCartQuantity();
		document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
		document.querySelector(`.js-cart-item-container-${productId} .js-quantity-label`).innerHTML = newQuantity;
	}
}

let cartSummaryHTML = '';

cart.forEach((cartItem) => { // Generating HTML
	const {productId} = cartItem;

	let matchProduct;

	products.forEach((product) => {
		if(product.id === productId){
			matchProduct = product;
		} 
	});

	cartSummaryHTML += //底下的radio button相同name為一組 (每組只能選一個)
	`
		<div class="cart-item-container js-cart-item-container-${matchProduct.id}">
			<div class="delivery-date">Delivery date: Tuesday, June 21</div>

			<div class="cart-item-details-grid">
				<img
					class="product-image"
					src="${matchProduct.image}"
				/>

				<div class="cart-item-details">
					<div class="product-name">
						${matchProduct.name}
					</div>
					<div class="product-price">$${formatCurrency(matchProduct.priceCents)}</div>
					<div class="product-quantity">
						<span> Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span> </span>
						<span class="update-quantity-link link-primary js-update-link" data-product-id="${matchProduct.id}">
							Update
						</span>
						<input class="quantity-input js-quantity-input js-quantity-input-${matchProduct.id}" data-product-id="${matchProduct.id}">
						<span class="save-quantity-link link-primary js-save-link" data-product-id="${matchProduct.id}">
							Save
						</span>
						<span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchProduct.id}">
							Delete
						</span>
					</div>
				</div>

				<div class="delivery-options">
					<div class="delivery-options-title">
						Choose a delivery option:
					</div>
					<div class="delivery-option">
						<input 
							type="radio"
							checked
							class="delivery-option-input"
							name="delivery-option-${matchProduct.id}"
						/>
						<div>
							<div class="delivery-option-date">Tuesday, June 21</div>
							<div class="delivery-option-price">FREE Shipping</div>
						</div>
					</div>
					<div class="delivery-option">
						<input
							type="radio"
							class="delivery-option-input"
							name="delivery-option-${matchProduct.id}"
						/>
						<div>
							<div class="delivery-option-date">Wednesday, June 15</div>
							<div class="delivery-option-price">$4.99 - Shipping</div>
						</div>
					</div>
					<div class="delivery-option">
						<input
							type="radio"
							class="delivery-option-input"
							name="delivery-option-${matchProduct.id}"
						/>
						<div>
							<div class="delivery-option-date">Monday, June 13</div>
							<div class="delivery-option-price">$9.99 - Shipping</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
	`;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

updateCartQuantity();

document.querySelectorAll('.js-delete-link').forEach((link) => { // make the delete link functional
	link.addEventListener('click', () => {
		const {productId} = link.dataset;
		removeFromCart(productId);
		document.querySelector(`.js-cart-item-container-${productId}`).remove(); // remove from the page
		updateCartQuantity();
	})
})

document.querySelectorAll('.js-update-link').forEach((link) => { // make the update link functional
	link.addEventListener('click', () => {
		const {productId} = link.dataset;
		document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
	});
});

document.querySelectorAll('.js-save-link').forEach((link) => { // make the save link functional
	link.addEventListener('click', () => {
		const {productId} = link.dataset;
		let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
		updateItemQuantity(productId, newQuantity);
	});
});

document.querySelectorAll('.js-quantity-input').forEach((input) => {
	input.addEventListener('keyup', (event) => {
		if(event.key === 'Enter') {
			const {productId} = input.dataset;
			let newQuantity = Number(input.value);
			updateItemQuantity(productId, newQuantity);
		}
	});
});