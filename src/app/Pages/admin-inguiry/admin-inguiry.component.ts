import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-inguiry',
  templateUrl: './admin-inguiry.component.html',
  styleUrls: ['./admin-inguiry.component.css']
})
export class AdminInguiryComponent implements OnInit {
  newInquiry={
    inquiryStatus:'',
    inquiryAlias:'',
    stageType:'',
    status:false
  };
  Inquiry:any[]= [];
  filteredInquiry: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedInquiry: any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getInquiry()
  }
 
  getInquiry() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/inquiryStatus/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.Inquiry = response.data;
            this.filteredInquiry = response.data;

          } else {
            console.log('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching Inquirey Details:', error);
        }
      );
  }

  submitInquiry() {
    if(!this.newInquiry.inquiryStatus || !this.newInquiry.stageType)
    {
      return; 
    }
    this.http.post<any>('http://127.0.0.1:5001/api/masters/inquiryStatus/create', this.newInquiry)
      .subscribe(
        response => {
          console.log('Derection added successfully:', response);
          alert('Inquirey Details Added Successfully');
          this.Inquiry.push(response.data); 
          this.clearForm();
          this.getInquiry();
        },
        error => {
          console.error('Error Adding Inquirey Details', error);
        }
      );
  }
  //updateing data
  updateinquiry() {
    if (!this.selectedInquiry || !this.newInquiry.inquiryAlias ||
      !this.newInquiry.stageType) {
      return;
    }
    const updatedData = {
      id: this.selectedInquiry._id,
      ...this.newInquiry
    };
    this.http.put<any>(`http://127.0.0.1:5001/api/masters/inquiryStatus/update`, updatedData)
      .subscribe(
        response => {
          console.log('Inquiry updated successfully:', response);
          alert('Inquiry Details Updated Successfully');
          const index = this.Inquiry.findIndex(item => item._id === this.selectedInquiry._id);
          if (index !== -1) {
            this.Inquiry[index] = response.data;
            this.clearForm();
            this.getInquiry();
          }
        },
        error => {
          console.error('Error updating Inquiry:', error);
        }
      );
  }
  
//deleting data
  deleteinquiry(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this Inquiry Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/inquiryStatus/delete`, { id: id })
        .subscribe(
          response => {
            console.log('Inquiry Details deleted successfully:', response);
            this.Inquiry = this.Inquiry.filter(item => item._id !== id);
            alert('Inquiry Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Inquiry Details:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Inquiry Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }
   //refilling input with value to update
   populateFormFields(id: string) {
    const Inquiry = this.Inquiry.find(item => item._id === id);
    if (Inquiry) {
      this.selectedInquiry = Inquiry;
      this.newInquiry = { 
        inquiryStatus: Inquiry.inquiryStatus,
        inquiryAlias: Inquiry.inquiryAlias,
        stageType: Inquiry.stageType,
        status: Inquiry.status
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
    this.newInquiry = {
      inquiryStatus: '',
      inquiryAlias: '',
      stageType:'',
      status: false
    };
    this.isUpdating = false; 
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Submit';
    }
  }

  //searching data
  searchInquiry() {
    if (this.searchTerm.trim() === '') {
      this.filteredInquiry = this.Inquiry; // Reset to show all designations if search term is empty
    } else {
      this.filteredInquiry = this.Inquiry.filter(Inquiry =>
        Inquiry.inquiryStatus.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        Inquiry.inquiryAlias.toLowerCase().includes(this.searchTerm.toLowerCase())  ||
        Inquiry.stageType.toLowerCase().includes(this.searchTerm.toLowerCase())

      );
    }
  }
  
}

