import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-farm-land',
  templateUrl: './admin-farm-land.component.html',
  styleUrls: ['./admin-farm-land.component.css']
})
export class AdminFarmLandComponent implements OnInit{
 
  newFarmLand={
    farmlandType:'',
    farmlandAlias:'',
    status:false
  };
  Farmland:any[]=[]
  filteredFarmLand: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedFarm: any;



  constructor(private http:HttpClient) {  }

  ngOnInit(){
    this.getfarmland()
  }

  getfarmland(){
    this.http.get<any>('http://127.0.0.1:5001/api/masters/farmlandType/get')
  .subscribe(
    response => {
      if (response.success && Array.isArray(response.data)) {
        this.Farmland = response.data;
        this.filteredFarmLand = response.data;

      } else {
        console.error('Invalid response format:', response);
      }
    },
    error => {
      console.error('Error fetching designations:', error);
    }
  );
}
CheckIfFarmlandExists(farmlandType:string):boolean {
  for(const Farmland of this.Farmland){
    if(Farmland.farmlandType.toLowerCase()===farmlandType &&
    (!this.isUpdating || Farmland._id !== this.selectedFarm._id)){
      return true;
    }
  }
return false

}
submitFarmland() {
  if (!this.newFarmLand.farmlandType) {
    return; 
  }
  const exists=this.CheckIfFarmlandExists(this.newFarmLand.farmlandType.toLowerCase());
  if(exists){
    alert("Record already exists");
    return;
  }
this.http.post<any>('http://127.0.0.1:5001/api/masters/farmlandType/create', this.newFarmLand)
  .subscribe(
    response => {
      console.log('Farm Land Details added successfully:', response);
      alert('Farm Land Details Added Successfully');
      this.Farmland.push(response.data);
      this.clearForm();
      this.getfarmland();
    },
    error => {
      console.error('Error adding Farm Land  Details:', error);
      alert('Error Adding Farm Land Details');
    }
  );
}

//updateing data
updateFarmland() {
  if (!this.selectedFarm || !this.newFarmLand.farmlandType) {
    return;
  }
  const exists=this.CheckIfFarmlandExists(this.newFarmLand.farmlandType.toLowerCase());
  if(exists){
    alert("Record already exists");
    return;
  }

  const updatedData = {
    id: this.selectedFarm._id,
    ...this.newFarmLand
  };
  this.http.put<any>(`http://127.0.0.1:5001/api/masters/farmlandType/update`, updatedData)
    .subscribe(
      response => {
        console.log('Farm Land updated successfully:', response);
        alert('Farm Land Details Updated Successfully');
        const index = this.Farmland.findIndex(item => item._id === this.selectedFarm._id);
        if (index !== -1) {
          this.Farmland[index] = response.data;
          this.clearForm();
          this.getfarmland();
        }
      },
      error => {
        console.error('Error updating Farm Land:', error);
      }
    );
}

//deleting data
deleteFarmland(id: string) {
  const confirmed = window.confirm('Are you sure you want to delete this Farm Land Details?');
  if (confirmed) {
    this.http.post<any>(`http://127.0.0.1:5001/api/masters/farmlandType/delete`, { id: id })
      .subscribe(
        response => {
          console.log('Farm Land Details deleted successfully:', response);
          this.Farmland = this.Farmland.filter(item => item._id !== id);
          alert('Farm Land Details Deleted Successfully');
        },
        error => {
          console.error('Error deleting Farm Land Details:', error);
          if (error instanceof HttpErrorResponse) {
            console.error(`Status: ${error.status}, Message: ${error.message}`);
          }
          alert('Error Deleting Farm Land Details');
        }
      );
  } else {
    console.log('Deletion cancelled by user');
  }
}

//refilling input with value to update
populateFormFields(id: string) {
  const Farmland = this.Farmland.find(item => item._id === id);
  if (Farmland) {
    this.selectedFarm = Farmland;
    this.newFarmLand = { 
      farmlandType: Farmland.farmlandType,
      farmlandAlias: Farmland.farmlandAlias,
      status: Farmland.status
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
  this.newFarmLand = {
    farmlandType: '',
    farmlandAlias: '',
    status: false
  };
  this.isUpdating = false; 
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  if (submitButton) {
    submitButton.innerText = 'Submit';
  }
}

//searching data
searchFarmLand() {
  if (this.searchTerm.trim() === '') {
    this.filteredFarmLand = this.Farmland; // Reset to show all designations if search term is empty
  } else {
    this.filteredFarmLand = this.Farmland.filter(Farmland =>
      Farmland.farmlandType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      Farmland.farmlandAlias.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

}