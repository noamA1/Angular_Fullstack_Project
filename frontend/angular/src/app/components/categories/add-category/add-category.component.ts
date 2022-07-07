import { Category } from './../../../shared/models/category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  image: any;
  categoryName: String | undefined;
  categoryImage: File | undefined;
  title: String = 'Add new category';
  category: Category | undefined;
  editMode = false;
  docId: String = '';

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const url = this.router.url;

    if (url.endsWith('edit')) {
      const imageName = window.history.state.category.categoryImage;
      try {
        this.editMode = true;
        this.title = 'Edit Category';
        this.categoryName = window.history.state.category.name;
        this.docId = window.history.state.category._id;
      } catch (error) {
        this.router.navigate(['/accounts']);
      }
    }
  }

  categoryForm = this.fb.group({
    name: ['', [Validators.required]],
  });
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = {
        preview: URL.createObjectURL(event.target.files[0]),
        data: event.target.files[0],
      };
      this.image = file;
      console.log(this.image.data.name);
    }
  }

  onSubmit() {
    const formData = new FormData();
    if (this.image) {
      formData.append('file', this.image.data);
      this.categoriesService.uploadImage(formData);
    }
    this.category = {
      name: this.categoryForm.value.name,
      image: this.image ? this.image.data.name : undefined,
    };
    if (this.editMode) {
      this.categoriesService
        .editCategory(this.category, this.docId)
        .subscribe((result) => {
          console.log(result);
        });
    } else {
      this.categoriesService.addCategory(this.category).subscribe((result) => {
        console.log(result);
      });
    }
    this.router.navigate(['/categories']);
  }
}
