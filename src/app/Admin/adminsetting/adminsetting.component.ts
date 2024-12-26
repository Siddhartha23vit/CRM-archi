import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-adminsetting',
  templateUrl: './adminsetting.component.html',
  styleUrls: ['./adminsetting.component.css']
})
export class AdminsettingComponent {
  Usertype: any[] = [];

  constructor(private http:HttpClient){ }
  ngOnInit(){
    this.getUsertype();
  }
  getUsertype() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/userType/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.Usertype = response.data;

          } else {
            console.log('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching User type:', error);
        }
      );
  }

}
