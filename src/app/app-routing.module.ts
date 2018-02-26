import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/near-by', pathMatch: 'full' },

  { path: 'near-by', loadChildren: 'app/near-by/near-by.module#NearByModule' },

  /*MUST BE AT THE BOTTOM OF ARRAY*/
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
