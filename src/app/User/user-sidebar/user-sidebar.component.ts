import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  isSideNavOpen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSideNavVisibility();
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  closeSideNav() {
    this.isSideNavOpen = false;
  }

  private updateSideNavVisibility() {
    // Adjust visibility based on window size if needed
    // For example, you can close the side nav on smaller screens
    if (window.innerWidth <= 768) {
      this.isSideNavOpen = false;
    }
  }
  constructor(private router: Router) { }
  navigateToUserDashboard() {
    this.router.navigate(['UserDashboard']);
  }

}
