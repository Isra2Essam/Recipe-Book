import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReciepesComponent } from './reciepes/reciepes.component';
import { ReciepeDetailComponent } from './reciepes/reciepe-detail/reciepe-detail.component';
import { ReciepeListComponent } from './reciepes/reciepe-list/reciepe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeEditComponent } from './reciepes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component'
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes = [
    { path: '', redirectTo: '/reciepes', pathMatch: 'full' },
    {
        path: 'reciepes',
        component: ReciepesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'new', component: RecipeEditComponent },
          {
            path: ':id',
            component: ReciepeDetailComponent,
          },
          {
            path: ':id/edit',
            component: RecipeEditComponent,
          }
        ]
      },
   
    { path: 'shopping-list', component: ShoppingListComponent },
     

    { path: 'auth', component: AuthComponent }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
