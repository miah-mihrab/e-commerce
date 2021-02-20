
// dress, jeans, jacket, t-shirt, shirt, shoes, watch, sunglass, perfume
const Root = async () => {
    let fetchTrendings = await fetch('http://localhost:3000/api/v1/products/get/by/search-term?search=trending');
    let fetchHotItems = await fetch('http://localhost:3000/api/v1/products/get/by/search-term?search=hot item');
    let Trendings = (await fetchTrendings.json()).body;
    let HotItems = (await fetchHotItems.json()).body;
    console.log(HotItems)

    let TrendingRow = document.getElementById('trending-row');
    let HotItemsDiv = document.getElementById('hot-items');
    let OwlCarousel = document.createElement('div');
    console.log(OwlCarousel)
    OwlCarousel.classList.add('owl-carousel');
console.log(OwlCarousel, 'HE')
    // SET TRENDING ITEM
    const setTrendingItems = (item) => {
        let html = `
    <div class="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mt-2">
    <div class="card trending-item" style="width: 21rem;">
        <img width="100" height="350" style="object-fit: cover;" src="${item.images[0]}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <div class="col-6">${item.price}</div>
            <a href="product.html?id=${item._id}" class="btn btn-danger mt-4">Add To Cart</a>
        </div>
    </div>
    </div>    
    `
        TrendingRow.innerHTML += html
    }



    const allTrendings = () => {
        for (let item of Trendings) {
            console.log(item.search_term)
            if (item.search_term === 'trending') {
                setTrendingItems(item)
            }

        }
    };

    const allHotItems = () => {
        for (let item of Trendings) {
            let html = `
            <div class="card" style="width: 21rem;">
            <img width="100" height="350" style="object-fit: cover;"
                src="${item.images[0]}"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <div class="col-6">BDT ${item.price}</div>
                <a href="product.html?id=${item._id}" class="btn btn-danger mt-4">Add To Cart</a>
            </div>
        </div>
            `;

        OwlCarousel.innerHTML += html;
            
        }
        console.log(OwlCarousel)
        HotItemsDiv.appendChild(OwlCarousel);
    }

    allTrendings();
    allHotItems();



    function trendingTypeFilter(type) {
        console.log(type)
        TrendingRow.innerHTML = ""
        if (type === 'all') {
            allTrendings()
        }
        let filtered = Trendings.filter(item => item.type === type && item.search_term === 'trending')
        console.log(filtered)
        if (filtered) {
            for (let item of filtered) {
                setTrendingItems(item)
            }
        }
    }


}
Root()


 // [
 //     {
 //         id: "6eat23ddfff",
 //         color: ['cream'],
 //         name: "Neck Shirt",
 //         price: 2300,
 //         sale: 20,
 //         type: 'shoes',
 //         search_terms: 'trending',
 //         images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=649&q=80']
 //     },
 //     {
 //         id: "6ea13ddfff",
 //         color: ['white'],
 //         name: "White Print T-Shirt",
 //         price: 800,
 //         sale: 10,
 //         type: 'shoes',
 //         search_terms: 'trending',
 //         images: ['https://images.unsplash.com/photo-1554568218-0f1715e72254?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80']
 //     },
 //     {
 //         id: "6egf23ddfff",
 //         color: ['cream'],
 //         name: "Striped Shirt",
 //         price: 2300,
 //         sale: 2,
 //         search_terms: 'trending',
 //         images: ['https://images.unsplash.com/photo-1573766713733-18f875c7892d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80']
 //     },
 //     {
 //         id: "6eat2312fff",
 //         color: ['red'],
 //         name: "Red Dress",
 //         price: 2700,
 //         sale: 25,
 //         type: 'dress',
 //         search_terms: 'trending',
 //         images: ['https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80']
 //     },
 //     {
 //         id: "6eantddfff",
 //         color: ['cream'],
 //         name: "Neck Shirt",
 //         price: 2300,
 //         sale: 20,
 //         type: 'shoes',
 //         search_terms: 'trending',
 //         images: ['https://images.unsplash.com/photo-1573766713733-18f875c7892d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80']
 //     },
 //     {
 //         id: "6eat244ddfff",
 //         color: ['cream'],
 //         name: "Neck Shirt",
 //         price: 2300,
 //         sale: 20,
 //         type: 'dress',
 //         search_terms: 'trending',
 //         images: ['https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80']
 //     },
 //     {
 //         id: "6eat23eadff",
 //         color: ['cream'],
 //         name: "Neck Shirt",
 //         price: 2300,
 //         sale: 20,
 //         type: 'watch',
 //         search_terms: 'trending',
 //         images: ['https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80']
 //     },
 //     {
 //         id: "6eat23ddf12",
 //         color: ['cream'],
 //         name: "Neck Shirt",
 //         price: 2300,
 //         sale: 20,
 //         type: 'watch',
 //         images: ['https://images.unsplash.com/photo-1542574621-e088a4464f7e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=628&q=80']
 //     },
 // ]

// const Test = async () => {
//     let fetchTrendings = await fetch('http://localhost:3000/api/v1/products/get/trending?search=trending');
//     console.log("fsd")
// }
// Test()
// // (async () => {
// //     console.log("fdlk")
// let fetchTrendings = await fetch('http://localhost:3000/api/v1/products/get/trending?search=trending');
// console.log(fetchTrendings)
// // .then(response => response.json()).then(data => {
// //     Trendings = data.body;
// //     console.log(Trendings)
// // })

// // })()




// let TrendingRow = document.getElementById('trending-row');

// // SET TRENDING ITEM
// const setTrendingItems = (item) => {
//     let html = `
//     <div class="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mt-2">
//     <div class="card trending-item" style="width: 21rem;">
//         <img width="100" height="350" style="object-fit: cover;" src="${item.images[0]}" class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">${item.name}</h5>
//             <div class="col-6">${item.price}</div>
//             <a href="#" class="btn btn-danger mt-4">Add To Cart</a>
//         </div>
//     </div>
//     </div>    
//     `
//     TrendingRow.innerHTML += html
// }



// const allTrendings = () => {
//     for (let item of Trendings) {
//         if (item.search_terms === 'trending') {
//             setTrendingItems(item)
//         }

//     }
// };
// allTrendings()

// function trendingTypeFilter(type) {
//     console.log(type)
//     TrendingRow.innerHTML = ""
//     if (type === 'all') {
//         allTrendings()
//     }
//     let filtered = Trendings.filter(item => item.type === type && item.search_terms === 'trending')
//     console.log(filtered)
//     if (filtered) {
//         for (let item of filtered) {
//             setTrendingItems(item)
//         }
//     }
// }

