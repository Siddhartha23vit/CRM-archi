import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-building-list',
  templateUrl: './admin-building-list.component.html',
  styleUrls: ['./admin-building-list.component.css']
})
export class AdminBuildingListComponent implements OnInit {
  projects: any[] = [];
  amenities:any[]=[];
  selectedProject: any;
  buildingInputs: any[] = [];
  filteredAmenities: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProjectList();
    this.getAmenities();
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
  getAmenities() {
    this.http.get<any>('http://127.0.0.1:5001/api/masters/amenities/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.amenities = response.data;
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching amenities:', error);
        }
      );
  }
  onProjectSelected() {
    if (this.selectedProject) {
      this.buildingInputs = this.selectedProject.buildingList.slice(-this.selectedProject.totalBuilding) || [];
      this.initializeBuildingsInputs(this.selectedProject.totalBuilding);
    }
  }

  initializeBuildingsInputs(totalBuilding: number) {
    if (this.buildingInputs.length < totalBuilding) {
      const remainingbuilding = totalBuilding - this.buildingInputs.length;
      const startingIndex = this.buildingInputs.length + 1; // Start from the next plot number
      for (let i = 0; i < remainingbuilding; i++) {
        this.buildingInputs.push({
          buildingName: `Building ${startingIndex + i}`,
          buildingFloor:'0',
          buildingflat:'0',
          buildingStatus:'',
          buildingStartDate:'',
          buildingCompletionDate: '',
          amenities:'',
          remark: '',
        });
      }
    }
  }

  addBuildingList() {
    const buildingInputs = {
      projectId: this.selectedProject._id,
      buildingData: this.buildingInputs
    };
    this.http.post<any>('http://127.0.0.1:5001/api/projectList/create-buildinglist', buildingInputs)
    .subscribe(
      response => {
        console.log('Data posted successfully:', response);
        this.onProjectSelected(); // Refresh the plot list

      },
      error => {
        console.error('Error posting data:', error);
      }
    );
}
}
