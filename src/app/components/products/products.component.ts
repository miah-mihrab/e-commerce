import { AngularFireAuth } from '@angular/fire/auth';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: any;
  productName;
  userRef: any;
  filterValue = [];
  reservedProducts: any;
  username;
  constructor(private aFAuth: AngularFireAuth, private productService: ProductService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isUser().subscribe(state => {
      if (state) {
        this.userRef = this.authService.getUserRef(state.email);
      }
    })

    //Get The User Collection For First Time
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
    if (!this.userRef) {
      alert("You are not logged in to use this service");
    }
    else {
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
