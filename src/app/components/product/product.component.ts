import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  product: any;
  userRef: any;
  inCart: any = 1;
  id: any;

  constructor(private db: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.userRef = this.db.collection('users').doc('vZUKc5UyL93uhZ9tAmur');

    this.route.params.subscribe(param => {
      this.id = param.id;
      this.db.collection('products').doc(this.id).get().subscribe(e => {
        this.product = e.data();
        console.log(this.product)
      });
    })

  }


  add() {
    this.inCart += 1;
  }

  sub() {
    this.inCart -= 1;
  }

  addToCart() {
    if (this.inCart != 0) {
      this.userRef.get().subscribe(e => {
        if (e.data()['itemInCart'][this.id]) {
          let obj = e.data()['itemInCart'];
          obj[this.id] += parseFloat(this.inCart);
          this.userRef.update({ itemInCart: obj })
          this.inCart = 1;
        } else {
          this.userRef.set({
            itemInCart: {
              [this.id]: parseFloat(this.inCart)
            }
          }, { merge: true }).then(() => {
            this.inCart = 1
          })
        }
      })
    }
  }
}