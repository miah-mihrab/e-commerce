import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from './../../services/product.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartItem;
  userRef: any;
  username: any;
  user: boolean = false;
  userId;
  constructor(private aFAuth: AngularFireAuth, private productService: ProductService, private db: AngularFirestore) { }

  ngOnInit() {
    this.aFAuth.authState.subscribe(state => {
      console.log(state ? state.email : "Not signed in");
      if (state) {
        this.userRef = this.productService.getUserRef(state.email);
        this.userRef.get().subscribe(e => {
          this.userId = state.email;
          this.username = e.data().username;
          this.db.collection('users').doc(this.userId).valueChanges().subscribe(e => {
            console.log(e);
            if (e['itemInCart']) {
              this.cartItem = Object.keys(e['itemInCart']).length;
            }
            else {
              this.cartItem = 0;
            }
          })
        })
        this.user = true;
      }
    })


  }

  logout() {
    this.aFAuth.auth.signOut().then(() => {
      this.user = false;
      console.log(this.user)
    });
  }
}
