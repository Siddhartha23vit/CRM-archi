import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-lead-source',
  templateUrl: './admin-lead-source.component.html',
  styleUrls: ['./admin-lead-source.component.css']
})
export class AdminLeadSourceComponent implements OnInit {

  newLead={
    leadSourceType:'',
    leadSourceAlias:'',
    status:false
  }
  Lead:any[]=[];
  filteredLead: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedLeadSource: any;

  constructor(private http:HttpClient) { }  

  ngOnInit(){
    this.getLead()
  }
  
  getLead(){
    this.http.get<any>('http://127.0.0.1:5001/api/masters/leadSource/get')
  .subscribe(
    response => {
      if (response.success && Array.isArray(response.data)) {
        this.Lead = response.data;
        this.filteredLead = response.data;

      } else {
        console.error('Invalid response format:', response);
      }
    },
    error => {
      console.error('Error fetching designations:', error);
    }
  );
}
checkifleadexist(leadSourceType:string):boolean{
  for(const Lead of this.Lead)
    if(Lead.leadSourceType.toLowerCase()=== leadSourceType &&
  (!this.isUpdating || Lead._id !== this.selectedLeadSource._id))
      return true;
  {
    return false
  }
}

submitlead() {
  if (!this.newLead.leadSourceType) {
    return; 
  }
  const exists=this.checkifleadexist(this.newLead.leadSourceType.toLowerCase())
  if(exists){
    alert("Record already exists");
    return
  }
this.http.post<any>('http://127.0.0.1:5001/api/masters/leadSource/create', this.newLead)
  .subscribe(
    response => {
      console.log('Lead Source Details added successfully:', response);
      alert('Lead Source Details Added Successfully');
      this.Lead.push(response.data);
      this.clearForm();
      this.getLead();
    },
    error => {
      console.error('Error adding Farm Land  Details:', error);
      alert('Error Adding Lead Source Details');
    }
  );
}
  
//updateing data
updateleadSource() {
  if (!this.selectedLeadSource || !this.newLead.leadSourceType) {
    return;
  }
  const exists=this.checkifleadexist(this.newLead.leadSourceType.toLowerCase())
  if(exists){
    alert("Record already exists");
    return
  }
  const updatedData = {
    id: this.selectedLeadSource._id,
    ...this.newLead
  };
  this.http.put<any>(`http://127.0.0.1:5001/api/masters/leadSource/update`, updatedData)
    .subscribe(
      response => {
        console.log('Lead Source updated successfully:', response);
        alert('Lead Source Details Updated Successfully');
        const index = this.Lead.findIndex(item => item._id === this.selectedLeadSource._id);
        if (index !== -1) {
          this.Lead[index] = response.data;
          this.clearForm();
          this.getLead();
        }
      },
      error => {
        console.error('Error updating Lead Source:', error);
      }
    );
}

//deleting data
deletelead(id: string) {
  const confirmed = window.confirm('Are you sure you want to delete this Lead Details?');
  if (confirmed) {
    this.http.post<any>(`http://127.0.0.1:5001/api/masters/leadSource/delete`, { id: id })
      .subscribe(
        response => {
          console.log('Lead Details deleted successfully:', response);
          this.Lead = this.Lead.filter(item => item._id !== id);
          alert('Lead Details Deleted Successfully');
        },
        error => {
          console.error('Error deleting Lead Details:', error);
          if (error instanceof HttpErrorResponse) {
            console.error(`Status: ${error.status}, Message: ${error.message}`);
          }
          alert('Error Deleting Lead Details');
        }
      );
  } else {
    console.log('Deletion cancelled by user');
  }
}
//refilling input with value to update
populateFormFields(id: string) {
  const Lead = this.Lead.find(item => item._id === id);
  if (Lead) {
    this.selectedLeadSource = Lead;
    this.newLead = { 
      leadSourceType: Lead.leadSourceType,
      leadSourceAlias: Lead.leadSourceAlias,
      status: Lead.status
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
  this.newLead = {
    leadSourceType: '',
    leadSourceAlias: '',
    status: false
  };
  this.isUpdating = false; 
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  if (submitButton) {
    submitButton.innerText = 'Submit';
  }
}

//searching data
searchLead() {
  if (this.searchTerm.trim() === '') {
    this.filteredLead = this.Lead; // Reset to show all designations if search term is empty
  } else {
    this.filteredLead = this.Lead.filter(Lead =>
      Lead.leadSourceType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      Lead.leadSourceAlias.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

}
