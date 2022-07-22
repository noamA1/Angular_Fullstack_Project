import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  allCategories: Category[] | undefined;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((resultArray) => {
      this.allCategories = resultArray;
    });
  }

  editCategory(categoryToEdit: Category) {
    this.router.navigateByUrl('categories/edit', {
      state: { category: categoryToEdit },
    });
  }

  delCategory(doc: any) {
    this.categoriesService.deleteCategory(doc._id).subscribe((result) => {
      console.log(result);
    });
  }
}
