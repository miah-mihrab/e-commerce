import { NavbarComponent } from './components/navbar/navbar.component';
import { CartControllerComponent } from './components/cart-controller/cart-controller.component';
import { ProductComponent } from './components/product/product.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { AppComponent } from './app.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    NavbarComponent,
    CartControllerComponent,
    MyCartComponent,
    AuthenticationComponent,
    AdminPanelComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'edit/product/:id', component: EditProductComponent },
      { path: 'my-cart', component: MyCartComponent },
      { path: 'authenticate', component: AuthenticationComponent },
      { path: 'admin-panel', component: AdminPanelComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
