import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-admin-city',
  templateUrl: './admin-city.component.html',
  styleUrls: ['./admin-city.component.css']
})
export class AdminCityComponent implements OnInit {
  newCity={
    state:'',
    city:'',
    status: false
  };

  cities: any[]=[];
  filteredCities: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedCity: any;


  constructor(private http:HttpClient) { }

  ngOnInit(){
    this.getCity();
  }
//fetching from api
  getCity(){
     this.http.get<any>(`http://127.0.0.1:5001/api/masters/city/get`)
     .subscribe( 
      (response)=>{
        if (response.success && Array.isArray(response.data)) {
          this.cities = response.data;
          this.filteredCities = response.data;

        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching designations:', error);
      }
    );
    }

    checkIfCityExists(city: string): boolean {
      for (const cities of this.cities) {
        if (cities.city.toLowerCase() === city && 
        (!this.isUpdating || cities._id !== this.selectedCity._id)) {
          return true; // City exists
        }
      }
      return false; // City does not exist
    }

//submitting data
    submitCity(){
      if (!this.newCity.state || !this.newCity.city ) {
        return; 
      }
      const exists = this.checkIfCityExists(this.newCity.city.toLowerCase());
      if (exists) {
        alert('City already exists.');
        return; // Prevent form submission
      }
      this.http.post<any>('http://127.0.0.1:5001/api/masters/city/create',this.newCity)
      .subscribe(
        response =>{
          console.log('City details added successfully: ',response)
          alert("State and City details added");
          this.cities.push(response.data);
          this.clearForm();
          this.getCity();

        },
        error =>{
          console.error('Error adding  city details :', error);
        }
      )
    }

    //update 
    updateCity() {
      if (!this.selectedCity || !this.newCity.state || !this.newCity.city) {
        return;
      }
      const exists = this.checkIfCityExists(this.newCity.city.toLowerCase());
      if (exists) {
        alert('City already exists.');
        return; // Prevent form submission
      }
      const updatedData = {
        id: this.selectedCity._id,
        ...this.newCity
      };
      this.http.put<any>(`http://127.0.0.1:5001/api/masters/city/update`, updatedData)
        .subscribe(
          response => {
            console.log('City updated successfully:', response);
            alert('City Details Updated Successfully');
            // Replace the updated designation in the array
            const index = this.cities.findIndex(item => item._id === this.selectedCity._id);
            if (index !== -1) {
              this.cities[index] = response.data;
              this.clearForm();
              this.getCity();
            }
          },
          error => {
            console.error('Error updating City:', error);
          }
        );
    }
    
//Delete Function
    deletecity(id: string) {
      const confirmed = window.confirm('Are you sure you want to delete this city Details?');
      if (confirmed) {
        this.http.post<any>(`http://127.0.0.1:5001/api/masters/city/delete`, { id: id })
          .subscribe(
            response => {
              console.log('city Details deleted successfully:', response);
              this.cities = this.cities.filter(item => item._id !== id);
              alert('city Details Deleted Successfully');
            },
            error => {
              console.error('Error deleting city Details:', error);
              if (error instanceof HttpErrorResponse) {
                console.error(`Status: ${error.status}, Message: ${error.message}`);
              }
              alert('Error Deleting city Details');
            }
          );
      } else {
        console.log('Deletion cancelled by user');
      }
    }

    //Refilling the form with the data to update
    populateFormFields(id: string) {
      const cities = this.cities.find(item => item._id === id);
      if (cities) {
        this.selectedCity = cities;
        this.newCity = { 
          state: cities.state,
          city: cities.city,
          status: cities.status
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

    //form empty after adding/updating 
    clearForm() {
      this.newCity = {
        state: '',
        city: '',
        status: false
      };
      this.isUpdating = false; 
      const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
      if (submitButton) {
        submitButton.innerText = 'Submit';
      }
    }


    //Search  functionality
    searchCity() {
      if (this.searchTerm.trim() === '') {
        this.filteredCities = this.cities; // Reset to show all designations if search term is empty
      } else {
        this.filteredCities = this.cities.filter(cities =>
          cities.state.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          cities.city.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    }
  
  }
