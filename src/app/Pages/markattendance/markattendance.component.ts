import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.css']
})
export class MarkattendanceComponent  implements OnInit {
  projects:any[]=[]
  associates:any[]=[]
  newmarkattendance: any = {
    Date:'',
    Name:'',
    status:'',
    Project:'',
    Remark:'',

  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProjectList();
    this.getassociate();
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
  
  getassociate() {
    this.http.get<any>('http://127.0.0.1:5001/api/associates/get-associates')
      .subscribe(
        data => {
          this.associates = data.associates;
        },
        error => {
          console.error('Error fetching Associates:', error);
        }
      );
  }
  addattendance() {
    this.http.post<any>('http://127.0.0.1:5001/api/markattendance/create-markattendance', this.newmarkattendance)
      .subscribe(
        response => {
          alert('Attendance Added Successfully');
        },
        error => {
          console.error('Error saving Attendance:', error);
        }
      );
  }
}
