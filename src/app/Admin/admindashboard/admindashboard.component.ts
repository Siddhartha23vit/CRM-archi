import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  // Stats
  associateEntries: number = 0;
  customerEntries: number = 0;
  projectEntries: number = 0;
  leadentries: number = 0;
  sitevisitentries: number = 0;
  bookingentries: number = 0;
  revenueAmount: string = '0';
  
  // Date
  currentDate: Date = new Date();

  // Chart data
  chartData: any = {
    labels: [],
    datasets: []
  };

  // Recent activities
  recentActivities: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.startAutoRefresh();
  }

  loadDashboardData() {
    // Load Associates
    this.http.get<any>('http://127.0.0.1:5001/api/associates/get').subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.associateEntries = response.data.length;
        }
      },
      error => console.error('Error fetching associates:', error)
    );

    // Load Customers
    this.http.get<any>('http://127.0.0.1:5001/api/customers/get').subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.customerEntries = response.data.length;
        }
      },
      error => console.error('Error fetching customers:', error)
    );

    // Load Projects
    this.http.get<any>('http://127.0.0.1:5001/api/projects/get').subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.projectEntries = response.data.length;
        }
      },
      error => console.error('Error fetching projects:', error)
    );

    // Load Leads
    this.http.get<any>('http://127.0.0.1:5001/api/leads/get').subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.leadentries = response.data.length;
        }
      },
      error => console.error('Error fetching leads:', error)
    );

    // Load Site Visits
    this.http.get<any>('http://127.0.0.1:5001/api/sitevisit/get').subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.sitevisitentries = response.data.length;
        }
      },
      error => console.error('Error fetching site visits:', error)
    );

    // Load Bookings
    this.http.get<any>('http://127.0.0.1:5001/api/booking/get').subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.bookingentries = response.data.length;
        }
      },
      error => console.error('Error fetching bookings:', error)
    );

    // Calculate mock revenue (for demonstration)
    this.calculateMockRevenue();
  }

  startAutoRefresh() {
    // Refresh dashboard data every 5 minutes
    setInterval(() => {
      this.loadDashboardData();
    }, 300000);
  }

  calculateMockRevenue() {
    // Mock revenue calculation based on bookings
    const averageBookingValue = 1500000; // ₹15 lakhs average booking value
    this.revenueAmount = (this.bookingentries * averageBookingValue).toLocaleString('en-IN');
  }

  // Format currency for display
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }
}
