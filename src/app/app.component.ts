import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Grocery } from './dto/type';
import { GroceryService } from './services/grocery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addGroceryButton') addGroceryButton: any;
  Grocery = 'Grocery';

  groceryForm: FormGroup ;

  grocery: Grocery[] ;
  groceryToDisplay: Grocery[];

  // educationOptions = [
  //   '10th pass',
  //   'diploma',
  //   'graduate',
  //   'post graduate',
  //   'PhD',
  // ];

  constructor(
    private fb: FormBuilder,
    private employeeService: GroceryService
  ) {
    this.groceryForm = fb.group({});
    this.grocery = [];
    this.groceryToDisplay = this.grocery;
  }

  ngOnInit(): void {
    // Initialize the groceryForm FormGroup with form controls
    this.groceryForm = this.fb.group({
      item: this.fb.control(''),
      amount: this.fb.control(''),
      photo: this.fb.control('')
    });

    this.employeeService.getGrocery().subscribe((res) => {
      for (let emp of res) {
        this.grocery.unshift(emp);
      }
      this.groceryToDisplay = this.grocery;
    });
  }

  ngAfterViewInit(): void {
  }

  addGrocery() {
    let grocery: Grocery = {
      item: this.Item.value,
      amount: this.Amount.value,
      photo: this.Photo.value,
    };
    this.employeeService.postGrocery(grocery).subscribe((res) => {
      this.grocery.unshift(res);
      this.clearForm();
    });
  }

  removeGrocery(event: any) {
    this.grocery.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.employeeService.deleteGrocery(event).subscribe((res) => {
          this.grocery.splice(index, 1);
        });
      }
    });
  }

  editGrocery(event: any) {
    this.grocery.forEach((val, ind) => {
      if (val.id === event) {
        this.setForm(val);
      }
    });
         this.removeGrocery(event);
    this.addGroceryButton?.nativeElement.click();
  }

  setForm(emp: Grocery) {
    this.Item.setValue(emp.item);
    this.Amount.setValue(emp.amount);
    this.Photo.setValue(emp.photo);
  
  }

  searchGrocery(event: any) {
    let filteredGrocery: Grocery[] = [];
    if (event === '') {
      this.groceryToDisplay = this.grocery;
    } else {
      filteredGrocery = this.grocery.filter((val, index) => {
        let targetKey = val.item;
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.groceryToDisplay = filteredGrocery;
    }
  }

  clearForm() {
    this.Item.setValue('');
    this.Amount.setValue('');
  
  }

  public get Item(): FormControl {
    return this.groceryForm.get('item') as FormControl;
  }
  public get Amount(): FormControl {
    return this.groceryForm.get('amount') as FormControl;
  }
  public get Photo(): FormControl {
    return this.groceryForm.get('photo') as FormControl;
  }
  
}
