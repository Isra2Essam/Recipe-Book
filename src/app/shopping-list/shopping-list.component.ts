import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers:[ShoppingListService]
})
export class ShoppingListComponent implements OnInit,OnDestroy{
  ingredients:ingredient[];
  subscription: Subscription;
  

  constructor(private shoppingList : ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingList.getIgredient();
    this.subscription = this.shoppingList.ingredientsChanged
    .subscribe(
      (ingredients: ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    
  }
  onEditting(index:number){
    this.shoppingList.startedEditting.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

