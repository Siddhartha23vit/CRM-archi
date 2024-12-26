import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-associate',
  templateUrl: './admin-add-associate.component.html',
  styleUrls: ['./admin-add-associate.component.css']
})
export class AdminAddAssociateComponent {

  
  @ViewChild('photo') photoInput: any; // Reference to the file input element

  isUpdateMode: boolean = false;

  ngOnInit() {
    // Subscribe to query parameters to get the project data
    this.route.queryParams.subscribe(params => {
      if (params['associate']) {
        const associateData = JSON.parse(params['associate']);
        // Update newProjectList with the received project data
        this.newAssociate = { ...this.newAssociate, ...associateData };
        // Set update mode to true
        this.isUpdateMode = true;
        this.filterCities();
        this.getassociate();
      }
    });

    // Call other initialization methods
    this.getDesignations();
    this.getUsertype();
    this.getassociate();
  }

 
  toDate: number = Date.now();
  states: string[] = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];
  newAssociate: any = {
    registerDate: '',
    fullName: '',
    fatherOrHusbandName: '',
    state: '',
    city: '',
    fullAddress: '',
    dateOfBirth: '',
    panNo: '',
    aadhar: '',
    qualification: '',
    mobileNumber: '',
    whatsappNumber: '',
    emailId: '',
    commission: '',
    applicantDesignation: '',
    role: '',
    nomineeName: '',
    nomineeMobileNumber: '',
    relationWithNominee: '',
    sponsorBy: '',
    Sponsorcommission: '',
    sponsorMobile: '',
    sponsorDesignation: '',
    photo: null
  };
  AssociateForm: FormGroup;
  selectedFile: File | undefined;
  designations: any[] = [];
  Usertype: any[] = [];
  associates: any[] = [];
  filteredCities: any[] = [];
 selectedAssociate: any;

  formSubmitted: boolean = false;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.AssociateForm = this.formBuilder.group({
      registerDate: '',
      fullName: '',
      fatherOrHusbandName: '',
      state: '',
      city: '',
      fullAddress: '',
      dateOfBirth: '',
      panNo: '',
      aadhar: '',
      qualification: '',
      mobileNumber: '',
      whatsappNumber: '',
      emailId: '',
      commission: '',
      applicantDesignation: '',
      role: '',
      nomineeName: '',
      nomineeMobileNumber: '',
      relationWithNominee: '',
      sponsorBy: '', // Ensure sponsorBy is properly initialized
      Sponsorcommission: '',
     sponsorMobile: '',
     sponsorDesignation: '',
    });
  }


  filterCities() {
    if (this.newAssociate.state) {
      this.http.get<any>('http://127.0.0.1:5001/api/masters/city/get')
        .subscribe(
          response => {
            if (response.success && Array.isArray(response.data)) {
              const filteredCities = response.data.filter((city: { state: any; }) => city.state === this.newAssociate.state);
              this.filteredCities = filteredCities.map((city: { _id: any; city: string }) => ({ id: city._id, city: city.city }));
              console.log('Filtered cities:', this.filteredCities);

              // Check if the current city is in the filtered list
              const cityMatch = this.filteredCities.find(city => city.city === this.newAssociate.city);
              if (!cityMatch) {
                this.newAssociate.city = ''; // Clear the city if it's not in the filtered list
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
  

  getassociate() {
    this.http.get<any>('http://127.0.0.1:5001/api/associates/get-associates')
      .subscribe(
        data => {
          this.associates = data.associates;
        },
        error => {
          console.error('Error fetching Associate:', error);
        }
      );
  }
  getDesignations() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/designation/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.designations = response.data;
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching designations:', error);
        }
      );
  }
  getUsertype() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/userType/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.Usertype = response.data;

          } else {
            console.log('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching User type:', error);
        }
      );
  }
  onadd() {
    // Set registerDate to current date
    this.newAssociate.registerDate = new Date().toISOString();

    const formData = new FormData();
    formData.append("registerDate", this.newAssociate.registerDate);
    formData.append("fullName", this.newAssociate.fullName);
    formData.append("fatherOrHusbandName", this.newAssociate.fatherOrHusbandName);
    formData.append("state", this.newAssociate.state);
    formData.append("city", this.newAssociate.city);
    formData.append("fullAddress", this.newAssociate.fullAddress);
    formData.append("dateOfBirth", this.newAssociate.dateOfBirth);
    formData.append("panNo", this.newAssociate.panNo);
    formData.append("aadhar", this.newAssociate.aadhar);
    formData.append("qualification", this.newAssociate.qualification);
    formData.append("mobileNumber", this.newAssociate.mobileNumber);
    formData.append("whatsappNumber", this.newAssociate.whatsappNumber);
    formData.append("emailId", this.newAssociate.emailId);
    formData.append("commission", this.newAssociate.commission);
    formData.append("applicantDesignation", this.newAssociate.applicantDesignation);
    formData.append("role", this.newAssociate.role);
    formData.append("nomineeName", this.newAssociate.nomineeName);
    formData.append("nomineeMobileNumber", this.newAssociate.nomineeMobileNumber);
    formData.append("relationWithNominee", this.newAssociate.relationWithNominee);
    formData.append("sponsorBy", this.newAssociate.sponsorBy); // Append sponsorBy to FormData
    formData.append("Sponsorcommission", this.newAssociate.Sponsorcommission);
    formData.append("sponsorMobile", this.newAssociate.sponsorMobile);
    formData.append("sponsorDesignation", this.newAssociate.sponsorDesignation);

    // Check if selectedFile is defined before appending
    if (this.selectedFile) {
      formData.append("photo", this.selectedFile);
    }

    this.registerAssociate(formData).subscribe(
      response => {
        console.log('Associate registered successfully:', response);
        alert('Associate Details Added Successfully');
      },
      error => {
        console.error('Error registering Associate:', error);
      }
    );
  }

  registerAssociate(formData: FormData): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5001/api/associates/create-asociate', formData);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length) {
      const file = files[0];
      const fileType = file.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg') {
        this.selectedFile = file;
      } else {
        alert('Only PNG and JPG files are allowed.');
        this.photoInput.nativeElement.value = '';
      }
    }
  }

  deleteProfile() {
    // Clear the selected file from the input field
    this.selectedFile = undefined;
    if (this.photoInput) {
      this.photoInput.nativeElement.value = '';
    }
  }

  onsubmit() {
    if (this.isUpdateMode) {
      this.updateassociate();
    } else {
      this.onadd();
    }
  }

updateassociate(){
  const associateid = this.newAssociate._id;

    this.http.put<any>(`http://127.0.0.1:5001/api/associates/update-associate?id=${associateid}`, { associate: this.newAssociate })
      .subscribe(
        response => {
          console.log('Associate List updated successfully:', response);
          if (response.error) {
            console.error('Error updating Associate:', response.error);
            alert('Error updating Associate');
          } else {
            alert('Associate updated successfully');
          }
        },
        error => {
          console.error('Error Associate project:', error);
          alert('Error updating Associate: ' + JSON.stringify(error));
        }
      );
}

onAssignTo(event: Event): void {
  const selectedAssociateId = (event.target as HTMLSelectElement)?.value;

  if (selectedAssociateId) {
    this.selectedAssociate = this.associates.find(associate => associate._id === selectedAssociateId);

    if (this.selectedAssociate) {
      this.newAssociate.AssociateId = selectedAssociateId;
      this.newAssociate.sponsorBy = this.selectedAssociate.fullName;
      this.newAssociate.Sponsorcommission = this.selectedAssociate.commission;
      this.newAssociate.sponsorMobile = this.selectedAssociate.mobileNumber;
      this.newAssociate.sponsorDesignation = this.selectedAssociate.applicantDesignation;

    } else {
      console.error('No associate found for ID:', selectedAssociateId); // For debugging
    }
  }
}

}
