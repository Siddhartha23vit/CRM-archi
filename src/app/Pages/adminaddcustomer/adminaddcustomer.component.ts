import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-adminaddcustomer',
  templateUrl: './adminaddcustomer.component.html',
  styleUrls: ['./adminaddcustomer.component.css']
})
export class AdminaddcustomerComponent implements OnInit {

  @ViewChild('photo') photoInput: any; // Reference to the file input element

  ngOnInit() {
    // Subscribe to query parameters to get the project data
    this.route.queryParams.subscribe(params => {
      if (params['customer']) {
        const customerData = JSON.parse(params['customer']);
        this.newCustomer = { ...this.newCustomer, ...customerData };
        // Set update mode to true
        this.isUpdateMode = true;
        this.filterCities();

      }
    });
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
  ]; // Define the states property

  citiesData: any;
  filteredCities: any;
  newCustomer: any = {
    registerDate:'',
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    fatherName: '',
    state: '',
    city: '',
    fullAddress: '',
    profession: '',
    emailId: '',
    dateOfBirth: '',
    anniversary: '',
    gender: '',
    bloodGroup: '',
    panNumber: '',
    photo: null // To store the file
  };
  customerForm: FormGroup;
  selectedFile: File | undefined;
  isUpdateMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private route:ActivatedRoute, private router: Router) {
    this.customerForm = this.formBuilder.group({
      fullName: '',
      mobileNumber: '',
      whatsappNumber: '',
      registerDate: '',
      fatherName: '',
      state: '',
      city: '',
      fullAddress: '',
      profession: '',
      emailId: '',
      dateOfBirth: '',
      anniversary: '',
      gender: '',
      bloodGroup: '',
      panNumber: '',
    });
  }
  
 
    
  loadImage(imageUrl: string) {
    // Load the image using imageUrl
    // For example, you can set the imageUrl to an <img> tag in your HTML template
  }
  

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length) {
      this.selectedFile = files[0];
    }
  }

  onSubmit() {
    // Set registerDate to current date
    this.newCustomer.registerDate = new Date().toISOString();

    const formData = new FormData();
    formData.append("fullName", this.newCustomer.fullName);
    formData.append("mobileNumber", this.newCustomer.mobileNumber);
    formData.append("whatsappNumber", this.newCustomer.whatsappNumber);
    formData.append("registerDate", this.newCustomer.registerDate);
    formData.append("fatherName", this.newCustomer.fatherName);
    formData.append("state", this.newCustomer.state);
    formData.append("city", this.newCustomer.city);
    formData.append("fullAddress", this.newCustomer.fullAddress);
    formData.append("profession", this.newCustomer.profession);
    formData.append("emailId", this.newCustomer.emailId);
    formData.append("dateOfBirth", this.newCustomer.dateOfBirth);
    formData.append("anniversary", this.newCustomer.anniversary);
    formData.append("gender", this.newCustomer.gender);
    formData.append("bloodGroup", this.newCustomer.bloodGroup);
    formData.append("panNumber", this.newCustomer.panNumber);
  
    // Check if selectedFile is defined before appending
    if (this.selectedFile) {
      formData.append("photo", this.selectedFile);
    }

    this.registerCustomer(formData).subscribe(
      response => {
        console.log('Customer registered successfully:', response);
        alert('Customer Details Added Successfully');
      },
      error => {
        console.error('Error registering customer:', error);
      }
    );
  }

  registerCustomer(formData: FormData): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5001/api/customers/register', formData);
  }

  filterCities() {
    // Fetch cities data from backend API based on selected state
    this.http.get<any>('http://127.0.0.1:5001/api/masters/city/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            // Filter cities based on the selected state
            const filteredCities = response.data.filter((city: { state: any; }) => city.state === this.newCustomer.state);
            // Extract IDs of the filtered cities
            this.filteredCities = filteredCities.map((city: { _id: any; city: string }) => ({ id: city._id, city: city.city }));
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching cities:', error);
        }
      );
  }

  deleteProfile() {
    // Clear the selected file from the input field
    this.selectedFile = undefined;
    if (this.photoInput) {
      this.photoInput.nativeElement.value = '';
    }
  }

  
}
