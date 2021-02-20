let QueryParams = new URLSearchParams(window.location.search);
let productId = QueryParams.get('id');
// 

(async () => {
    const ProductImage = document.getElementById('product-image');
    const ProductDetails = document.getElementById('product-details')
    let response = await fetch('http://localhost:3000/api/v1/products/get/single/' + productId);
    let Product = (await response.json()).body;

    ProductImage.innerHTML += `<img src=${Product.images[0]} style="width:100%"/>`
    ProductDetails.innerHTML += `
          <p id="title">${Product.type}</p>
            <h1 id="name">${Product.name} by ${Product.brand}</h1>
            <h4 id="price">BDT ${Product.price}</h4>
            <h4 id="available">Available ${Product.productAvailable}</h4>
            <select name="" id="sizes" class="form-control" style="width: 20%;">
                <option value="">Select Size</option>
                <option value="xxl">XXL</option>
                <option value="xl">XL</option>
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
            </select><br>
            <input type="number" value="1" id="productQuantity" class="form-control" style="width: 20%;"> <br>
            <a href="" class="btn btn-danger" id="addToCart">Add To Cart</a> <br>
            <p class="danger" id="quantityError"></p>
            <h3>Product Details</h3>
            <br>
            <p> ${Product.description}</p>
    `



    // SIMILAR PRODUCTS //
    const similarProductResponse = await fetch(`http://localhost:3000/api/v1/products/get/category?category=${Product.category}`);
    const similarProduct = (await similarProductResponse.json()).body;
    const SimilarProductRow = document.getElementById('similar-products');
    for (let i=0; i < (similarProduct.length > 4 ? 4 : similarProduct.length); i++) {
        let product = similarProduct[i];
        let html = `
        <div class="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mt-2">
        <div class="card trending-item" style="width: 21rem;">
            <img width="100" height="350" style="object-fit: cover;" src="${product.images[0]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <div class="col-6">BDT ${product.price}</div>
                <a href="product.html?id=${product._id}" class="btn btn-danger mt-4">Add To Cart</a>
            </div>
        </div>
        </div> 
        `;

        SimilarProductRow.innerHTML += html;
    }




    // ADD TO CART //
    const ProductQuantity = document.getElementById('productQuantity'); // Number of product to buy
    const ProductSizes = document.getElementById('sizes');
    const Error = document.getElementsByClassName('danger')[0];
    document.getElementById('addToCart').addEventListener('click', e => {
        console.log(ProductQuantity.value)
        console.log(ProductSizes.value)
        e.preventDefault();
        if (ProductQuantity.value > 17) {
            Error.textContent = `Unfortunately we cannot provide more than ${17} items`
        } else if (ProductQuantity.value < 1) {
            Error.textContent = `You should order at least 1 item`
        } else {

            let myOrders = localStorage.getItem('mycart');
            if (myOrders === null) {
                //null means empty
                let myOrder = {
                    [`${productId}`]: {
                        size: ProductSizes.value,
                        quantity: ProductQuantity.value
                    }
                }

                localStorage.setItem('mycart', JSON.stringify(myOrder))
            } else {
                myOrders = JSON.parse(myOrders);
                let productIds = Object.keys(myOrders);

                if (productIds.includes(productId)) {
                    myOrders[productId].size = ProductSizes.value;
                    myOrders[productId].quantity = ProductQuantity.value;
                } else {
                    myOrders[`${productId}`] = {
                        size: ProductSizes.value,
                        quantity: ProductQuantity.value
                    }
                }
                // myOrders.push(productId);
                // myOrders = new Set(...myOrders);
                // console.log(myOrders)
                localStorage.setItem('mycart', JSON.stringify(myOrders))
            };
        }

        e.preventDefault()
    })

})()
// let fetchProductById =