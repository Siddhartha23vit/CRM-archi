import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-raw-house-list',
  templateUrl: './admin-raw-house-list.component.html',
  styleUrls: ['./admin-raw-house-list.component.css']
})
export class AdminRawHouseListComponent implements OnInit {
  projects: any[] = [];
  selectedProject: any;
  rowhouseinputs: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProjectList();
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
  onProjectSelected() {
    if (this.selectedProject) {
      this.rowhouseinputs = this.selectedProject.rowHouseList.slice(-this.selectedProject.totalrowHouse) || [];
      this.initializeRowhouseInputs(this.selectedProject.totalrowHouse);
    }
  }
  initializeRowhouseInputs(totalrowHouse: number) {
    if (this.rowhouseinputs.length < totalrowHouse) {
      const remainingRowhouse = totalrowHouse - this.rowhouseinputs.length;
      for (let i = 0; i < remainingRowhouse; i++) {
        this.rowhouseinputs.push({
          rowHouseName: '00',
          rowHouseWidth:'00',
          rowHouseDepth:'00',
          type:'',
          totalSize: '00',
          facing: '',
          rate: '00',
          plcCharge: '00',
          amount: '00',
          guideLineValue:'00',
          inventoryType:'',
          status:'',
          remark:'',
        });
      }
    }
  }

  addRawHouseList() {
    const rowhouseinputs = {
      projectId: this.selectedProject._id,
    };
    this.http.post<any>('http://127.0.0.1:5001/api/projectList/create-rowHouselist', rowhouseinputs)
    .subscribe(
      response => {
        console.log('Data posted successfully:', response);
        this.onProjectSelected(); // Refresh the Rowhouse list
      },
      error => {
        console.error('Error posting data:', error);
      }
    );
}


}
