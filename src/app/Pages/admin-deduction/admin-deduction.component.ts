import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-deduction',
  templateUrl: './admin-deduction.component.html',
  styleUrls: ['./admin-deduction.component.css']
})
export class AdminDeductionComponent  implements OnInit{

  newDeduction={
    deductionName:'',
    deductionPercentage:'',
    deductionType:'',
    status: false
  }

  Deduction:any[]=[]
  filteredDeduction: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedDeduction: any;


  constructor(private http:HttpClient) { }
  ngOnInit() { 
    this.getDeduction();
  }

  //fetching from api
  getDeduction(){
 this.http.get<any>('http://127.0.0.1:5001/api/masters/deductionType/get')
    .subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.Deduction = response.data;
          this.filteredDeduction = response.data;

        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching designations:', error);
      }
    );
  }

  checkifdeductionexist(name:string):boolean{
    for(const D of this.Deduction)
      if(D.deductionName.toLowerCase()===name && 
  (!this.isUpdating || D._id !== this.selectedDeduction._id))
        return true
    {
      return false
    }
  }
  
    //submitting data to api
  submitdeduction() {
    if (!this.newDeduction.deductionName || !this.newDeduction.deductionPercentage || !this.newDeduction.deductionType) {
      return; 
    }
    const exists=this.checkifdeductionexist(this.newDeduction.deductionName.toLowerCase())
    if(exists){
      alert("Recode already exist")
      return
    }
  this.http.post<any>('http://127.0.0.1:5001/api/masters/deductionType/create', this.newDeduction)
    .subscribe(
      response => {
        console.log('Deduction Details added successfully:', response);
        alert('Deduction Details Added Successfully');
        this.Deduction.push(response.data);
        this.clearForm();
        this.getDeduction();
      },
      error => {
        console.error('Error adding Deduction Details:', error);
        alert('Error Adding Deduction Details');
      }
    );
  }


  //updateing data
  updateDeduction() {
    if (!this.selectedDeduction || !this.newDeduction.deductionName || !this.newDeduction.deductionPercentage || !this.newDeduction.deductionType) {
      return;
    }
    const exists=this.checkifdeductionexist(this.newDeduction.deductionName.toLowerCase())
    if(exists){
      alert("Recode already exist")
      return
    }
    const updatedData = {
      id: this.selectedDeduction._id,
      ...this.newDeduction
    };
    this.http.put<any>(`http://127.0.0.1:5001/api/masters/deductionType/update`, updatedData)
      .subscribe(
        response => {
          console.log('Deduction updated successfully:', response);
          alert('Deduction Details Updated Successfully');
          const index = this.Deduction.findIndex(item => item._id === this.selectedDeduction._id);
          if (index !== -1) {
            this.Deduction[index] = response.data;
            this.clearForm();
            this.getDeduction();
          }
        },
        error => {
          console.error('Error updating Deduction:', error);
        }
      );
  }


  
//deleting data
  deletededuction(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this Deduction Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/deductionType/delete`, { id: id })
        .subscribe(
          response => {
            console.log('Deduction Details deleted successfully:', response);
            this.Deduction = this.Deduction.filter(item => item._id !== id);
            alert('Deduction Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Deduction Details:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Deduction Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }
    //refilling input with value to update
  populateFormFields(id: string) {
    const Deduction = this.Deduction.find(item => item._id === id);
    if (Deduction) {
      this.selectedDeduction = Deduction;
      this.newDeduction = { 
        deductionName: Deduction.deductionName,
        deductionPercentage: Deduction.deductionPercentage,
        deductionType:Deduction.deductionType,
        status: Deduction.status
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
    this.newDeduction = {
      deductionName: '',
      deductionPercentage: '',
      deductionType:'',
      status: false
    };
    this.isUpdating = false; 
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Submit';
    }
  }

  //searching data
  searchDeduction() {
    if (this.searchTerm.trim() === '') {
      this.filteredDeduction = this.Deduction; // Reset to show all deductions if search term is empty
    } else {
      this.filteredDeduction = this.Deduction.filter(deduction =>
        deduction.deductionName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        deduction.deductionPercentage.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        deduction.deductionType.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  

  }
  