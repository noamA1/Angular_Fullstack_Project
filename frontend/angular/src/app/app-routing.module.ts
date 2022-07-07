import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';

const routes: Routes = [
  {
    path: 'categories',
    children: [
      {
        path: '',
        component: CategoriesComponent,
      },
      { path: 'add', component: AddCategoryComponent },
      { path: 'edit', component: AddCategoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
