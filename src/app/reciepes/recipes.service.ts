import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core'
import { Reciepe } from './recipe.model';
import { ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs/internal/Subject';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeSelected = new EventEmitter<Reciepe>();
  recipesChanged=new Subject<Reciepe[]>();

  constructor(private shoppingList: ShoppingListService) {}

  private recipes:Reciepe[] = [
    new Reciepe('Burger', 'Test',
      'https://www.thebuffaloburger.com/images/storry.png',
      [new ingredient('Meat', 1),
      new ingredient('eggs', 2)]),
    new Reciepe('Nuggets', 'Nugget Test',
      'https://www.seriouseats.com/2020/05/20200504-vegetable-pancakes-sho-spaeth1.jpg',
      [new ingredient('Chicken', 1),
      new ingredient('Fries', 2)]),
    new Reciepe('Pizza', ' Test',
      'https://www.broadwaypizza.com/images/carousel/White%20Buffalo%20Chicken-sm.jpg',
      [new ingredient('Pepproni', 1),
      new ingredient('Fries', 2)])
  ]

  setRecipes(recipes:Reciepe[]){
    this.recipes=recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipe() {
    return this.recipes.slice();
  };
  showRecipeDetails(index: number) {
    return this.recipes[index];
  };
  addIngredientShoppingList(ingredients: ingredient[]) {
    this.shoppingList.addIngredients(ingredients);

  };
  addRecipe(recipe: Reciepe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  };
  updateRecipe(index: number, newRecipe: Reciepe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());

  }
}
