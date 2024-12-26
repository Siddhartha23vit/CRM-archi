import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-amenity',
  templateUrl: './admin-amenity.component.html',
  styleUrls: ['./admin-amenity.component.css']
})
export class AdminAmenityComponent implements OnInit {

  newAmenity = {
    amenityType: '',
    amenity: '',
    amenityAlias: '',
    status: false
  };

  amenities: any[] = [];
  filteredAmenities: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedAmenity: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAmenities();
  }

  getAmenities() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/amenities/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.amenities = response.data;
            this.filteredAmenities = response.data;

          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching amenities:', error);
        }
      );
  }
  checkIfamenityExists(amenity: string, amenityType: string): boolean {
    for (const checkAM of this.amenities) {
      if (checkAM.amenity.toLowerCase() === amenity && 
      checkAM.amenityType.toLowerCase() === amenityType &&
          (!this.isUpdating || checkAM._id !== this.selectedAmenity._id)) {
        return true;
      }
    }
    return false;
  }

  submitAmenity() {
    if (!this.newAmenity.amenityType || !this.newAmenity.amenity) {
      return;
    }
    const exists = this.checkIfamenityExists(this.newAmenity.amenity.toLowerCase(), this.newAmenity.amenityType.toLowerCase());
    if (exists) {
      alert('Record Already Exist.');
      return; 
    }
    
    this.http.post<any>('http://127.0.0.1:5001/api/masters/amenities/create', this.newAmenity)
      .subscribe(
        response => {
          console.log('Amenity Details added successfully:', response);
          alert('Amenity Details Added Successfully');
          this.amenities.push(response.data);
          this.clearForm();
          this.getAmenities();
        },
        error => {
          console.error('Error adding Amenity Details:', error);
          alert('Error Adding Amenity Details');
        }
      );
  }
  updateAmenity() {
    if (!this.selectedAmenity || !this.newAmenity.amenityType || !this.newAmenity.amenity) {
      return;
    }
    const exists = this.checkIfamenityExists(this.newAmenity.amenity.toLowerCase(), this.newAmenity.amenityType.toLowerCase());
    if (exists) {
      alert('Record Already Exist.');
      return; 
    }
    
  
    const updatedData = {
      id: this.selectedAmenity._id,
      ...this.newAmenity
    };
    this.http.put<any>(`http://127.0.0.1:5001/api/masters/amenities/update`, updatedData)
      .subscribe(
        response => {
          console.log('Amenities updated successfully:', response);
          alert('Amenities Details Updated Successfully');
          // Replace the updated designation in the array
          const index = this.amenities.findIndex(item => item._id === this.selectedAmenity._id);
          if (index !== -1) {
            this.amenities[index] = response.data;
            this.clearForm();
            this.getAmenities();
          }
        },
        error => {
          console.error('Error updating designation:', error);
        }
      );
  }
  
  deleteAmenity(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this Amenity Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/amenities/delete`, { id: id })
        .subscribe(
          response => {
            console.log('Amenity Details deleted successfully:', response);
            this.amenities = this.amenities.filter(item => item._id !== id);
            alert('Amenity Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Amenity Details:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Amenity Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }

  populateFormFields(id: string) {
    const amenities = this.amenities.find(item => item._id === id);
    if (amenities) {
      this.selectedAmenity = amenities;
      this.newAmenity = { 
        amenityType: amenities.amenityType,
        amenity:amenities.amenity,
        amenityAlias: amenities.amenityAlias,
        status: amenities.status
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
    this.newAmenity = {
      amenity: '',
      amenityAlias: '',
      amenityType:'',
      status: false
    };
    this.isUpdating = false; // Reset update mode
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Submit';
    }
  }

  searchAmenity() {
    if (this.searchTerm.trim() === '') {
      this.filteredAmenities = this.amenities; // Reset to show all amenities if search term is empty
    } else {
      this.filteredAmenities = this.amenities.filter(amenity =>
        amenity.amenityType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        amenity.amenity.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        amenity.amenityAlias.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

}
