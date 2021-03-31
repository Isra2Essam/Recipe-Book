import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  startedEditting = new Subject<number>();
  ingredientsChanged = new Subject<ingredient[]>();
  private ingredients: ingredient[] = [
    new ingredient('Apples', 5),
    new ingredient('Tomatoes', 10),
  ];
  getIgredient() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());

  }
  addIngredients(ingredients: ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index:number,newIngredient:ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());


  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

}
