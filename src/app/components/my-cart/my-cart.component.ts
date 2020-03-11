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
  myProducts = [{}];
  totalItem = [];
  totalPrice = [];
  total = 0;
  userRef: any;
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('users').doc('vZUKc5UyL93uhZ9tAmur').get().subscribe(e => {

      this.userRef = this.db.collection('users').doc('vZUKc5UyL93uhZ9tAmur');
      this.itemKeys = Object.keys(e.data()['itemInCart']);

      for (let i = 0; i < this.itemKeys.length; i++) {
        this.db.collection('products').doc(this.itemKeys[i]).get().subscribe(d => {
          this.myProducts[i] = d.data();
          this.totalItem[i] = e.data()['itemInCart'][this.itemKeys[i]];
          this.totalPrice[i] = e.data()['itemInCart'][this.itemKeys[i]] * d.data()['Price'];
          this.total += this.totalPrice[i];
        })
      }
    });

  }

  add(i, price, id) {
    this.totalItem[i] = parseInt(this.totalItem[i]) + 1;
    this.total += parseInt(price);
    this.userRef.get().subscribe(e => {
      if (e.data()['itemInCart'][id]) {
        let obj = e.data()['itemInCart'];
        obj[id] = obj[id] + 1
        this.userRef.update({ itemInCart: obj })
        // document.getElementById(id).style.display = "none";
      }
    })


  }
  sub(i, price, id) {
    this.totalItem[i] = parseInt(this.totalItem[i]) - 1;
    this.total -= parseInt(price);
    this.userRef.get().subscribe(e => {
      if (e.data()['itemInCart'][id]) {
        let obj = e.data()['itemInCart'];
        obj[id] = obj[id] - 1
        this.userRef.update({ itemInCart: obj })
        // document.getElementById(id).style.display = "none";
      }
    })
  }


  removeFromCart(id, index) {
    // document.querySelector('table').getElementByid
    this.userRef.get().subscribe(e => {
      if (e.data()['itemInCart'][id]) {
        let obj = e.data()['itemInCart'];
        delete obj[id];
        this.totalPrice[index] = 0;
        this.total = 0;
        this.totalPrice.forEach(e => {
          this.total += e;
        })
        this.userRef.update({ itemInCart: obj })
        document.getElementById(id).style.display = "none";
      }
    })
  }
}
