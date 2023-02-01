import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';
// set path for each component
const routes: Routes = [
  //login
  {
    path:"",component:LoginComponent   //path of login is kept empty because we want the site to redirect to login page when the server runs
  },
  //dashboard
  {
    path:"dashboard",component:DashboardComponent
  },
  //register
  {
    path:"register",component:RegisterComponent
  },
  //transaction
  {
    path:"transaction",component:TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
