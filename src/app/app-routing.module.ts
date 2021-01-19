import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormDespesaComponent } from './page/despesa/form-despesa/form-despesa.component';

const routes: Routes = [
  { path: 'form-despesa', component: FormDespesaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
