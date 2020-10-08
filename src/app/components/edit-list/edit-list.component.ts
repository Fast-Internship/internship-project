import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  profileForm = new FormGroup ({
    Brend: new FormControl(''),
    Modeld: new FormControl(''),
    Class: new FormControl(''),
    Date: new FormControl(''),
    Transmission: new FormControl(''),
    Horsepower: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

}
