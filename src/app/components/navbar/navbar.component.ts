import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  admin: boolean = false;
  constructor(private productService: ProductService, private db: AngularFirestore, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isUser().subscribe(state => {
      if (state) {
        this.userRef = this.productService.getUserRef(state.email);
        this.userRef.get().subscribe(e => {
          this.userId = state.email;
          this.username = e.data().username;
          this.admin = (e.data().admin === true) ? true : false;
          this.db.collection('users').doc(this.userId).valueChanges().subscribe(e => {
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
    this.authService.logOutUser();
    this.user = false;
    this.admin = false;
  }
}
