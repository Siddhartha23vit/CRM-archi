import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-project-demand',
  templateUrl: './admin-project-demand.component.html',
  styleUrls: ['./admin-project-demand.component.css']
})
export class AdminProjectDemandComponent implements OnInit {
  @ViewChild('myModal') modal!: ElementRef;

  projects: any[] = [];
  filteredProjects: any[] = [];
  filteredUnits: any[] = [];
  selectedProjectType: string = 'All';
  selectedUnit: string = '';
  selectedStatus: string = '';
  Project: any[] = [];
  ProjectDemandGet: any[] = [];


  newprojectdemand={
    date:'',
    progressName:'',
    building:'',
    demand:'',
    description:''
  }
  ProjectDemand: any[]=[]

  constructor(private http: HttpClient, private router: Router,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getProjectList();
    this.getProjects();
    this.getprojectdemand();
    
  }
     
  openModal() {
    this.renderer.addClass(this.modal.nativeElement, 'show');
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
  }

  closeModal() {
    this.renderer.removeClass(this.modal.nativeElement, 'show');
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
  }

  getProjectList() {
    this.http.get<any>('http://127.0.0.1:5001/api/projectList/get-all-projectlist')
      .subscribe(
        data => {
          this.projects = data.projects;
          this.filterProjects(); // Apply the filter initially
          this.filterUnits(); // Apply the unit filter initially
        },
        error => {
          console.error('Error fetching project list:', error);
        }
      );
  }
  getProjects(){
    this.http.get<any>('http://127.0.0.1:5001/api/masters/projectProgress/get')
  .subscribe(
    response => {
      if (response.success && Array.isArray(response.data)) {
        this.Project = response.data;

      } else {
        console.error('Invalid response format:', response);
      }
    },
    error => {
      console.error('Error fetching designations:', error);
    }
  );
}
  filterProjects(): void {
    let filtered = this.projects;

    if (this.selectedProjectType !== 'All') {
      filtered = filtered.filter(
        project => project.projectType === this.selectedProjectType
      );
    }

    if (this.selectedUnit) {
      filtered = filtered.filter(
        project => project._id === this.selectedUnit
      );
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(
        project => project.status === this.selectedStatus
      );
    }

    this.filteredProjects = filtered;
  }

  filterUnits(): void {
    if (this.selectedProjectType === 'All') {
      this.filteredUnits = this.projects;
    } else {
      this.filteredUnits = this.projects.filter(
        project => project.projectType === this.selectedProjectType
      );
    }
  }

  onSearch(): void {
    this.filterProjects();
  }

  onProjectTypeChange(): void {
    this.selectedUnit = ''; // Reset the selected unit when project type changes
    this.filterUnits(); // Filter units based on the new project type
  }


  addprojectDemand() {
    this.http.post<any>('http://127.0.0.1:5001/api/project-demand/create-project-demand', this.newprojectdemand)
      .subscribe(
        response => {
          console.log('Project Demand Details added successfully:', response);
          alert('Project Demand Details Added Successfully');
          this.ProjectDemand.push(response.data);
        },
        error => {
          console.error('Error adding Project Demand Details:', error);
          alert('Error Adding Project Demand Details');
        }
      );
  }


  
  getprojectdemand() {
    this.http.get<any>('http://127.0.0.1:5001/api/project-demand/get-project-demand')
      .subscribe(
        data => {
          this.ProjectDemandGet = data;
        },
        error => {
          console.error('Error fetching project list:', error);
        }
      );
  }

  deleteprojectdemand(id: string) {
    if (confirm('Are you sure you want to delete this Project Demand?')) {
      this.http.get(`http://127.0.0.1:5001/api/project-demand/delete-project-demand?id=${id}`)
        .subscribe(
          () => {
            this.ProjectDemandGet = this.ProjectDemandGet.filter(ProjectDemandGet => ProjectDemandGet._id !== id);

          },
          error => {
            console.error('Error deleting lead:', error);
          }
        );
    }
  }
}