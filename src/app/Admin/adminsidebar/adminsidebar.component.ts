import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminsidebar',
  templateUrl:'./adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminsidebarComponent { 
  
  opened: boolean = true;
  toggleLeadsDropdown = false; 
  toggleAcciocateDropdown = false;
  toggleAssPaymentDropdown = false;
  toggleSettingDropdown =false;
  selectedColor: string = 'dark'; // Default color

  toggleColor(color: string) {
    this.selectedColor = color;
  }
  constructor(private router: Router) { }

  navigateToAdminDashboard() {
    this.router.navigate(['AdminDashboard']);
  }

  navigateToAdminAttendance() {
    this.router.navigate(['Attendance']);
  }

  navigateToAdminLicense() {
    this.router.navigate(['AdminLicense']);
  }
  
  navigateToAdminGeneralMaster() {
    this.router.navigate(['AdminGeneralMaster']);
  }

  navigateToAdminCustomer() {
    this.router.navigate(['AdminGeneralMaster']);
  }
  
  navigateToAdminLead() {
    this.router.navigate(['AdminLead']);
  }
  
  navigateToAdminReport() {
    this.router.navigate(['AdminReport']);
  }

  navigateToAdminSetting() {
    this.router.navigate(['AdminSetting']);
  }
  
  navigateToAdminSiteVisit() {
    this.router.navigate(['AdminSiteVisit']);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
