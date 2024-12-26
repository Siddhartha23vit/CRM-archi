import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css']
})
export class AdminInventoryComponent implements OnInit {

  newInventory={
    inventoryType:'',
    unitType:'',
    status:false
  };

  Inventory:any[]=[];
  filteredInventory: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedInventory: any;


  constructor (private http:HttpClient) { }

  ngOnInit() {
    this.getinventory()
  }

  getinventory(){
    this.http.get<any>('http://127.0.0.1:5001/api/masters/inventoryType/get')
    .subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.Inventory = response.data;
          this.filteredInventory = response.data;

        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching designations:', error);
      }
    );
  }
  checkIfInventoryExists(inventoryType: string, unitType: string): boolean {
    for (const checkIn of this.Inventory) {
      if (checkIn.inventoryType.toLowerCase() === inventoryType && 
      checkIn.unitType.toLowerCase() === unitType &&
          (!this.isUpdating || checkIn._id !== this.selectedInventory._id)) {
        return true;
      }
    }
    return false;
  }
  
  submitInventory() {
    if (!this.newInventory.inventoryType || !this.newInventory.unitType) {
      return; 
    }
    const exists = this.checkIfInventoryExists(this.newInventory.inventoryType.toLowerCase(), this.newInventory.unitType.toLowerCase());
    if (exists) {
      alert('Record Already Exist.');
      return; 
    }
  this.http.post<any>('http://127.0.0.1:5001/api/masters/inventoryType/create', this.newInventory)
    .subscribe(
      response => {
        console.log('Inventory Details added successfully:', response);
        alert('Inventory Details Added Successfully');
        this.Inventory.push(response.data);
        this.clearForm();
        this.getinventory();
      },
      error => {
        console.error('Error adding Inventory Details:', error);
        alert('Error Adding Inventory Details');
      }
    );
  }
    
//updateing data
updateInventory() {
  if (!this.selectedInventory || !this.newInventory.inventoryType || !this.newInventory.unitType) {
    return;
  }
  const exists = this.checkIfInventoryExists(this.newInventory.inventoryType.toLowerCase(), this.newInventory.unitType.toLowerCase());
  if (exists) {
    alert('Record Already Exist.');
    return; 
  }
  const updatedData = {
    id: this.selectedInventory._id,
    ...this.newInventory
  };
  this.http.put<any>(`http://127.0.0.1:5001/api/masters/inventoryType/update`, updatedData)
    .subscribe(
      response => {
        console.log('Inventory updated successfully:', response);
        alert('Inventory Details Updated Successfully');
        const index = this.Inventory.findIndex(item => item._id === this.selectedInventory._id);
        if (index !== -1) {
          this.Inventory[index] = response.data;
          this.clearForm();
          this.getinventory();
        }
      },
      error => {
        console.error('Error updating Inventory:', error);
      }
    );
}

//deleting data
  deleteinventory(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this Inventory Type Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/inventoryType/delete`, { id: id })
        .subscribe(
          response => {
            console.log('Inventory Type Details deleted successfully:', response);
            this.Inventory = this.Inventory.filter(item => item._id !== id);
            alert('Inventory Type Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Inventory Type Details:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Inventory Type Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }
  //refilling input with value to update
  populateFormFields(id: string) {
    const Inventory = this.Inventory.find(item => item._id === id);
    if (Inventory) {
      this.selectedInventory = Inventory;
      this.newInventory = { 
        inventoryType: Inventory.inventoryType,
        unitType: Inventory.unitType,
        status: Inventory.status
      };
      this.isUpdating = true;
      const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
      if (submitButton) {
        submitButton.innerText = 'Update';
      }
    } else {
      console.error('Designation not found for id:', id);
    }
  }

//refilling inputs with  empty values when added/updated
  clearForm() {
    this.newInventory = {
      inventoryType: '',
      unitType: '',
      status: false
    };
    this.isUpdating = false; 
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Submit';
    }
  }

  searchInventory() {
    if (this.searchTerm.trim() === '') {
      this.filteredInventory = this.Inventory; // Reset to show all designations if search term is empty
    } else {
      this.filteredInventory = this.Inventory.filter(Inventory =>
        Inventory.inventoryType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        Inventory.unitType.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
  }
}