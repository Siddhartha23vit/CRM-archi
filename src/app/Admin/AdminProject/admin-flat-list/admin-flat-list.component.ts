import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Building {
  _id: string;
  buildingName: string;
  buildingFloor: number;
}

interface Project {
  _id: string;
  projectName: string;
  totalBuilding: number;
  buildingList: Building[];
}
@Component({
  selector: 'app-admin-flat-list',
  templateUrl: './admin-flat-list.component.html',
  styleUrls: ['./admin-flat-list.component.css']
})
export class AdminFlatListComponent implements OnInit {
  projects: Project[] = [];
  selectedProjectId: string = '';
  selectedBuildingId: string = '';
  buildingInputs: Building[] = [];
  floorInputs: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProjectList();
  }

  getProjectList() {
    this.http.get<{ projects: Project[] }>('http://127.0.0.1:5001/api/projectList/get-all-projectlist')
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
    const selectedProject = this.projects.find(p => p._id === this.selectedProjectId);

    if (selectedProject && Array.isArray(selectedProject.buildingList)) {
      this.buildingInputs = selectedProject.buildingList.slice(-selectedProject.totalBuilding);
    } else {
      this.buildingInputs = [];
    }
    this.selectedBuildingId = '';
    this.floorInputs = [];
  }

  onBuildingSelected() {
    const selectedBuilding = this.buildingInputs.find(b => b._id === this.selectedBuildingId);

    if (selectedBuilding) {
      // this.initializeFloorInputs(selectedBuilding.buildingFloor);
    } else {
      this.floorInputs = [];
    }
  }

}
