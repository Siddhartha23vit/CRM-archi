import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-bank',
  templateUrl: './admin-bank.component.html',
  styleUrls: ['./admin-bank.component.css']
})
export class AdminBankComponent implements OnInit {
  newBank={
    bankName:'',
    bankAlias:'',
    contactPerson:'',
    mobileNumber:'',
    status: false
  };
  bank: any[] = [];
  filteredBank: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedBank: any;
  formSubmitted: boolean = false;


  constructor(private http:HttpClient) { }
  
  ngOnInit() {
    this.getBank();
  }
  isValidMobileNumber(): boolean {
    return /^\d{10}$/.test(this.newBank.mobileNumber);
  }

  getBank() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/bank/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.bank = response.data;
            this.filteredBank = response.data;

          } else {
            console.log('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching Bank Details:', error);
        }
      );
  }

  submitBank() {
    if (!this.newBank.bankName || !this.newBank.contactPerson || !this.newBank.mobileNumber  ) {
      return; 
    }
    const exists = this.checkIfBankExists(this.newBank.bankName.toLowerCase());
    if (exists) {
      alert('Bank with the same name or alias already exists.');
      return; // Prevent form submission
    }
    if (this.newBank.mobileNumber.length < 10) {
      return; // Prevent form submission
    }
   
    
    this.http.post<any>('http://127.0.0.1:5001/api/masters/bank/create', this.newBank)
      .subscribe(
        response => {
          console.log('Bank details added successfully:', response);
          alert('Bank Details Added Successfully');
         
          this.bank.push(response.data); 
          this.clearForm();
          this.getBank();
          
        },
        error => {
          console.error('Error adding Bank details', error);
        }
      );
  }
  checkIfBankExists(bankName: string): boolean {
    for (const bank of this.bank) {
      if (bank.bankName.toLowerCase() === bankName && 
      (!this.isUpdating || bank._id!==this.selectedBank._id)) {
        return true; // Bank exists
      }
    }
    return false; // Bank does not exist
  }
  updateBank() {
    if (!this.selectedBank || !this.newBank.bankName  || !this.newBank.contactPerson || !this.newBank.mobileNumber) {
      return;
    }
    const exists = this.checkIfBankExists(this.newBank.bankName.toLowerCase());
    if (exists) {
      alert('Bank with the same name or alias already exists.');
      return; // Prevent form submission
    }
    if (this.newBank.mobileNumber.length < 10) {
      return; // Prevent form submission
    }
   
    const updatedData = {
      id: this.selectedBank._id,
      ...this.newBank
    };
  
    this.http.put<any>(`http://127.0.0.1:5001/api/masters/bank/update`, updatedData)
      .subscribe(
        response => {
          console.log('Bank updated successfully:', response);
          alert('Bank Details Updated Successfully');
          const index = this.bank.findIndex(item => item._id === this.selectedBank._id);
          if (index !== -1) {
            this.bank[index] = response.data;
            this.clearForm();
            this.getBank();
          }
        },
        error => {
          console.error('Error updating Bank:', error);
        }
      );
  }
  
  
   deleteBank(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete Bank Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/bank/delete`, { id: id })
        .subscribe(
          response => {
            console.log('Bank Details deleted successfully:', response);
            this.bank = this.bank.filter(item => item._id !== id);
            alert('Bank Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Bank:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Bank Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }
   
  populateFormFields(id: string) {
    const bank = this.bank.find(item => item._id === id);
    if (bank) {
      this.selectedBank = bank;
      this.newBank = { 
        bankName: bank.bankName,
        bankAlias: bank.bankAlias,
        contactPerson:bank.contactPerson,
        mobileNumber:bank.mobileNumber,
        status: bank.status
      };
      this.isUpdating = true;
      const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
      if (submitButton) {
        submitButton.innerText = 'Update';
      }
    } else {
      console.error('Bank not found for id:', id);
    }
  }

  clearForm() {
    this.newBank = {
      bankName: '',
      bankAlias: '',
      mobileNumber:'',
      contactPerson:'',
      status: false
    };
    this.isUpdating = false; 
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Submit';
    }
  }
  searchBank() {
    if (this.searchTerm.trim() === '') {
      this.filteredBank = this.bank; // Reset to show all designations if search term is empty
    } else {
      this.filteredBank = this.bank.filter(bank =>
        bank.bankName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        bank.bankAlias.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        bank.contactPerson.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        bank.mobileNumber.toString().includes(this.searchTerm.toLowerCase()) ||
        bank.search.toString().includes(this.searchTerm.toLowerCase())
      );
    }
  }

}