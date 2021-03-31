import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Reciepe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-reciepe-detail',
  templateUrl: './reciepe-detail.component.html',
  styleUrls: ['./reciepe-detail.component.css']
})
export class ReciepeDetailComponent implements OnInit {
  recipe: Reciepe;
  id: number;
  
  constructor(private recipeList: RecipesService, private route: ActivatedRoute,private router:Router) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeList.showRecipeDetails(this.id);
    })
  }
  onAddToShoppingList() {
    this.recipeList.addIngredientShoppingList(this.recipe.ingredient);
  }
  onEditing(){
    this.router.navigate(['edit'],{relativeTo:this.route})

  }
  
  onDelete(){
    this.recipeList.deleteRecipe(this.id);
    this.router.navigate(['/reciepes'], {relativeTo: this.route});

  }

}
