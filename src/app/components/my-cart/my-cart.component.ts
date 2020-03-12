import { AngularFireAuth } from '@angular/fire/auth';
import { MyCartService } from './../../services/my-cart.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})

export class MyCartComponent implements OnInit {
  itemKeys: string | any[];
  items: any;
  myProducts = [];
  totalItem = [];
  totalPrice = [];
  total = 0;
  userRef: any;
  cartEmpty: boolean = true;
  constructor(private db: AngularFirestore, private myCartService: MyCartService, private aFAuth: AngularFireAuth) { }

  ngOnInit(): void {

    this.aFAuth.authState.subscribe(state => {
      if (state) {
        this.userRef = this.myCartService.getUserRef(state.email);
        this.userRef.get().subscribe(e => {
          this.itemKeys = Object.keys(e.data()['itemInCart']);

          for (let i = 0; i < this.itemKeys.length; i++) {
            this.db.collection('products').doc(this.itemKeys[i]).get().subscribe(d => {
              this.myProducts[i] = d.data();
              this.totalItem[i] = e.data()['itemInCart'][this.itemKeys[i]];
              this.totalPrice[i] = e.data()['itemInCart'][this.itemKeys[i]] * d.data()['Price']; //Total price of a product based on number of amount
              this.total += this.totalPrice[i]; //Total Price of the products that has been selected

              this.cartEmpty = false;
            })
          }
        });
      }
    })


  }

  add(i: string | number, price: string, id: string | number) {
    this.totalItem[i] = parseFloat(this.totalItem[i]) + 1;
    this.total += parseFloat(price);
    this.totalPrice[i] += parseFloat(price);
    this.userRef.get().subscribe(e => {
      let obj = e.data()['itemInCart'];
      if (obj[id]) {
        obj[id] = obj[id] + 1
        this.userRef.update({ itemInCart: obj })
      }
    })

  }

  sub(i: string | number, price: string, id: string) {
    this.totalItem[i] = (parseFloat(this.totalItem[i]) - 1 >= 0) ? parseFloat(this.totalItem[i]) - 1 : 0; //Total amount of - a particular product
    this.total = (this.total - parseFloat(price) >= 0) ? this.total - parseFloat(price) : 0.00; //Total Price of the products that has been selected
    this.userRef.get().subscribe(e => {
      let obj = e.data()['itemInCart'];
      if (obj[id]) {
        obj[id] = (obj[id] - 1 >= 0) ? obj[id] - 1 : 0;
        if (obj[id] === 0) {
          delete obj[id];
          document.getElementById(id).style.display = "none";
        }
        this.userRef.update({ itemInCart: obj })
      }
    })

  }


  removeFromCart(id: string, index: string | number) {
    this.userRef.get().subscribe(e => {
      if (e.data()['itemInCart'][id]) {
        let obj = e.data()['itemInCart'];
        delete obj[id]; //Delete product from object array
        this.totalPrice[index] = 0;
        this.total = 0;
        console.log(this.totalPrice)
        this.totalPrice.forEach(e => {
          this.total += e;
        })
        this.userRef.update({ itemInCart: obj }) // & update the cart
        document.getElementById(id).style.display = "none";
      }
    })
  }
}
