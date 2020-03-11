import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cart-controller',
  templateUrl: './cart-controller.component.html',
  styleUrls: ['./cart-controller.component.css']
})
export class CartControllerComponent implements OnInit {

  @Input() itemInCart = 0;
  @Output() click = new EventEmitter();


  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  addData() {
    this.db.collection('users').doc('vZUKc5UyL93uhZ9tAmur').get().subscribe(e => {
      console.log(e.data()['itemInCart'])
      this.db.collection('users').doc('vZUKc5UyL93uhZ9tAmur').set({
        itemInCart: e.data()['itemInCart'] + 1
      }, { merge: true })

    })

  }
  subData() {
    this.db.collection('users').doc('vZUKc5UyL93uhZ9tAmur').get().subscribe(e => {
      this.db.collection('users').doc('vZUKc5UyL93uhZ9tAmur').set({
        itemInCart: e.data()['itemInCart'] - 1
      }, { merge: true })

    })
  }
}
