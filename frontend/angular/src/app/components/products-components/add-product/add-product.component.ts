import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  title: String = 'Add new product';
  image: any;
  productName: String | undefined;
  productPrice: number | undefined;
  productStock: number | undefined;
  category = new FormControl('', Validators.required);
  categories: Category[] | undefined;
  product: Product | undefined;
  editMode: boolean = false;
  docId: String = '';

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    stock: ['', [Validators.required]],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
    const url = this.router.url;

    if (url.endsWith('edit')) {
      try {
        // console.log(window.history.state.product.category);
        this.editMode = true;
        this.title = 'Edit Category';
        this.category = new FormControl(
          window.history.state.product.category,
          Validators.required
        );
        this.docId = window.history.state.product._id;
        this.productName = window.history.state.product.name;
        this.productPrice = window.history.state.product.price;
        this.productStock = window.history.state.product.stock;
      } catch (error) {
        this.router.navigate(['/accounts']);
      }
    }
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = {
        preview: URL.createObjectURL(event.target.files[0]),
        data: event.target.files[0],
      };
      this.image = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    if (this.image) {
      formData.append('file', this.image.data);
      this.productsService.uploadImage(formData);
    }

    this.product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      stock: this.productForm.value.stock,
      category: this.category.value,
      image: this.image ? this.image.data.name : undefined,
    };
    if (this.editMode) {
      this.productsService
        .editProduct(this.product, this.docId)
        .subscribe((result) => {
          console.log(result);
        });
    } else {
      this.productsService.addProduct(this.product).subscribe((result) => {
        console.log(result);
      });
    }
    this.location.back();
  }
}
