import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-addbooking',
  templateUrl: './admin-addbooking.component.html',
  styleUrls: ['./admin-addbooking.component.css']
})
export class AdminAddbookingComponent implements OnInit {
  newbooking = {
    Date: '',
    visit: '',
    AssociateId: '', // Add this field
    AssociateName: '', 
    Associatecommission: '',
    associatenumber: '',
    UnitType: '',
    project: '',
    Building: '',
    unitNo: '',
    fullName1: '',
    mobileNumber1: '',
    whatsappNumber1: '',
    fatherName1: '',
    fullAddress1: '',
    emailId1: '',
    dateOfBirth1: '',
    relation1: '',
    fullName2: '',
    mobileNumber2: '',
    whatsappNumber2: '',
    fatherName2: '',
    fullAddress2: '',
    emailId2: '',
    dateOfBirth2: '',
    relation2: '',
    RefferalName: '',
    paymentmode: '',
    remark: '',
    ProjectCommission: 0,
    CommissionMethod: 0,
    InclusiveRegistry: '',
    UnitSize: 0,
    Amount: 0,
    MPEBS: 0,
    Maintenance: 0,
    CornerCharges: 0,
    GST: 0,
    ParkingCharge: 0,
    TotalAmount: 0,
    CompanyDiscount: 0,
    OtherDiscount: 0,
    NetTotal: 0,
    TotalPaid: 0,
    DueAmount: 0,
  };

  allProjects: any[] = [];
  filteredProjects: any[] = [];
  filteredBuildings: any[] = [];
  sitevisit: any[] = [];
  associates: any[] = [];
  selectedAssociate: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProjectList();
    this.getsitevisit();
    this.getassociate();
  }

  getProjectList() {
    this.http.get<any>('http://127.0.0.1:5001/api/projectList/get-all-projectlist')
      .subscribe(
        data => {
          this.allProjects = data.projects;
        },
        error => {
          console.error('Error fetching project list:', error);
        }
      );
  }

  onUnitTypeChange() {
    this.filteredProjects = this.allProjects.filter(project => project.projectType === this.newbooking.UnitType);
    this.filteredBuildings = [];
    this.newbooking.project = '';
    this.newbooking.Building = '';
    this.calculateNetTotal(); // Calculate total whenever UnitType changes
  }

  onProjectChange() {
    const selectedProject = this.allProjects.find(project => project.projectName === this.newbooking.project);
    if (selectedProject) {
      this.filteredBuildings = selectedProject.buildingList.slice(-selectedProject.totalBuilding) || [];
    } else {
      this.filteredBuildings = [];
    }
    this.newbooking.Building = '';
  }

  getsitevisit() {
    this.http.get<any>('http://127.0.0.1:5001/api/site-visits/get-siteVisits')
      .subscribe(
        data => {
          this.sitevisit = data;
        },
        error => {
          console.error('Error fetching site visits:', error);
        }
      );
  }

  onAssignTo(event: Event): void {
    const selectedAssociateId = (event.target as HTMLSelectElement)?.value;
  
    if (selectedAssociateId) {
      this.selectedAssociate = this.associates.find(associate => associate._id === selectedAssociateId);
  
      if (this.selectedAssociate) {
        this.newbooking.AssociateId = selectedAssociateId;
        this.newbooking.AssociateName = this.selectedAssociate.fullName;
        this.newbooking.Associatecommission = this.selectedAssociate.commission;
        this.newbooking.associatenumber = this.selectedAssociate.mobileNumber;
      } else {
        console.error('No associate found for ID:', selectedAssociateId); // For debugging
      }
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

  addBooking() {
    console.log('Sending booking data:', this.newbooking); // Add this line for debugging
    this.http.post<any>('http://127.0.0.1:5001/api/bookings/create-booking', this.newbooking)
      .subscribe(
        response => {
          console.log('Booking saved successfully:', response);
          alert('Booking Added Successfully');
        },
        error => {
          console.error('Error saving lead:', error);
        }
      );
  }
 
  calculateNetTotal() {
    if (!this.newbooking) {
      return; // Handle case where newbooking might not be initialized properly
    }

    // Calculate total amount based on individual fields
    this.newbooking.TotalAmount = 
      parseFloat(this.newbooking.Amount.toString()) +
      parseFloat(this.newbooking.MPEBS.toString() || '0') +
      parseFloat(this.newbooking.Maintenance.toString() || '0') +
      parseFloat(this.newbooking.CornerCharges.toString() || '0') +
      parseFloat(this.newbooking.GST.toString() || '0') +
      parseFloat(this.newbooking.ParkingCharge.toString() || '0');

    // Round the TotalAmount to 2 decimal places
    this.newbooking.TotalAmount = parseFloat(this.newbooking.TotalAmount.toFixed(2));
  }

}
