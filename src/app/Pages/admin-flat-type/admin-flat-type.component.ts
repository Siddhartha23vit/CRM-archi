import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { escapeRegExp } from 'pdf-lib';

@Component({
  selector: 'app-admin-flat-type',
  templateUrl: './admin-flat-type.component.html',
  styleUrls: ['./admin-flat-type.component.css']
})
export class AdminFlatTypeComponent implements OnInit{
  newFlat={
    flatType:'',
    flatTypeAlias:'',
    status: false
  }
  Flat: any[]= []
  filteredFlat: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedFlat: any;


  constructor( private http:HttpClient) {}

  ngOnInit(){
    this.getFlat()
  }

  getFlat(){ 
    this.http.get<any>('http://127.0.0.1:5001/api/masters/flatType/get')
  .subscribe(
    response => {
      if (response.success && Array.isArray(response.data)) {
        this.Flat = response.data;
        this.filteredFlat = response.data;

      } else {
        console.error('Invalid response format:', response);
      }
    },
    error => {
      console.error('Error fetching designations:', error);
    }
  );
}
checkIfflatTypeExists(flatType: string): boolean {
  for (const Flat of this.Flat) {
    if (Flat.flatType.toLowerCase() === flatType &&
  (!this.isUpdating || Flat._id !== this.selectedFlat._id)) {
      return true; // flatType exists
    }
  }
  return false; // flatType does not exist
}

submitFlat() {
  if (!this.newFlat.flatType) {
    return; 
  }
  const exist=this.checkIfflatTypeExists(this.newFlat.flatType.toLowerCase());
  if(exist){
    alert("Flat Type Already Exists");
    return;
  }

  this.http.post<any>('http://127.0.0.1:5001/api/masters/flatType/create', this.newFlat)
    .subscribe(
      response => {
        console.log('Flat added successfully:', response);
        alert('Flat Details Added Successfully');
        this.Flat.push(response.data);
        this.clearForm();
        this.getFlat();
      },
      error => {
        console.error('Error adding designation:', error);
      }
    );
}

 
//updateing data
updateFlat() {
  if (!this.selectedFlat || !this.newFlat.flatType) {
    return;
  }
  const exist=this.checkIfflatTypeExists(this.newFlat.flatType.toLowerCase());
  if(exist){
    alert("Flat Type Already Exists");
    return;
  }
  const updatedData = {
    id: this.selectedFlat._id,
    ...this.newFlat
  };
  this.http.put<any>(`http://127.0.0.1:5001/api/masters/flatType/update`, updatedData)
    .subscribe(
      response => {
        console.log('Flat updated successfully:', response);
        alert('Flat Details Updated Successfully');
        const index = this.Flat.findIndex(item => item._id === this.selectedFlat._id);
        if (index !== -1) {
          this.Flat[index] = response.data;
          this.clearForm();
          this.getFlat();
        }
      },
      error => {
        console.error('Error updating Flat:', error);
      }
    );
}

//deleting data
deleteflat(id: string) {
  const confirmed = window.confirm('Are you sure you want to delete this Flat Type Details?');
  if (confirmed) {
    this.http.post<any>(`http://127.0.0.1:5001/api/masters/flatType/delete`, { id: id })
      .subscribe(
        response => {
          console.log('Flat Type Details deleted successfully:', response);
          this.Flat = this.Flat.filter(item => item._id !== id);
          alert('Flat Type Details Deleted Successfully');
        },
        error => {
          console.error('Error deleting Flat Type Details:', error);
          if (error instanceof HttpErrorResponse) {
            console.error(`Status: ${error.status}, Message: ${error.message}`);
          }
          alert('Error Deleting Flat Type Details');
        }
      );
  } else {
    console.log('Deletion cancelled by user');
  }
}
//refilling input with value to update
populateFormFields(id: string) {
  const Flat = this.Flat.find(item => item._id === id);
  if (Flat) {
    this.selectedFlat = Flat;
    this.newFlat = { 
      flatType: Flat.flatType,
      flatTypeAlias: Flat.flatTypeAlias,
      status: Flat.status
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
  this.newFlat = {
    flatType: '',
    flatTypeAlias: '',
    status: false
  };
  this.isUpdating = false; 
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  if (submitButton) {
    submitButton.innerText = 'Submit';
  }
}

//searching data
searchFlat() {
  if (this.searchTerm.trim() === '') {
    this.filteredFlat = this.Flat; // Reset to show all designations if search term is empty
  } else {
    this.filteredFlat = this.Flat.filter(Flat =>
      Flat.flatType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      Flat.flatTypeAlias.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
}
