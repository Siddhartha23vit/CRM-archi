import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-raw-house',
  templateUrl: './admin-raw-house.component.html',
  styleUrls: ['./admin-raw-house.component.css']
})
export class AdminRawHouseComponent  implements OnInit{
  newRawHouse={
    rowhouseType:'',
    rowhouseAlias:'',
    status:false
  };
  RawHouse: any[]=[]
  filteredRawHouse: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedRawHouse: any;

  constructor(private http:HttpClient) {}

  ngOnInit() {
    this.getRawhouse()
  }

  getRawhouse(){
    this.http.get<any>('http://127.0.0.1:5001/api/masters/rowhouseType/get')
  .subscribe(
    response => {
      if (response.success && Array.isArray(response.data)) {
        this.RawHouse = response.data;
        this.filteredRawHouse = response.data;

      } else {
        console.error('Invalid response format:', response);
      }
    },
    error => {
      console.error('Error fetching designations:', error);
    }
  );
}
CheckIfRowHouseExists(rowhousetype:string):boolean {
  for(const RawHouse of this.RawHouse){
    if(RawHouse.rowhouseType.toLowerCase()===rowhousetype &&
  (!this.isUpdating || RawHouse._id !== this.selectedRawHouse._id)){
      return true;
    }
  }
return false

}

submitRawhouse() {
  if (!this.newRawHouse.rowhouseType) {
    return; 
  }
  const exists=this.CheckIfRowHouseExists(this.newRawHouse.rowhouseType.toLowerCase());
  if(exists){
    alert("Record already exists");
    return;
  }
this.http.post<any>('http://127.0.0.1:5001/api/masters/rowhouseType/create', this.newRawHouse)
  .subscribe(
    response => {
      console.log('Flat added successfully:', response);
      alert('Raw House Details Added Successfully');
      this.RawHouse.push(response.data);
      this.clearForm();
      this.getRawhouse();
    },
    error => {
      console.error('Error adding Raw house:', error);
    }
  );
}
//updateing data
updateRawHouse() {
  if (!this.selectedRawHouse || !this.newRawHouse.rowhouseType) {
    return;
  }
  const exists=this.CheckIfRowHouseExists(this.newRawHouse.rowhouseType.toLowerCase());
  if(exists){
    alert("Record already exists");
    return;
  }
  const updatedData = {
    id: this.selectedRawHouse._id,
    ...this.newRawHouse
  };
  this.http.put<any>(`http://127.0.0.1:5001/api/masters/rowhouseType/update`, updatedData)
    .subscribe(
      response => {
        console.log('Raw House updated successfully:', response);
        alert('Raw House Details Updated Successfully');
        const index = this.RawHouse.findIndex(item => item._id === this.selectedRawHouse._id);
        if (index !== -1) {
          this.RawHouse[index] = response.data;
          this.clearForm();
          this.getRawhouse();
        }
      },
      error => {
        console.error('Error updating RawHouse:', error);
      }
    );
}

//deleting data
deleteRawhouse(id: string) {
  const confirmed = window.confirm('Are you sure you want to delete this Raw House Details?');
  if (confirmed) {
    this.http.post<any>(`http://127.0.0.1:5001/api/masters/rowhouseType/delete`, { id: id })
      .subscribe(
        response => {
          console.log('Raw House Details deleted successfully:', response);
          this.RawHouse = this.RawHouse.filter(item => item._id !== id);
          alert('Raw House Details Deleted Successfully');
        },
        error => {
          console.error('Error deleting Raw House Details:', error);
          if (error instanceof HttpErrorResponse) {
            console.error(`Status: ${error.status}, Message: ${error.message}`);
          }
          alert('Error Deleting Raw House Details');
        }
      );
  } else {
    console.log('Deletion cancelled by user');
  }
}
//refilling input with value to update
populateFormFields(id: string) {
  const RawHouse = this.RawHouse.find(item => item._id === id);
  if (RawHouse) {
    this.selectedRawHouse = RawHouse;
    this.newRawHouse = { 
      rowhouseType: RawHouse.rowhouseType,
      rowhouseAlias: RawHouse.rowhouseAlias,
      status: RawHouse.status
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
  this.newRawHouse = {
    rowhouseType: '',
    rowhouseAlias: '',
    status: false
  };
  this.isUpdating = false; 
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  if (submitButton) {
    submitButton.innerText = 'Submit';
  }
}

//searching data
searchRawHouse() {
  if (this.searchTerm.trim() === '') {
    this.filteredRawHouse = this.RawHouse; // Reset to show all designations if search term is empty
  } else {
    this.filteredRawHouse = this.RawHouse.filter(RawHouse =>
      RawHouse.rowhouseType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      RawHouse.rowhouseAlias.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

}
