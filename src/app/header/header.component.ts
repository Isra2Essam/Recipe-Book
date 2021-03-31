import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Reciepe } from '../reciepes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated=false;
  private userSub : Subscription;

  constructor(private dataStorageService:DataStorageService,private authService:AuthService) { }

  ngOnInit(){
    this.authService.user.subscribe(user =>{
      this.isAuthenticated = !user ? false : true;
    })
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes();
  }
  onLogout(){
    this.authService.logout();
  }


  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
