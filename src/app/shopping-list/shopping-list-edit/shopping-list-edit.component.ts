
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";


@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.css']
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {
    // newName: string;
    // newAmount: number;
    // @ViewChild('nameInput') nameInput: ElementRef;
    // @ViewChild('amountInput') amountInput: ElementRef;
    @ViewChild('f') slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editItemIndex: number;
    editedItem:ingredient;

    constructor(private shoppingList: ShoppingListService) { }
    ngOnInit() {
        this.subscription = this.shoppingList.startedEditting
            .subscribe((index: number) => {
                this.editItemIndex = index;
                this.editMode = true;
                this.editedItem=this.shoppingList.getIngredient(index);
                this.slForm.setValue({
                    name:this.editedItem.name,
                    amount:this.editedItem.amount
                })
            })
    }

    onAddItem(form: NgForm) {
        const value = form.value;
        const newIngredient = new ingredient(value.name, value.amount);
        if(this.editMode){
            this.shoppingList.updateIngredient(this.editItemIndex,newIngredient);
        }else{
            this.shoppingList.addIngredient(newIngredient);
            console.log('tessst');
        }
        this.editMode=false;
        form.reset();
      
    }
    onClear(){
        this.slForm.reset();
        this.editMode=false;

    }
    onDelete(){
        this.shoppingList.deleteIngredient(this.editItemIndex);
        this.onClear();

    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}