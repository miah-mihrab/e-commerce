let cart = localStorage.getItem('mycart');
const CartValue = document.getElementById('cartValue')

if (cart != null && Object.keys(JSON.parse(cart)).length > 0) {
    CartValue.textContent = Object.keys(JSON.parse(cart)).length
} else {
    CartValue.textContent = 0
}