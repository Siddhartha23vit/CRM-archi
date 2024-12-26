import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-charges',
  templateUrl: './admin-charges.component.html',
  styleUrls: ['./admin-charges.component.css']
})
export class AdminChargesComponent implements OnInit {

  newCharges={
    chargeName:'',
    chargeAlias:'',
    chargeType:'',
    status: false
  };
  Charges: any[] =[];
  filteredCharges : any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedCharges: any;


  constructor(private http:HttpClient) { }
  ngOnInit() {
    this.getCharges();
  }

  getCharges() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/charges/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.Charges = response.data;
            this.filteredCharges = response.data;
          } else {
            console.log('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching Charges Details:', error);
        }
      );
  }

  checkIfChargesExists(chargeName: string): boolean {
    for (const Charges of this.Charges) {
      if (Charges.chargeName.toLowerCase() === chargeName  && 
      (!this.isUpdating || Charges._id !== this.selectedCharges._id)) {
        return true; // Charges exists
      }
    }
    return false; // Charges does not exist
  }
  submitCharge() {
    if (!this.newCharges.chargeName  || !this.newCharges.chargeType ) {
      return; 
    }
    const exists = this.checkIfChargesExists(this.newCharges.chargeName.toLowerCase());
    if (exists) {
      alert('Charge with the same name already exists.');
      return; // Prevent form submission
    }
    this.http.post<any>('http://127.0.0.1:5001/api/masters/charges/create', this.newCharges)
      .subscribe(
        response => {
          console.log('Charges details added successfully:', response);
          alert('Charges Details Added Successfully');
          this.newCharges = {
            chargeName: '',
            chargeAlias: '',
            chargeType: '',
            status: false
          };
          this.Charges.push(response.data); 
          this.clearForm();
          this.getCharges();
        },
        error => {
          console.error('Error adding Charges details', error);
        }
      );
  }
  
  updateCharges() {
    if (!this.selectedCharges || !this.newCharges.chargeName || !this.newCharges.chargeType ) {
      return;
    }
    const exists = this.checkIfChargesExists(this.newCharges.chargeName.toLowerCase());
    if (exists) {
      alert('Charge with the same name already exists.');
      return; // Prevent form submission
    }
    const updatedData = {
      id: this.selectedCharges._id,
      ...this.newCharges
    };
    this.http.put<any>(`http://127.0.0.1:5001/api/masters/charges/update`, updatedData)
      .subscribe(
        response => {
          console.log('Charges updated successfully:', response);
          alert('Charges Details Updated Successfully');
          // Replace the updated designation in the array
          const index = this.Charges.findIndex(item => item._id === this.selectedCharges._id);
          if (index !== -1) {
            this.Charges[index] = response.data;
            this.clearForm();
            this.getCharges();
          }
        },
        error => {
          console.error('Error updating Charges:', error);
        }
      );
  }
  

  deletecharges(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this Charges Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/charges/delete`, { id: id })
        .subscribe(
          response => {
            console.log('Charges Details deleted successfully:', response);
            this.Charges = this.Charges.filter(item => item._id !== id);
            alert('Charges Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Charges Details:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Charges Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }
  populateFormFields(id: string) {
    const Charges = this.Charges.find(item => item._id === id);
    if (Charges) {
      this.selectedCharges = Charges;
      this.newCharges = { 
        chargeName: Charges.chargeName,
        chargeAlias: Charges.chargeAlias,
        chargeType:Charges.chargeType,
        status: Charges.status
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
  clearForm() {
    this.newCharges = {
      chargeName: '',
      chargeAlias: '',
      chargeType:'',
      status: false
    };
    this.isUpdating = false; 
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Submit';
    }
  }
  searchCharges() {
    if (this.searchTerm.trim() === '') {
      this.filteredCharges = this.Charges; // Reset to show all designations if search term is empty
    } else {
      this.filteredCharges = this.Charges.filter(Charges =>
        Charges.chargeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        Charges.chargeAlias.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        Charges.chargeType.toLowerCase().includes(this.searchTerm.toLowerCase())

      );
    }
  }

  
}

