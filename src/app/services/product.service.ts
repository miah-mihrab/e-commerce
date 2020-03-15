import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})


export class ProductService {
  products;
  userRef: any;
  filterValue = [];
  watch;
  fashion;
  _filterByPrice = [];

  constructor(private db: AngularFirestore) { }

  getUserRef(userId) {
    return this.db.collection("users").doc(userId);
  }

  getProducts() {
    return this.db
      .collection("products")
      .snapshotChanges();
  }


  getProduct(id) {
    return this.db.collection('products').doc(id).valueChanges();
  }

  addProduct(productForm) {

    this.db.collection('products').add({
      Name: productForm.value.Name,
      Type: productForm.value.Type,
      Company: productForm.value.Company,
      Port: productForm.value.Port,
      Waterproof: productForm.value.Waterproof,
      Price: productForm.value.Price,
      Color: productForm.value.Color,
      Certification: productForm.value.Certification,
      Style: productForm.value.Style,
      imgUrl: productForm.value.imgUrl
    });
  }

  updateProduct(productForm, id) {
    this.db.collection('products').doc(id).set(productForm.value, { merge: true })
  }


  removeProduct(id) {
    this.db.collection('products').doc(id).delete();
  }


  filterByCategory(reservedProducts: any, event) {
    this.filterValue[event.target.name] = !this.filterValue[event.target.name];
    let keys = Object.keys(this.filterValue);
    let filteredArray = [];
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < Array.from(reservedProducts).length; j++) {

        if (
          (reservedProducts[j]["data"].Type).toString() === keys[i] &&
          this.filterValue[keys[i]] === true
        ) {
          filteredArray.push(reservedProducts[j]);
        }
      }
    }
    if (filteredArray.length > 0) {
      return filteredArray;
    }
    return reservedProducts;

  }


  filterByPrice(reservedProducts, event) {
    this._filterByPrice[event.target.name] = !this._filterByPrice[event.target.name];
    let keys = Object.keys(this._filterByPrice);
    let filteredArray = [];
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < Array.from(reservedProducts).length; j++) {
        if (this._filterByPrice[keys[i]] === true) {
          let numberRange = keys[i].split("-");
          if (reservedProducts[j]["data"].Price >= parseFloat(numberRange[0]) && parseFloat(numberRange[1]) >= reservedProducts[j]["data"].Price) {
            filteredArray.push(reservedProducts[j]);
          }
        }
      }
    }
    if (filteredArray.length > 0) {
      return filteredArray;
    }
    return reservedProducts;
  }



  filterByName(reservedProducts, productName) {
    let arr = []
    for (let i = 0; i < reservedProducts.length; i++) {
      arr[i] = reservedProducts[i]['data'].Name
    }
    let filteredArray = [];
    for (let i = 0; i < reservedProducts.length; i++) {
      if ((arr[i]).toLowerCase().includes(productName)) {
        filteredArray.push(reservedProducts[i])
      }
    }

    if (filteredArray.length > 0) {
      return filteredArray;
    }
    return reservedProducts;
  }
}
