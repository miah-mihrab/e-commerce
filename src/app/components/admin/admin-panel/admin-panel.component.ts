import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireStorageReference } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators'
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  allProducts: any;
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
      Validators.pattern(new RegExp("^[0-9]+(\.[0-9]+)?$"))
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
  constructor(private productService: ProductService, private aFStorage: AngularFireStorage) { }

  ngOnInit(): void {
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

  addProduct() {
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
              this.productForm.value.PaymentTerms = "L/C, T/T, D/P, Western Union, Paypal"
              this.productService.addProduct(this.productForm);
              this.uploading = false;
            })
        })
      ).subscribe();
  }


  removeProduct(imgUrl, id) {
    console.log(imgUrl)
    this.productService.removeProduct(imgUrl, id);
    alert('Product Deleted')
  }
}
