const AllProductsRow = document.getElementById('all-products');
let QueryParams = new URLSearchParams(window.location.search);
let gender = QueryParams.get('gender');
console.log(gender)
// const Pagination = document.getElementById('pagination')

let TotalProducts = 0;
let current_page = 1;
// async function getItems(limit, page) {
//     // console.log(limit, page, ';')
//     AllProductsRow.innerHTML = ""
//     console.log(limit, page)
    
//     let response = await fetch(`http://localhost:3000/api/v1/products/get?limit=${limit}&page=${page}&gender=${gender === null ? '': gender}`);
//     let jsonResponse = (await response.json())
//     let all_products = jsonResponse.body;

//     for (let item of all_products) {
//         let html = `
//     <div class="col-lg-3 col-md-6 col-sm-12 m-2 border p-1">
//     <div class="row">
//         <div class="col-md-6 col-sm-12">
//             <img src="${item.images[0]}"
//                 alt="..." class="img-fluid w-100">
//         </div>
//         <div class="col-md-6 col-sm-12" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
//             <h6>${item.name}</h6>
//             <a class="btn btn-sm btn-danger" href="product.html?id=${item._id}">BDT ${item.price}</a>
//         </div>
//     </div>
// </div>
//     `;

//         AllProductsRow.innerHTML += html
//     }
//     TotalProducts = jsonResponse.total;
//     return;
// }
async function GetItems(limit, page) {
    console.log(limit, page)
    AllProductsRow.innerHTML = ""
    console.log(limit, page)
    
    let response = await fetch(`http://localhost:3000/api/v1/products/get?limit=${limit}&page=${page}&gender=${gender === null ? '': gender}`);
    let jsonResponse = (await response.json())
    let all_products = jsonResponse.body;

    for (let item of all_products) {
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
    TotalProducts = jsonResponse.total;
}

(async () => {
    const Pagination = document.getElementById('pagination')

    await GetItems(3, 1); //Initially 3 and 1

    let html = ``;

    for (let i = 1; i <= Math.ceil(TotalProducts / 3); i++) {
        html = `<li class="page-item"><a class="page-link" href="", onclick="GetItems(3, ${i})">${i}</a></li>`;
        Pagination.innerHTML += html;
    }

    let page_links = document.getElementsByClassName('page-link');
    for (let j = 0; j < page_links.length; j++) {
        page_links[j].addEventListener('click', e => {
            e.preventDefault()
        })
    }

})();