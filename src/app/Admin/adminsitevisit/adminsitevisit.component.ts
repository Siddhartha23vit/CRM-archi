import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminsitevisit',
  templateUrl: './adminsitevisit.component.html',
  styleUrls: ['./adminsitevisit.component.css']
})
export class AdminsitevisitComponent {
  sitevisit: any[] = [];
  totalCount: number = 0; // Initialize totalCount as 0

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.getsitevisit(); 
  }

  get totalEntries(): number {
    return this.totalCount;
  }

  

  getsitevisit() {
    this.http.get<any>('http://127.0.0.1:5001/api/site-visits/get-siteVisits')
      .subscribe(
        data => {
          this.sitevisit = data;
        },
        error => {
          console.error('Error fetching project list:', error);
        }
      );
  }
  deletesitevisit(id: string) {
    if (confirm('Are you sure you want to delete this Site Visit?')) {
      this.http.get(`http://127.0.0.1:5001/api/site-visits/delete-siteVisit?id=${id}`)
        .subscribe(
          () => {
            this.sitevisit = this.sitevisit.filter(sitevisit => sitevisit._id !== id);
            this.totalCount = this.sitevisit.length; 

          },
          error => {
            console.error('Error deleting lead:', error);
          }
        );
    }
  }

}
