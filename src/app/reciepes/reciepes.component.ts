import { Component, OnInit } from '@angular/core';
import { Reciepe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-reciepes',
  templateUrl: './reciepes.component.html',
  styleUrls: ['./reciepes.component.css'],
  providers:[RecipesService]
})
export class ReciepesComponent implements OnInit {
  itemSelected:Reciepe;

  constructor(private recipeList:RecipesService) { }

  ngOnInit(): void {
    this.recipeList.recipeSelected.subscribe((recipe:Reciepe)=>{this.itemSelected=recipe;})
  }

}
