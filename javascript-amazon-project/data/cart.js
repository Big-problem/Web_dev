/*
    Get a variable out of a file
    1. Add type="module" attribute
    2. Export
    3. import
    To avoid name conflict and can use fewer <script src=''>
    in html file. 
    Don't have to worry abour the order of files.
    In order for the module to work, 
    need to use live server.
*/

export let cart = JSON.parse(localStorage.getItem('cart')) // this variable can be used ouside of cart.js
if(!cart) cart = []

function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, selectQuantity) {
	let match;                                        
	
	cart.forEach((cartItem) => { // Add the selected quantity
		if(cartItem.productId === productId) match = cartItem;
	});
	if(match) match.quantity += Number(selectQuantity);
	else{
		cart.push({
			productId,
			quantity: Number(selectQuantity)
		});
	}

	saveToStorage();
}

export function removeFromCart(pruductId) {
	for(let i = 0; i < cart.length; i++) {
		if(cart[i].productId === pruductId) {
			cart.splice(i, 1);
			break;
		}
	}

	saveToStorage();
}

export function calculateCartQuantity() {
	let quantity = 0;
	cart.forEach((cartItem) => {
		quantity += cartItem.quantity
	});
	
	return quantity;
}