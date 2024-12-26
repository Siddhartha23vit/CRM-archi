import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-user-type',
  templateUrl: './admin-user-type.component.html',
  styleUrls: ['./admin-user-type.component.css']
})
export class AdminUserTypeComponent  implements OnInit{

  newUsertype={
    type:'',
    backOffice:false,
    status:false,
  }
  Usertype: any[] = [];
  filteredUserType: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedUserType: any;

  constructor(private http:HttpClient){ }
  ngOnInit(){
    this.getUsertype();
  }
  getUsertype() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/userType/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.Usertype = response.data;
            this.filteredUserType = response.data;

          } else {
            console.log('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching User type:', error);
        }
      );
  }
  checkIfUserTypeExists(type: string): boolean {
    for (const Usertype of this.Usertype) {
      if (Usertype.type.toLowerCase() === type && 
      (!this.isUpdating || Usertype._id !== this.selectedUserType._id)) {
        return true; // UserType exists
      }
    }
    return false; // UserType does not exist
  }
  
  submitUsertype() {
    if (!this.newUsertype.type ) {
      return; 
    }
    const exists = this.checkIfUserTypeExists(this.newUsertype.type.toLowerCase());
    if (exists) {
      alert('Record already exists.');
      return; // Prevent form submission
    }
    this.http.post<any>('http://127.0.0.1:5001/api/masters/userType/create', this.newUsertype)
      .subscribe(
        response => {
          console.log('User type added successfully:', response);
          alert('User type Added Successfully');
          this.Usertype.push(response.data); 
          this.clearForm();
          this.getUsertype();

        },
        error => {
          console.error('Error adding User Type', error);
        }
      );
  }

   
//updateing data
updateUserType() {
  if (!this.selectedUserType || !this.newUsertype.type) {
    return;
  }
  const exists = this.checkIfUserTypeExists(this.newUsertype.type.toLowerCase());
  if (exists) {
    alert('Record already exists.');
    return; // Prevent form submission
  }
  const updatedData = {
    id: this.selectedUserType._id,
    ...this.newUsertype
  };
  this.http.put<any>(`http://127.0.0.1:5001/api/masters/userType/update`, updatedData)
    .subscribe(
      response => {
        console.log('UserType updated successfully:', response);
        alert('UserType Details Updated Successfully');
        const index = this.Usertype.findIndex(item => item._id === this.selectedUserType._id);
        if (index !== -1) {
          this.Usertype[index] = response.data;
          this.clearForm();
          this.getUsertype();
        }
      },
      error => {
        console.error('Error updating UserType:', error);
      }
    );
}

//deleting data
  deleteUsertype(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this User Type Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/userType/delete`, { id: id })
        .subscribe(
          response => {
            console.log('User Type Details deleted successfully:', response);
            this.Usertype = this.Usertype.filter(item => item._id !== id);
            alert('User Type Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting User Type Details:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting User Type Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }
//refilling input with value to update
populateFormFields(id: string) {
  const Usertype = this.Usertype.find(item => item._id === id);
  if (Usertype) {
    this.selectedUserType = Usertype;
    this.newUsertype = { 
      type: Usertype.type,
      backOffice: Usertype.backOffice,
      status: Usertype.status
    };
    this.isUpdating = true;
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Update';
    }
  } else {
    console.error('UserType not found for id:', id);
  }
}

//refilling inputs with  empty values when added/updated
clearForm() {
  this.newUsertype = {
    type: '',
    backOffice:false,
    status: false
  };
  this.isUpdating = false; 
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  if (submitButton) {
    submitButton.innerText = 'Submit';
  }
}

//searching data
  searchUserType() {
    if (this.searchTerm.trim() === '') {
      this.filteredUserType = this.Usertype; 
    } else {
      this.filteredUserType = this.Usertype.filter(Usertype =>
        Usertype.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}