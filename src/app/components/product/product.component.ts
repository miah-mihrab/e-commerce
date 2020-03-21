import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';

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
  state;
  constructor(private db: AngularFirestore,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private aFAuth: AngularFireAuth) { }

  ngOnInit(): void {

    this.aFAuth.authState.subscribe(state => {
      if (state) {
        this.userRef = this.authService.getUserRef(state.email);
        this.state = state;
      }
    })

    this.route.params.subscribe(param => {
      this.id = param.id;
      this.db.collection('products').doc(this.id).get().subscribe(e => {
        this.product = e.data();
      });
    })

  }

  checkStock() {
    if (this.inCart > this.product.Stock) {
      this.inCart = this.product.Stock
    }
    if (this.inCart < 1) {
      this.inCart = 1
    }
  }
  add() {
    this.inCart += 1;
    if (this.inCart > this.product.Stock) {
      this.inCart = this.product.Stock
    }
  }

  sub() {
    this.inCart -= 1;
    if (this.inCart < 1) {
      this.inCart = 1;
    }
  }

  addToCart() {
    this.authService.isUser().subscribe(state => {
      if (state) {
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
      } else {
        alert('You are not logged in to use this service')
      }
    })
  }
}
