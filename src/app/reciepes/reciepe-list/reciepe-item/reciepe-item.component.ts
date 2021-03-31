import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reciepe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-reciepe-item',
  templateUrl: './reciepe-item.component.html',
  styleUrls: ['./reciepe-item.component.css']
})
export class ReciepeItemComponent implements OnInit {
  @Input() items: Reciepe;
  @Input() index: number;

  constructor(private recipeList: RecipesService) { }

  ngOnInit(): void {
  }


}
