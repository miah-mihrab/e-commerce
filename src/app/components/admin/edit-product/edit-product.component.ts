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
      Validators.pattern("[a-zA-Z, ]*")
    ]));
  }
  productForm = new FormGroup({
    Name: this.validateField(5, 30),
    Type: this.validateField(4, 15),
    Company: this.validateField(5, 20),
    Port: this.validateField(5, 20),
    Color: this.validateField(3, 10),
    Waterproof: new FormControl("",
      [
        Validators.required,
        Validators.pattern(new RegExp("^([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])$"))
      ]),
    Price: new FormControl("", [
      Validators.required,
      Validators.pattern(new RegExp("^[0-9](\.[0-9]+)?$"))
    ]),
    Certification: this.validateField(3, 20),
    Style: this.validateField(3, 8),
    Stock: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]+")
    ])
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
  }

  upload(event) {
    this.file = event.target.files[0]
  }

  editProduct() {
    let keys = Object.keys(this.productForm.value);

    keys.forEach(key => {
      if (this.productForm.value[key] === '') {
        delete this.productForm.value[key]
      }
    })
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

