import { CarService } from 'src/app/core/services/car-service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title = " default title"
  @Input() id;
  @Output() close = new EventEmitter<void>()
  @Output() onDelete = new EventEmitter<void>()
  
  constructor(private carService: CarService) { }

  ngOnInit(): void {}
}
