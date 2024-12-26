import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-designation',
  templateUrl: './admin-designation.component.html',
  styleUrls: ['./admin-designation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminDesignationComponent implements OnInit {
  newDesignation = {
    designationName: '',
    designationAlias: '',
    status: false
  };
  designations: any[] = [];
  filteredDesignations: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedDesignation: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDesignations();
  }

  //fetching from api
  getDesignations() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/designation/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.designations = response.data;
            this.filteredDesignations = response.data;
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching designations:', error);
        }
      );
  }

  checkIfDesignationExists(designationName: string): boolean {
    for (const designation of this.designations) {
      if (designation.designationName.toLowerCase() === designationName && 
          (!this.isUpdating || designation._id !== this.selectedDesignation._id)) {
        return true;
      }
    }
    return false;
  }

  //submitting data to api
  submitDesignation() {
    if (!this.newDesignation.designationName) {
      return;
    }
    const exists = this.checkIfDesignationExists(this.newDesignation.designationName.toLowerCase());
    if (exists) {
      alert('Designation with the same name already exists.');
      return; // Prevent form submission
    }
    this.http.post<any>('http://127.0.0.1:5001/api/masters/designation/create', this.newDesignation)
      .subscribe(
        response => {
          console.log('Designation added successfully:', response);
          alert('Designation Details Added Successfully');
          this.designations.push(response.data);
          this.clearForm();
          this.getDesignations();
        },
        error => {
          console.error('Error adding designation:', error);
          alert('Error Adding Designation Details');
        }
      );
  }

  //updating data
  updateDesignation() {
    if (!this.selectedDesignation || !this.newDesignation.designationName) {
      return;
    }
    const exists = this.checkIfDesignationExists(this.newDesignation.designationName.toLowerCase());
    if (exists) {
      alert('Designation with the same name already exists.');
      return; // Prevent form submission
    }
    const updatedData = {
      id: this.selectedDesignation._id,
      ...this.newDesignation
    };
    this.http.put<any>(`http://127.0.0.1:5001/api/masters/designation/update`, updatedData)
      .subscribe(
        response => {
          console.log('Designation updated successfully:', response);
          alert('Designation Details Updated Successfully');
          const index = this.designations.findIndex(item => item._id === this.selectedDesignation._id);
          if (index !== -1) {
            this.designations[index] = response.data;
            this.clearForm();
            this.getDesignations();
          }
        },
        error => {
          console.error('Error updating designation:', error);
        }
      );
  }

  //deleting data
  deleteDesignations(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete Designation Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/designation/delete`, { id: id })
        .subscribe(
          response => {
            console.log('Designation Details deleted successfully:', response);
            this.designations = this.designations.filter(item => item._id !== id);
            alert('Designation Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Designation:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Designation Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }

  //refilling input with value to update
  populateFormFields(id: string) {
    const designation = this.designations.find(item => item._id === id);
    if (designation) {
      this.selectedDesignation = designation;
      this.newDesignation = { 
        designationName: designation.designationName,
        designationAlias: designation.designationAlias,
        status: designation.status
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

  //refilling inputs with empty values when added/updated
  clearForm() {
    this.newDesignation = {
      designationName: '',
      designationAlias: '',
      status: false
    };
    this.isUpdating = false; 
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Submit';
    }
  }

  //searching data
  searchDesignations() {
    if (this.searchTerm.trim() === '') {
      this.filteredDesignations = this.designations; // Reset to show all designations if search term is empty
    } else {
      this.filteredDesignations = this.designations.filter(designation =>
        designation.designationName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        designation.designationAlias.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
