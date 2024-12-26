import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css']
})
export class AdminBookingComponent implements OnInit{
  Bookings: any[] = [];
  totalcount:number=0

  ngOnInit(): void {
    this.getbookings()
  }
  constructor(private http: HttpClient, private router: Router) {}

  get totalEntries(): number {
    return this.totalcount;
  }
  getbookings(){
      this.http.get<any>('http://127.0.0.1:5001/api/bookings/get-booking')
        .subscribe(
          data => {
            this.Bookings = data;
            this.totalcount = this.Bookings.length;
          },
          error => {
            console.error('Error fetching leads:', error);
          }
        );
    }
    deletebooking(id: string) {
      if (confirm('Are you sure you want to delete this Booking?')) {
        this.http.get(`http://127.0.0.1:5001/api/bookings/delete-booking?id=${id}`)
          .subscribe(
            () => {
              this.Bookings = this.Bookings.filter(Bookings => Bookings._id !== id);
  
            },
            error => {
              console.error('Error deleting lead:', error);
            }
          );
      }
    }

}
