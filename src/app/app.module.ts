import { NavbarComponent } from './components/navbar/navbar.component';
import { CartControllerComponent } from './components/cart-controller/cart-controller.component';
import { ProductComponent } from './components/product/product.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    NavbarComponent,
    CartControllerComponent,
    MyCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'my-cart', component: MyCartComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
