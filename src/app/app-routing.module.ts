import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './users/components/register-form/register-form.component';
import { LoginFormComponent } from './users/components/login-form/login-form.component';
import { SuppliersTableComponent } from './suppliers/components/suppliers-table/suppliers-table.component';
import { SupplierFormComponent } from './suppliers/components/supplier-form/supplier-form.component';

const routes: Routes = [
  {path:"register", component: RegisterFormComponent},
  {path:"login", component: LoginFormComponent},
  {path:"suppliers", component: SuppliersTableComponent},
  {path:"suppliers/:id/edit", component: SupplierFormComponent},
  {path:"suppliers/new", component: SupplierFormComponent},
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "**", redirectTo: "login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
