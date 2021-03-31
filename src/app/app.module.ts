import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { RecipesModule } from './reciepes/recipes.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipesService } from './reciepes/recipes.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipeEditComponent } from './reciepes/recipe-edit/recipe-edit.component';
import { ReciepeItemComponent } from './reciepes/reciepe-list/reciepe-item/reciepe-item.component';
import { ReciepeDetailComponent } from './reciepes/reciepe-detail/reciepe-detail.component';
import { ReciepeListComponent } from './reciepes/reciepe-list/reciepe-list.component';
import { ReciepesComponent } from './reciepes/reciepes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    ReciepesComponent,
    ReciepeListComponent,
    ReciepeDetailComponent,
    ReciepeItemComponent,
    RecipeEditComponent,
    ShoppingListComponent,
     ShoppingListEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule
  ],
  providers: [ShoppingListService,RecipesService,DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
