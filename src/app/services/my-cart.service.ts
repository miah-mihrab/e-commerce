import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {
  itemKeys: string | any[];
  items: any;
  myProducts = [{}];
  totalItem = [];
  totalPrice = [];
  total = 0;
  userRef: any;
  constructor(private db: AngularFirestore) { }


  getUserRef() {
    return this.db.collection('users').doc('vZUKc5UyL93uhZ9tAmur');
  }

}
