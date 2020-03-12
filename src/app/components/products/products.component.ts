import { ProductService } from './../../services/product.service';
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products;
  productName;
  userRef: any;
  filterValue = [];
  reservedProducts: any;
  constructor(private db: AngularFirestore, private productService: ProductService) { }

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
    this.userRef = this.productService.getUserRef();

    this.productService.getProducts()
      .subscribe(e => {
        this.products = e.map(data => {
          return {
            data: data.payload.doc.data(),
            id: data.payload.doc.id
          };
        });
        this.reservedProducts = this.products;
      });
  }

  addItem(product_id) {

    //Add items to an individual's database
    this.userRef.get().subscribe(e => {
      //Find item on user cart or set 0
      let isItem = 0;
      if (e.data()["itemInCart"]) {
        isItem = e.data()["itemInCart"][product_id] || 0;
        this.userRef.set(
          {
            itemInCart: {
              [product_id]: isItem + 1
            }
          },
          { merge: true }
        );
      }
      if (!e.data()["itemInCart"]) {
        this.userRef.set(
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
    this.products = this.productService.filterByCategory(this.reservedProducts, event)
  }

  filterByPrice(event) {
    this.products = this.productService.filterByPrice(this.reservedProducts, event)
  }

  filterByName() {
    this.products = this.productService.filterByName(this.reservedProducts, this.productName);
  }
}
