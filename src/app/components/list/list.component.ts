import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/models/product.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  visibilityADI: boolean = false;

  list_name: string = '';

  list_price: string = '';

  add_or_edit: boolean = false;

  product_count: number = 1;

  listArr: Array<IProduct> = [];

  product_ID: any;

  all_count: number = 0;

  visible_alert_count: boolean = false;

  searching_name: string = '';

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required])
  });

  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  doVisibleADI(): void {
    this.visibilityADI = true;
  }

  close_alert(): void {
    this.visibilityADI = false;
    this.visible_alert_count = false;
    this.all_count = 0;
  }

  submit(): void {
  }

  plus_count(): void {
    this.product_count++;
  }

  minus_count(): void {
    if (this.product_count === 1) {
      this.product_count = 1;
    }
    else {
      this.product_count--;
    }
  }

  getProducts(): void {
    this.admin.getProducts().subscribe(
      data => {
        this.listArr = data;
        console.log(this.listArr);

      },
      err => console.log(err)
    );
  }

  add_product_or_edit(): void {
    let newProduct = new Product(this.list_name.toLocaleLowerCase(), Number(this.list_price), this.product_count);

    if (!this.add_or_edit) {
      this.admin.postProduct(newProduct).subscribe(
        () => {
          this.getProducts();
        },
        err => console.log(err)
      );
    }

    else {
      newProduct.id = this.product_ID;

      this.admin.putProduct(newProduct).subscribe(
        () => {this.getProducts();},
        err => {console.log(err)},
      );
      this.add_or_edit = false;
    }

    this.visibilityADI = false;
    this.resetInp();
  }

  editChanges(product: IProduct): void {
    
    this.product_ID = product.id;
    this.visibilityADI = true;
    this.add_or_edit = true;
    this.list_name = product.product_name;
    this.list_price = product.product_price.toString();
    this.product_count = product.product_count;
    console.log(this.list_name, this.list_price, this.product_count);
    
  }

  deleteProduct(product: IProduct): void {
    if(confirm('Are you sure?')){
      this.admin.deleteProduct(Number(product.id)).subscribe(
        () => {
          this.getProducts();
        },
        err => console.log(err)
      );
    }
  }

  doVisibleVAC(): void {
    this.visible_alert_count = true;
    this.listArr.forEach(e =>{
      this.all_count += e.product_price*e.product_count;
    })
  }

  private resetInp(): void {
    this.list_name = '';
    this.list_price = '';
    this.product_count = 1;
  }

}
