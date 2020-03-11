import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartItem;
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    //  Update Cart
    this.db.collection('users').doc('vZUKc5UyL93uhZ9tAmur').valueChanges().subscribe(e => {
      if (e['itemInCart']) { this.cartItem = Object.keys(e['itemInCart']).length } else { this.cartItem = 0 }
    })
  }

}
