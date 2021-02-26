let ProductsRow = document.getElementById('all-products');
// console.log(gender)
// const Pagination = document.getElementById('pagination')

async function getItems(search) {
    ProductsRow.innerHTML = ""
    document.getElementById('pagination').innerHTML = ""
    let response = await fetch(`http://localhost:3000/api/v1/products/get`);
    let jsonResponse = (await response.json())
    let all_products = jsonResponse.body;

    for (let item of all_products) {
        if (
            item.description.toLowerCase().includes(search.toLowerCase()) || 
            item.type.toLowerCase().includes(search.toLowerCase()) || 
            item.category.toLowerCase().includes(search.toLowerCase()) ||
            item.name.toLowerCase().includes(search.toLowerCase())
            ) {
            let html = `
    <div class="col-lg-3 col-md-6 col-sm-12 m-2 border p-1">
    <div class="row">
        <div class="col-md-6 col-sm-12">
            <img src="${item.images[0]}"
                alt="..." class="img-fluid w-100">
        </div>
        <div class="col-md-6 col-sm-12" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h6>${item.name}</h6>
            <a class="btn btn-sm btn-danger" href="product.html?id=${item._id}">BDT ${item.price}</a>
        </div>
    </div>
</div>
    `;

            AllProductsRow.innerHTML += html
        }
    }
    return;
}


function searchProduct(item) {
    getItems(item);
}