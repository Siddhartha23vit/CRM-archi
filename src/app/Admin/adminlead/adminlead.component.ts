import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlead',
  templateUrl: './adminlead.component.html',
  styleUrls: ['./adminlead.component.css']
})
export class AdminleadComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  Leads: any[] = [];
  totalCount: number = 0; // Initialize totalCount as 0
  paginatedProjects: any[] = [];
  itemsPerPage: number | string = 10;
  currentPage: number = 1;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getLeads();
  }

  get totalEntries(): number {
    return this.totalCount;
  }

  getLeads() {
    this.http.get<any>('http://127.0.0.1:5001/api/leads/get-leads')
      .subscribe(
        data => {
          console.log(data); // Add this line to log the data
          this.Leads = data;
          this.totalCount = this.Leads.length;
        },
        error => {
          console.error('Error fetching leads:', error);
        }
      );
  }
  deleteLead(id: string) {
    if (confirm('Are you sure you want to delete this lead?')) {
      this.http.get(`http://127.0.0.1:5001/api/leads/delete-lead?id=${id}`)
        .subscribe(
          () => {
            this.Leads = this.Leads.filter(lead => lead._id !== id);
            this.totalCount = this.Leads.length; 

          },
          error => {
            console.error('Error deleting lead:', error);
          }
        );
    }
  }
  updateLeads(lead: any) {
    this.router.navigate(['/Admin', 'AdminLead', 'AddLead'], { queryParams: { lead: JSON.stringify(lead) } });
  }
}
