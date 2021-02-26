let products = [];
let cartTotal = 0;
let totalWithServiceCharge = 0;
let serviceCharge = 2;

const CartTotal = document.getElementById('cart-total');
const ServiceCharge = document.getElementById('service-charge');
const TotalWithCharge = document.getElementById('totalWithCharge');
ServiceCharge.textContent = serviceCharge + "%";


function onQuantityChange(id) {
    let cartItems = localStorage.getItem('mycart');
    cartItems = JSON.parse(cartItems);

    let item = document.getElementById(id);
    console.log(item.value)
    cartItems[id].quantity = item.value


    let prod = products.find(item => item._id === id);

    cartTotal = 0;
    totalWithServiceCharge = 0;

    for (let item of products) {
        cartTotal += item.price * cartItems[item._id].quantity;
    }

    CartTotal.textContent = cartTotal.toFixed(2)
    TotalWithCharge.textContent = (cartTotal + (cartTotal * (serviceCharge / 100))).toFixed(2)
    localStorage.setItem('mycart', JSON.stringify(cartItems))


}


function removeItem(id) {
    let item = document.getElementById(id);
    item.remove();
    let cartItems = localStorage.getItem('mycart');
    cartItems = JSON.parse(cartItems);
    delete cartItems[id.split("-")[1]];
    console.log(Object.keys(cartItems))

    let ids = Object.keys(cartItems);
    cartTotal = 0;
    totalWithServiceCharge = 0;

    for (let item of products) {
        if (ids.includes(item._id)) {
            cartTotal += item.price * cartItems[item._id].quantity;
        }
    }

    if (cartTotal === 0) {
        localStorage.removeItem('mycart');
        document.getElementById('cart-details').classList.add('d-none')
        document.getElementById('empty-cart').innerHTML = `<img src="https://professionalscareer.com/assets/images/emptycart.png" class="w-lg-25 w-md-50 img-fluid"/>`
    } else {
        CartTotal.textContent = cartTotal.toFixed(2)
        TotalWithCharge.textContent = (cartTotal + (cartTotal * (serviceCharge / 100))).toFixed(2)

        localStorage.setItem('mycart', JSON.stringify(cartItems))
    }
}


(async () => {
    const Cart = document.getElementById('cart');

    let cartItems = localStorage.getItem('mycart');
    // console.log(cartItems !== null, Object.keys(JSON.parse(cartItems)).length > 0)
    if (cartItems !== null && Object.keys(JSON.parse(cartItems)).length > 0) {
        cartItems = JSON.parse(cartItems);
        const ids = Object.keys(cartItems);
        console.log(ids)
        const response = await fetch('http://localhost:3000/api/v1/products/get/by/ids', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: ids })
        });

        products = (await response.json()).body;


        // Set No Of Cart Items
        if (products) {
            document.getElementById('numberOfItems').textContent = `CART ITEMS# ${products.length}`


            let count = 0;
            for (let item of products) {
                count++;
                let html = `
          
              <div class="row mb-4" id="pid-${item._id}">
                 <div class="col-md-3 col-lg-3 col-xl-3">
                     <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                         <img class="img-fluid w-100"
                             src="${item.images[0]}"
                             alt="Sample">
                     </div>
                 </div>
                 <div class="col-md-9 col-lg-9 col-xl-9">
                     <div>
                         <div class="d-flex justify-content-between">
                             <div>
                                 <h5>${item.name}</h5>
                                 <p class="mb-3 text-muted text-uppercase small">Size: ${cartItems[item._id].size}</p>
                             </div>
                             <div>
                                 <input type="number" class="form-control" value=${cartItems[item._id]['quantity']} min=1 max=${item.productAvailable} oninput="onQuantityChange('${item._id}')" id="${item._id}">
                                 <small id="passwordHelpBlock" class="form-text text-muted text-center">
                                     (Note, ${cartItems[item._id]['quantity']} piece)
                                 </small>
                             </div>
                         </div>
                         <div class="d-flex justify-content-between align-items-center">
                             <div>
                                 <a href="#!" type="button"
                                     class="card-link-secondary small text-uppercase mr-3 text-secondary" onclick="removeItem('pid-${item._id}')"><i
                                         class="fas fa-trash-alt mr-1"></i> Remove item </a>
                             </div>
                             <p class="mb-0"><span><strong id="summary">BDT ${(item.price).toFixed(2)}</strong></span></p
                                 class="mb-0">
                         </div>
                     </div>
                 </div>
              </div>
              ${count < products.length ? "<hr class='mb-4'>" : ""}
              
            `
                Cart.innerHTML += html;


                // Adding Price
                cartTotal += item.price * cartItems[item._id].quantity;

            }




            // Total Calculation //


            // let cartSum = products.reduce((a, b) => ({ price: a.price + b.price }))
            CartTotal.textContent = cartTotal.toFixed(2)
            TotalWithCharge.textContent = (cartTotal + (cartTotal * (serviceCharge / 100))).toFixed(2)
        } else {
            document.getElementById('cart-details').classList.add('d-none')
            document.getElementById('empty-cart').innerHTML = `<img src="https://professionalscareer.com/assets/images/emptycart.png" class="w-lg-25 w-md-50 img-fluid"/>`
        }
    } else {
        document.getElementById('cart-details').classList.add('d-none')
        document.getElementById('empty-cart').innerHTML = `<img src="https://professionalscareer.com/assets/images/emptycart.png" class="w-lg-25 w-md-50 img-fluid"/>`
    }


})();

