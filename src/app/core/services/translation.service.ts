import { Injectable } from '@angular/core'
import * as english from '../../../assets/languages/english.json'
import * as russian from '../../../assets/languages/russian.json'
import * as armenian from '../../../assets/languages/armenian.json'

@Injectable({
    providedIn:"root"
})

export class TranslationService{
  language: string = JSON.parse(localStorage.getItem('language')) || 'eng';

  private dictionary = {
    eng: english.default,
    rus: russian.default ,
    arm: armenian.default   
  }

  constructor() {  }

  translate(translation_Subject: string): string { // translation_Subject = string that gets translated
      return this.dictionary[this.language].values[translation_Subject]
  }

  changeLanguage(language){
    this.language = language;
    localStorage.setItem("language", JSON.stringify(this.language));
  }  
}