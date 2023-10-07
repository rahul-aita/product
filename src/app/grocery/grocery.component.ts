import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Grocery } from '../dto/type';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit   {
  @Input() public grocery: Grocery;
  @Output() onRemoveGrocery = new EventEmitter<number>();
  @Output() onEditGrocery = new EventEmitter<number>();

  constructor() {
    this.grocery = {
      item: '',
      amount: '',
      photo:''
    };
  }

  ngOnInit(): void {
    console.log(this.grocery);
  }

  deleteGrocery() {
    this.onRemoveGrocery.emit(this.grocery.id);
  }

  editGrocery(){
    this.onEditGrocery.emit(this.grocery.id);
  }
}
