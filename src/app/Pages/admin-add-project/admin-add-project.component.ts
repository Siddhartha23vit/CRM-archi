import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-project',
  templateUrl: './admin-add-project.component.html',
  styleUrls: ['./admin-add-project.component.css']
})
export class AdminAddProjectComponent implements OnInit {
  states: string[] = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
    "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  newProjectList: any = {
    projectName: '', companyName: '', reraNumber: '', guideLineValue: '', projectType: 'Apartment',
    totalBuilding: '', totalPlot: '', totalfarmLand: '', totalrowHouse: '', amenities: [], headName: '',
    mobileNumber: '', startDate: '', completionDate: '', projectDescription: '', status: '', state: '', city: '',
    address: '', bank: '', accountNumber: '', ifscCode: '', bankAddress: '', commissionMethod: '', commission: '',
    inclusiveRegistry: '', buildingName: '', buildingTotalFloor: '', buildingTotalPlat: '', buildingStatus: '',
    buildingStartDate: '', buildingCompletionDate: '', buildingAmenties: '', remark: ''
  };
  
  isUpdateMode: boolean = false;
  formSubmitted: boolean = false;

  filteredCities: any[] = [];
  bank: any[] = [];
  filteredBank: any[] = [];
  amenities: any[] = [];
  selectedAmenities: string[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Subscribe to query parameters to get the project data
    this.route.queryParams.subscribe(params => {
      if (params['project']) {
        const projectData = JSON.parse(params['project']);
        // Update newProjectList with the received project data
        this.newProjectList = { ...this.newProjectList, ...projectData };
        // Set update mode to true
        this.isUpdateMode = true;

        // Filter cities based on the state in the project data
        this.filterCities();
      }
    });

    // Call other initialization methods
    this.getBank();
    this.getAmenities();
  }

  submitProjectList() {
    this.formSubmitted = true;
    if (this.isUpdateMode) {
      this.updateProjectList();
    } else {
      this.addProjectList();
    }
  }

  addProjectList() {
    if (!this.validateForm()) {
      return;
    }
    this.newProjectList.amenities = this.selectedAmenities;

    this.http.post<any>('http://127.0.0.1:5001/api/projectList/create-projectlist', this.newProjectList)
      .subscribe(
        response => {
          console.log('Project List added successfully:', response);
          alert('Project List Added Successfully');
          this.clearForm();
        },
        error => {
          console.error('Error Adding Project List details', error);
        }
      );
  }

  updateProjectList() {
    if (!this.validateForm()) {
      return;
    }
    this.newProjectList.amenities = this.selectedAmenities;

    const projectId = this.newProjectList._id;

    this.http.put<any>(`http://127.0.0.1:5001/api/projectList/update-projectlist?id=${projectId}`, { updatedProject: this.newProjectList })
      .subscribe(
        response => {
          console.log('Project List updated successfully:', response);
          if (response.error) {
            console.error('Error updating project:', response.error);
            alert('Error updating project');
          } else {
            alert('Project updated successfully');
          }
        },
        error => {
          console.error('Error updating project:', error);
          alert('Error updating project: ' + JSON.stringify(error));
        }
      );
  }

  filterCities() {
    if (this.newProjectList.state) {
      this.http.get<any>('http://127.0.0.1:5001/api/masters/city/get')
        .subscribe(
          response => {
            if (response.success && Array.isArray(response.data)) {
              const filteredCities = response.data.filter((city: { state: any; }) => city.state === this.newProjectList.state);
              this.filteredCities = filteredCities.map((city: { _id: any; city: string }) => ({ id: city._id, city: city.city }));
              console.log('Filtered cities:', this.filteredCities);

              // Check if the current city is in the filtered list
              const cityMatch = this.filteredCities.find(city => city.city === this.newProjectList.city);
              if (!cityMatch) {
                this.newProjectList.city = ''; // Clear the city if it's not in the filtered list
              }
            } else {
              console.error('Invalid response format:', response);
            }
          },
          error => {
            console.error('Error fetching cities:', error);
          }
        );
    } else {
      this.filteredCities = []; // Clear the cities if no state is selected
    }
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

  getAmenities() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/amenities/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.amenities = response.data;
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching amenities:', error);
        }
      );
  }

  onAmenitiesChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);

    this.newProjectList.amenities = selectedOptions;
  }

  removeAmenity(amenity: string): void {
    const index = this.newProjectList.amenities.indexOf(amenity);
    if (index >= 0) {
      this.newProjectList.amenities.splice(index, 1);
    }
  }

  isValidMobileNumber(): boolean {
    return /^\d{10}$/.test(this.newProjectList.mobileNumber);
  }

  clearForm() {
    for (const key in this.newProjectList) {
      if (this.newProjectList.hasOwnProperty(key)) {
        this.newProjectList[key as keyof typeof this.newProjectList] = '';
      }
    }
    this.formSubmitted = false;
  }

  validateForm(): boolean {
    if (!this.newProjectList.projectName ||
      !this.newProjectList.headName ||
      !this.newProjectList.mobileNumber ||
      !this.newProjectList.startDate ||
      !this.newProjectList.status ||
      !this.newProjectList.commissionMethod ||
      !this.newProjectList.commission) {
      return false;
    }

    if (!this.isValidMobileNumber()) {
      return false;
    }

    return true;
  }

  onProjectTypeChange() {
    this.newProjectList.totalBuilding = '';
    this.newProjectList.totalPlot = '';
    this.newProjectList.totalfarmLand = '';
    this.newProjectList.totalrowHouse = '';
  }
}
