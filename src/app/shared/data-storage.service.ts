import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Reciepe } from '../reciepes/recipe.model';
import { RecipesService } from '../reciepes/recipes.service';



@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeList: RecipesService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeList.getRecipe();
        this.http.put('https://ng-project-recipe-book-706f7-default-rtdb.firebaseio.com/reciepes.json', recipes)
            .subscribe(Response => {
                console.log(Response);
            })
    }

    fetchRecipes() {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.get<Reciepe[]>(
                    'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredient ? recipe.ingredient : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeList.setRecipes(recipes);
            })
        );

    }
}