import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-work';
  userLoggedIn: boolean;
  carlist: string = 'carlist';
  languageDropdown: boolean = false;

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.languageDropdown = false;
  }

  constructor(
    private authService: AuthService,
    private translationService: TranslationService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user')) {
      return (this.userLoggedIn = true);
    }
    this.authService.userLoggedIn.subscribe(
      (bool) => (this.userLoggedIn = bool)
    );
  }

  onLogOut(){
    this.userLoggedIn = false;
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  }

  changeLanguage(language){
    this.translationService.changeLanguage(language)
  }

  showLanguages(e){
    if(this.languageDropdown === true){
      this.languageDropdown = false;
    } else {
      this.languageDropdown = true;
      e.stopPropagation()
    }
  }
}
