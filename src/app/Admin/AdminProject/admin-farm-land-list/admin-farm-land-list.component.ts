import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-farm-land-list',
  templateUrl: './admin-farm-land-list.component.html',
  styleUrls: ['./admin-farm-land-list.component.css']
})
export class AdminFarmLandListComponent {
  projects: any[] = [];
  selectedProject: any;
  FarmLandInputs: any[] = [];
  Farmland:any[]=[]
  FacingSide:any[]=[]


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProjectList();
    this.getfarmland();
    this.getFacing();
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
  getfarmland(){
    this.http.get<any>('http://127.0.0.1:5001/api/masters/farmlandType/get')
  .subscribe(
    response => {
      if (response.success && Array.isArray(response.data)) {
        this.Farmland = response.data;

      } else {
        console.error('Invalid response format:', response);
      }
    },
    error => {
      console.error('Error fetching designations:', error);
    }
  );
}
getFacing() {
  this.http.get<any>('http://127.0.0.1:5001/api/masters/facing/get')
    .subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.FacingSide = response.data;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching facing data:', error);
      }
    );
}
 
  onProjectSelected() {
    if (this.selectedProject) {
      this.FarmLandInputs = this.selectedProject.farmLandList.slice(-this.selectedProject.totalfarmLand) || [];
      this.initializePlotInputs(this.selectedProject.totalfarmLand);
    }
  }
  
  initializePlotInputs(totalfarmLand: number) {
    if (this.FarmLandInputs.length < totalfarmLand) {
      const remainingFarmland = totalfarmLand - this.FarmLandInputs.length;
      const startingIndex = this.FarmLandInputs.length + 1; // Start from the next plot number
      for (let i = 0; i < remainingFarmland; i++) {
        this.FarmLandInputs.push({
          farmLandName: `FarmLand ${startingIndex + i}`,
          farmLandWidth:'00',
          farmLandDepth:'00',
          farmlandtype:'',
          totalSize: '00',
          facing:'',
          FramLandRate: '00',
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

  
  addFarmLandList() {
    const FarmLandInputs = {
      projectId: this.selectedProject._id,
      farmLandData: this.FarmLandInputs
    };
    this.http.post<any>('http://127.0.0.1:5001/api/projectList/create-farmLandList', FarmLandInputs)
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
