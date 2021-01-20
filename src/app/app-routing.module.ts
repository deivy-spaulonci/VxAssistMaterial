import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormDespesaComponent } from './page/despesa/form-despesa/form-despesa.component';
import { ListDespesaComponent } from './page/despesa/list-despesa/list-despesa.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'form-despesa', component: FormDespesaComponent },
  { path: 'list-despesa', component: ListDespesaComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
