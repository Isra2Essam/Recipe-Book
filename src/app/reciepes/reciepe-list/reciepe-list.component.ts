import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Reciepe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-reciepe-list',
  templateUrl: './reciepe-list.component.html',
  styleUrls: ['./reciepe-list.component.css']
})
export class ReciepeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Reciepe>();
  recipes: Reciepe[];
  subscription: Subscription;


  constructor(private recipeList: RecipesService,
    private router:Router, private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.recipeList.recipesChanged
      .subscribe(
        (recipes: Reciepe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeList.getRecipe();

  }

  onAddingRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
