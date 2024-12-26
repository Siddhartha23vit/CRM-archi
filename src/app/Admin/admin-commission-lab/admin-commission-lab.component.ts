import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-commission-lab',
  templateUrl: './admin-commission-lab.component.html',
  styleUrls: ['./admin-commission-lab.component.css']
})
export class AdminCommissionLabComponent implements OnInit{
  searchdes: string = ''; // Selected designation
  associates: any[] = []; // Array to hold the list of associates
  designations: string[] = []; // Array to hold unique designations

  constructor(private http: HttpClient,private router: Router) {
  }
  ngOnInit(): void {
    this.getassociate()
  };
  getassociate() {
    this.http.get<any>('http://127.0.0.1:5001/api/associates/get-associates')
      .subscribe(
        data => {
          this.associates = data.associates;
          this.populateDesignations(); // Populate designations after fetching associates
        },
        error => {
          console.error('Error fetching associate list:', error);
        }
      );
  }

  searchAss() {
    if (this.searchdes.trim() !== '') {
      this.http.get<any>('http://127.0.0.1:5001/api/associates/get-associates')
        .subscribe(
          data => {
            this.associates = data.associates.filter((ass: any) => {
              return ass.applicantDesignation.toLowerCase() === this.searchdes.toLowerCase();
            });
          },
          error => {
            console.error('Error fetching associate list:', error);
          }
        );
    } else {
      this.getassociate();
    }
  }
  
  
  populateDesignations() {
    const uniqueDesignations = new Set(this.associates.map(ass => ass.applicantDesignation));
    this.designations = Array.from(uniqueDesignations);
  }

}
