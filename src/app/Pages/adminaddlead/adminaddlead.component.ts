import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adminaddlead',
  templateUrl: './adminaddlead.component.html',
  styleUrls: ['./adminaddlead.component.css']
})
export class AdminaddleadComponent implements OnInit {
  @ViewChild('photo') photoInput: any; // Reference to the file input element

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
    registerDate: '',
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

  // Lead add
  projects: any[] = [];
  selectedProject: any;
  Lead: any[] = [];
  customers: any[] = [];
  selectedCustomer: any;
  selectedAssociate: any;
  combinedTypes: any[] = [];
  Inquiry: any[] = [];
  associates: any[] = [];

  newLead: any = {
    sourceOfLeads: '',
    leadName: '',
    projects: '',
    intrestedIn: null, // Change this to null or empty object
    budgetUpto: '',
    AssignTo: '',
    leadRemark: '',
    visitInquiryStatus: '',
    visitPlanDate: '',
    visitFollowupRemark: '',
    referenceName: '',
    referencePhone: '',
  };
  
  
  isUpdateMode: boolean = false;
  @ViewChild('myModal') modal!: ElementRef;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private renderer: Renderer2, private formBuilder: FormBuilder) {
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

  openModal() {
    this.renderer.addClass(this.modal.nativeElement, 'show');
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
  }

  closeModal() {
    this.renderer.removeClass(this.modal.nativeElement, 'show');
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['lead']) {
        const leadData = JSON.parse(params['lead']);
        this.newLead = { ...this.newLead, ...leadData };
        this.isUpdateMode = true;
        this.getLead();
        this.getProjectList();
        this.getCustomer();
        this.getassociate();
        this.getInquiry();
        this.getAllTypes();
            }
    });

    // Fetch necessary data on component initialization
    this.getLead();
    this.getProjectList();
    this.getCustomer();
    this.getassociate();
    this.getInquiry();
    this.getAllTypes();
  }

  populateForm() {
    this.customerForm.patchValue({
      // Patch form values with existing lead data
      fullName: this.newLead.fullName,
      mobileNumber: this.newLead.mobileNumber,
      whatsappNumber: this.newLead.whatsappNumber,
      // Populate other fields similarly...
    });
  }
  

  getAllTypes() {
    this.getFlat();
    this.getRawhouse();
    this.getfarmland();
  }

  getProjectList() {
    this.http.get<any>('http://127.0.0.1:5001/api/projectList/get-all-projectlist')
      .subscribe(
        data => {
          this.projects = data.projects;
        },
        error => {
          console.error('Error fetching project list:', error);
        }
      );
  }

  getLead() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/leadSource/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.Lead = response.data;
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching designations:', error);
        }
      );
  }

  getCustomer() {
    this.http.get<any>('http://127.0.0.1:5001/api/customers/getallcustomers')
      .subscribe(
        data => {
          this.customers = data.customers;
        },
        error => {
          console.error('Error fetching customers:', error);
        }
      );
  }

  onLeadSelect(customer: any) {
    this.selectedAssociate = customer;
  }

  onAssignTo(associate: any) {
    this.selectedAssociate = associate;
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

  getTypeLabel(type: any): string {
    switch (type.type) {
      case 'flat':
        return type.flatType;
      case 'rowhouse':
        return type.rowhouseType;
      case 'farmland':
        return type.farmlandType;
      default:
        return 'Unknown Type'; // Default return value in case none of the conditions match
    }
  }

  getFlat() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/flatType/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.combinedTypes.push(...response.data.map((type: any) => ({ ...type, type: 'flat' })));
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching flat types:', error);
        }
      );
  }

  getRawhouse() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/rowhouseType/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.combinedTypes.push(...response.data.map((type: any) => ({ ...type, type: 'rowhouse' })));
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching rowhouse types:', error);
        }
      );
  }

  getfarmland() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/farmlandType/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.combinedTypes.push(...response.data.map((type: any) => ({ ...type, type: 'farmland' })));
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching farmland types:', error);
        }
      );
  }

  getInquiry() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/inquiryStatus/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.Inquiry = response.data;
          } else {
            console.log('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching inquiry statuses:', error);
        }
      );
  }

  onSubmitLead() {
    if (this.isUpdateMode) {
      this.updateLead();
    } else {
      this.addLead();
    }
  }

  addLead() {
    this.http.post<any>('http://127.0.0.1:5001/api/leads/create-leads', this.newLead)
      .subscribe(
        response => {
          console.log('Lead saved successfully:', response);
          alert('Lead Added Successfully');
        },
        error => {
          console.error('Error saving lead:', error);
        }
      );
  }

  updateLead() {
    this.http.put<any>('http://127.0.0.1:5001/api/leads/update-leads', this.newLead)
      .subscribe(
        response => {
          console.log('Lead updated successfully:', response);
          alert('Lead Updated Successfully');
        },
        error => {
          console.error('Error updating lead:', error);
        }
      );
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
