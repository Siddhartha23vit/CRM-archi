import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-facing',
  templateUrl: './admin-facing.component.html',
  styleUrls: ['./admin-facing.component.css']
})
export class AdminFacingComponent implements OnInit {
  newFacing={
    facing:'',
    facingAlias:'',
    status: false
  };

  FacingSide: any[]=[];
  filteredFace: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedFacing: any;

  constructor(private http:HttpClient) { }

  ngOnInit(){
    this.getFacing();
  }

//fetching from api
getFacing(){
     this.http.get<any>(`http://127.0.0.1:5001/api/masters/facing/get`)
     .subscribe( 
      (response)=>{
        if (response.success && Array.isArray(response.data)) {
          this.FacingSide = response.data;
          this.filteredFace = response.data;

        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching designations:', error);
      }
    );
    }
  checkIffacingExists(facing: string): boolean {
    for (const FacingSide of this.FacingSide) {
      if (FacingSide.facing.toLowerCase() === facing && 
    (!this.isUpdating || FacingSide._id !== this.selectedFacing._id)) {
        return true; // facing exists
      }
    }
    return false; // facing does not exist
  }
      //submitting data to api
submitFacing(){
      if (!this.newFacing.facing ) {
        return; 
      }
      const exists = this.checkIffacingExists(this.newFacing.facing.toLowerCase());
      if (exists) {
        alert('Record already exists.');
        return; // Prevent form submission
      }
      this.http.post<any>('http://127.0.0.1:5001/api/masters/facing/create',this.newFacing)
      .subscribe(
        response =>{
          console.log('Facing details added successfully: ',response)
          alert("Facing details added");
          this.FacingSide.push(response.data);
          this.clearForm();
          this.getFacing();
        },
        error =>{
          console.error('Error adding  facing details :', error);
        }
      )
    }
    //updateing data
  updateDesignation() {
    if (!this.selectedFacing || !this.newFacing.facing ) {
      return;
    }
    const exists = this.checkIffacingExists(this.newFacing.facing.toLowerCase());
      if (exists) {
        alert('Record already exists.');
        return; // Prevent form submission
      }
    const updatedData = {
      id: this.selectedFacing._id,
      ...this.newFacing
    };
    this.http.put<any>(`http://127.0.0.1:5001/api/masters/facing/update`, updatedData)
      .subscribe(
        response => {
          console.log('Facing updated successfully:', response);
          alert('Facing Details Updated Successfully');
          const index = this.FacingSide.findIndex(item => item._id === this.selectedFacing._id);
          if (index !== -1) {
            this.FacingSide[index] = response.data;
            this.clearForm();
            this.getFacing();
          }
        },
        error => {
          console.error('Error updating Facing:', error);
        }
      );
  }
  
//deleting data
    deleteFacing(id: string) {
      const confirmed = window.confirm('Are you sure you want to delete this Facing Side Details?');
      if (confirmed) {
        this.http.post<any>(`http://127.0.0.1:5001/api/masters/facing/delete`, { id: id })
          .subscribe(
            response => {
              console.log('Facing Side Details deleted successfully:', response);
              this.FacingSide = this.FacingSide.filter(item => item._id !== id);
              alert('Facing Details Deleted Successfully');
            },
            error => {
              console.error('Error deleting Facing Side Details:', error);
              if (error instanceof HttpErrorResponse) {
                console.error(`Status: ${error.status}, Message: ${error.message}`);
              }
              alert('Error Deleting Facing Side Details');
            }
          );
      } else {
        console.log('Deletion cancelled by user');
      }
    }
    
    //refilling input with value to update
  populateFormFields(id: string) {
    const FacingSide = this.FacingSide.find(item => item._id === id);
    if (FacingSide) {
      this.selectedFacing = FacingSide;
      this.newFacing = { 
        facing: FacingSide.facing,
        facingAlias: FacingSide.facingAlias,
        status: FacingSide.status
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
    this.newFacing = {
      facing: '',
      facingAlias: '',
      status: false
    };
    this.isUpdating = false; 
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Submit';
    }
  }

  //searching data
    searchFaceing() {
      if (this.searchTerm.trim() === '') {
        this.filteredFace = this.FacingSide; // Reset to show all designations if search term is empty
      } else {
        this.filteredFace = this.FacingSide.filter(FacingSide =>
          FacingSide.facing.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          FacingSide.facingAlias.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    }

}
