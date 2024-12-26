import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-driection',
  templateUrl: './admin-driection.component.html',
  styleUrls: ['./admin-driection.component.css']
})
export class AdminDriectionComponent implements OnInit {

  newDirection={
    direction:'',
    directionAlias:'',
    status: false
  };
  Direction: any[] =[];
  filteredDirection : any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedDirection: any;


  constructor(private http:HttpClient) { }
  ngOnInit() {
    this.getDirection();
  }

//fetching from api
  getDirection() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/direction/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.Direction = response.data;
            this.filteredDirection = response.data;

          } else {
            console.log('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching direction Details:', error);
        }
      );
  }

  checkIfdirectionExists(direction: string): boolean {
    for (const Direction of this.Direction) {
      if (Direction.direction.toLowerCase() === direction &&
    (!this.isUpdating || Direction._id !== this.selectedDirection._id)) {
        return true; // direction exists
      }
    }
    return false; // direction does not exist
  }

  //submitting data to api
  submitCharge() {
    if (!this.newDirection.direction ) {
      return; 
    }
    const exists = this.checkIfdirectionExists(this.newDirection.direction.toLowerCase());
    if (exists) {
      alert('Record already exists.');
      return; // Prevent form submission
    }
    this.http.post<any>('http://127.0.0.1:5001/api/masters/direction/create', this.newDirection)
      .subscribe(
        response => {
          console.log('Derection added successfully:', response);
          alert('Direction Details Added Successfully');
          this.Direction.push(response.data); 
          this.clearForm();
          this.getDirection();
        },
        error => {
          console.error('Error Adding Direction details', error);
        }
      );
  }
    
//updateing data
updateDirection() {
  if (!this.selectedDirection || !this.newDirection.direction) {
    return;
  }
  const exists = this.checkIfdirectionExists(this.newDirection.direction.toLowerCase());
  if (exists) {
    alert('Record already exists.');
    return; // Prevent form submission
  }
  const updatedData = {
    id: this.selectedDirection._id,
    ...this.newDirection
  };
  this.http.put<any>(`http://127.0.0.1:5001/api/masters/direction/update`, updatedData)
    .subscribe(
      response => {
        console.log('Direction updated successfully:', response);
        alert('Direction Details Updated Successfully');
        const index = this.Direction.findIndex(item => item._id === this.selectedDirection._id);
        if (index !== -1) {
          this.Direction[index] = response.data;
          this.clearForm();
          this.getDirection();
        }
      },
      error => {
        console.error('Error updating Direction:', error);
      }
    );
}

//deleting data
  deletedirection(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this Direction Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/direction/delete`, { id: id })
        .subscribe(
          response => {
            console.log('Direction Details deleted successfully:', response);
            this.Direction = this.Direction.filter(item => item._id !== id);
            alert('Direction Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Direction Details:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Direction Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }
  
  //refilling input with value to update
  populateFormFields(id: string) {
    const Direction = this.Direction.find(item => item._id === id);
    if (Direction) {
      this.selectedDirection = Direction;
      this.newDirection = { 
        direction: Direction.direction,
        directionAlias: Direction.directionAlias,
        status: Direction.status
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
    this.newDirection = {
      direction: '',
      directionAlias: '',
      status: false
    };
    this.isUpdating = false; 
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Submit';
    }
  }

  //searching data
  searchDirectioon() {
    if (this.searchTerm.trim() === '') {
      this.filteredDirection = this.Direction; // Reset to show all designations if search term is empty
    } else {
      this.filteredDirection = this.Direction.filter(Direction =>
        Direction.direction.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        Direction.directionAlias.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }


}

