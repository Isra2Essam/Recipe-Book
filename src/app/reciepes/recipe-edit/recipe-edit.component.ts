import { NullTemplateVisitor, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ingredient } from 'src/app/shared/ingredient.model';
import { Reciepe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  allowEdit = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
             private router:Router,
             private recipeList: RecipesService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.allowEdit = params['id'] != null;
          this.initForm();
        }
      );
  }
  onSubmit() {
    if (this.allowEdit) {
      this.recipeList.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeList.addRecipe(this.recipeForm.value);
    }
    this.onSaveorCancel();
  }

  getControls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredient')).controls;
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onSaveorCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  };
  onDelete(index:number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }
  
  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImage = '';
    let recipeIngredients = new FormArray([]);

    if (this.allowEdit) {
      const recipe = this.recipeList.showRecipeDetails(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImage = recipe.imageUrl;

      if (recipe['ingredient']) {
        for (let ingredients of recipe.ingredient) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredients.name, Validators.required),
              'amount': new FormControl(ingredients.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImage, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredient': recipeIngredients
    })
  }

}
