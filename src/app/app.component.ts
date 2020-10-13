import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { TranslationService } from './core/services/translation.service';
// import { TranslateService } from './core/services/translate.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-work';
  userLoggedIn: boolean;
  carlist: string = "carlist";
  languageDropdown: boolean = false;

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.languageDropdown = false;
  }

  constructor(private authService: AuthService, private translationService:TranslationService){}

  ngOnInit(){
    this.authService.userLoggedIn.subscribe((bool)=>{
      this.userLoggedIn = bool;
    })
  }

  changeLanguage(language){
    this.translationService.changeLanguage(language)
  }

  showLanguages(e){
    if(this.languageDropdown === true){
      this.languageDropdown = false;
    } else{
      this.languageDropdown = true;
      e.stopPropagation()
    }
  }

}