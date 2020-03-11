import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

interface productTypes {
  fashion: boolean;
  watch: boolean;
}

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products;
  userDB: any;
  filterValue = [];
  watch;
  fashion;
  reservedProducts: any;
  _filterByPrice = [];
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    // this.db.collection('products').add({
    //   CaseShape: "Full",
    //   Certification: "RoHS, CE, ISO, CCC, SGS",
    //   ClaspType: "",
    //   Company: "Shenzhen Zhongshi Dress Co., Ltd.",
    //   Color: "Red Color",
    //   Name: "Plus Size Vintage Fit and Flare Dress",
    //   PaymentTerms: "L/C, T/T, D/P, Western Union, Paypal",
    //   Port: "Shenzhen, China ",
    //   Price: "88.59",
    //   Style: "Modern",
    //   Type: "dress",
    //   Waterproof: "Not Waterproof",
    //   img1: "https://image.made-in-china.com/201f0j00cQgRsTZ",
    //   imgUrl: "https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2019/07/16/goods-img/1566777264519163658.jpg"
    // })

    //Get The User Collection For First Time
    this.userDB = this.db.collection("users").doc("vZUKc5UyL93uhZ9tAmur");

    this.db
      .collection("products")
      .snapshotChanges()
      .subscribe(e => {
        this.products = e.map(data => {
          return {
            data: data.payload.doc.data(),
            id: data.payload.doc.id
          };
        });
        // console.log(this.products)
        this.reservedProducts = this.products;
      });
  }

  addItem(product_id) {
    //Add items to an individual's database
    this.userDB.get().subscribe(e => {
      //Find does item exist on user cart or set 0
      let isItem = 0;
      if (e.data()["itemInCart"]) {
        isItem = e.data()["itemInCart"][product_id] || 0;
        this.userDB.set(
          {
            itemInCart: {
              [product_id]: isItem + 1
            }
          },
          { merge: true }
        );
      }
      if (!e.data()["itemInCart"]) {
        this.userDB.set(
          {
            itemInCart: {
              [product_id]: isItem + 1
            }
          },
          { merge: true }
        );
      }
    });
  }
  filterByCategory(event) {
    this.filterValue[event.target.name] = !this.filterValue[event.target.name];

    let keys = Object.keys(this.filterValue);
    let filteredArray = [];
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < Array.from(this.reservedProducts).length; j++) {
        console.log(
          this.reservedProducts[j]["data"].Type,
          keys[i],
          this.filterValue[keys[i]]
        );
        if (
          this.reservedProducts[j]["data"].Type === keys[i] &&
          this.filterValue[keys[i]] === true
        ) {
          filteredArray.push(this.reservedProducts[j]);
        }
      }
    }
    if (filteredArray.length > 0) {
      this.products = filteredArray;
    } else {
      this.products = this.reservedProducts;
    }
  }

  filterByPrice(event) {
    this._filterByPrice[event.target.name] = !this._filterByPrice[
      event.target.name
    ];
    // console.log(this._filterByPrice)
    let keys = Object.keys(this._filterByPrice);
    let filteredArray = [];
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < Array.from(this.reservedProducts).length; j++) {
        // console.log(keys[i])
        if (this._filterByPrice[keys[i]] === true) {
          let numberRange = event.target.name.split("-");
          console.log(parseInt(numberRange[0]) >= 8)
          if (this.reservedProducts[j]["data"].Price >= parseInt(numberRange[0]) && parseInt(numberRange[1]) >= this.reservedProducts[j]["data"].Price) {
            console.log("HERE");
            filteredArray.push(this.reservedProducts[j]);
          }
        }
      }
    }
    if (filteredArray.length > 0) {
      this.products = filteredArray;
      filteredArray = [];
    } else {
      this.products = this.reservedProducts;
    }
  }
}
