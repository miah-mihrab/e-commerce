import { Component, OnInit } from '@angular/core';
import { map, finalize } from 'rxjs/operators'
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  allProducts: any;
  product: unknown;
  id: any;
  validateField(min, max) {
    return (new FormControl('', [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern("[a-zA-Z ]*")
    ]));
  }
  //this.validateField(5, 10),
  productForm = new FormGroup({
    Name: new FormControl(""),
    Type: new FormControl(""),
    Company: new FormControl(""),
    Port: new FormControl(""),
    Color: new FormControl(""),
    Waterproof: new FormControl(""),
    Price: new FormControl(""),
    Certification: new FormControl(""),
    Style: new FormControl("")
  });

  uploading: boolean = false
  uploadPercentage: String
  file;
  fileRef: AngularFireStorageReference;
  downloadUrl: Observable<String>;
  p: number = 1
  constructor(private productService: ProductService, private aFStorage: AngularFireStorage, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.productService.getProduct(param.id).subscribe(product => {
        this.product = product;
      })
    })
    this.productService.getProducts().subscribe(product => {
      this.allProducts = product.map(e => {
        return ({
          id: e.payload.doc.id,
          data: e.payload.doc.data()
        })
      })
    })
  }

  upload(event) {
    this.file = event.target.files[0]
  }

  editProduct() {
    console.log(typeof (this.productForm.value))
    let keys = Object.keys(this.productForm.value);

    keys.forEach(key => {
      if (this.productForm.value[key] === '') {
        delete this.productForm.value[key]
      }
    })
    console.log(this.productForm.value);
    if (this.file) {
      const filepath = `/files/${Date.now()}_${this.file.name}`
      this.fileRef = this.aFStorage.ref(filepath);
      const task = this.fileRef.put(this.file);

      task.percentageChanges()
        .pipe(
          map(e => {
            this.uploading = true;
            this.uploadPercentage = e.toString() + "%";
          }),
          finalize(() => {
            this.aFStorage.ref(filepath)
              .getDownloadURL()
              .subscribe(url => {
                this.productForm.value.imgUrl = url;
                this.productService.updateProduct(this.productForm, this.id);
                this.uploading = false;
              })
          })
        ).subscribe();
    } else {
      this.productService.updateProduct(this.productForm, this.id);
    }
  }

}

