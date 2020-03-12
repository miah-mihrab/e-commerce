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


  getUserRef(userId) {
    return this.db.collection('users').doc(userId);
  }

}
