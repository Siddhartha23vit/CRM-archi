import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-project-process',
  templateUrl: './admin-project-process.component.html',
  styleUrls: ['./admin-project-process.component.css']
})
export class AdminProjectProcessComponent implements OnInit{

  newproject={
    projectprogressType:'',
    progress:'',
    projectprogressAlias:'',
    status:false
  }
  
  Project:any[]=[];
  filteredProject: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedproject: any;

  constructor(private http:HttpClient) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects(){
    this.http.get<any>('http://127.0.0.1:5001/api/masters/projectProgress/get')
  .subscribe(
    response => {
      if (response.success && Array.isArray(response.data)) {
        this.Project = response.data;
        this.filteredProject = response.data;

      } else {
        console.error('Invalid response format:', response);
      }
    },
    error => {
      console.error('Error fetching designations:', error);
    }
  );
}
checkIfProjectProgressExists(progress: string, projectprogressType: string): boolean {
  for (const progressch of this.Project) {
    if (progressch.progress.toLowerCase() === progress && 
        progressch.projectprogressType.toLowerCase() === projectprogressType &&
        (!this.isUpdating || progressch._id !== this.selectedproject._id)) {
      return true;
    }
  }
  return false;
}

submitProject() {
  if (!this.newproject.projectprogressType || !this.newproject.progress) {
    return; 
  }
  const exists = this.checkIfProjectProgressExists(this.newproject.progress.toLowerCase(), this.newproject.projectprogressType.toLowerCase());
  if (exists) {
    alert('Record Already Exist.');
    return; // Prevent form submission
  }
this.http.post<any>('http://127.0.0.1:5001/api/masters/projectProgress/create', this.newproject)
  .subscribe(
    response => {
      console.log('Project Progress Details added successfully:', response);
      alert('Project Progress Details Added Successfully');
      this.Project.push(response.data);
      this.clearForm();
      this.getProjects();
    },
    error => {
      console.error('Error adding Farm Land  Details:', error);
      alert('Error Adding Project Progress Details');
    }
  );
}
  
//updateing data
updateProject() {
  if (!this.selectedproject || !this.newproject.projectprogressType || !this.newproject.projectprogressType) {
    return;
  }
  const exists = this.checkIfProjectProgressExists(this.newproject.progress.toLowerCase(), this.newproject.projectprogressType.toLowerCase());
  if (exists) {
    alert('Record Already Exist.');
    return; // Prevent form submission
  }
  const updatedData = {
    id: this.selectedproject._id,
    ...this.newproject
  };
  this.http.put<any>(`http://127.0.0.1:5001/api/masters/projectProgress/update`, updatedData)
    .subscribe(
      response => {
        console.log('Project Progress updated successfully:', response);
        alert('Project Progress Details Updated Successfully');
        const index = this.Project.findIndex(item => item._id === this.selectedproject._id);
        if (index !== -1) {
          this.Project[index] = response.data;
          this.clearForm();
          this.getProjects();
        }
      },
      error => {
        console.error('Error updating Project Progress:', error);
      }
    );
}

//deleting data
deleteproject(id: string) {
  const confirmed = window.confirm('Are you sure you want to delete this Project Details?');
  if (confirmed) {
    this.http.post<any>(`http://127.0.0.1:5001/api/masters/projectProgress/delete`, { id: id })
      .subscribe(
        response => {
          console.log('Project Details deleted successfully:', response);
          this.Project = this.Project.filter(item => item._id !== id);
          alert('Project Details Deleted Successfully');
        },
        error => {
          console.error('Error deleting Project Details:', error);
          if (error instanceof HttpErrorResponse) {
            console.error(`Status: ${error.status}, Message: ${error.message}`);
          }
          alert('Error Deleting Project Details');
        }
      );
  } else {
    console.log('Deletion cancelled by user');
  }
}
//refilling input with value to update
populateFormFields(id: string) {
  const Project = this.Project.find(item => item._id === id);
  if (Project) {
    this.selectedproject = Project;
    this.newproject = { 
      projectprogressType: Project.projectprogressType,
      progress: Project.progress,
      projectprogressAlias:Project.projectprogressAlias,
      status: Project.status
    };
    this.isUpdating = true;
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    if (submitButton) {
      submitButton.innerText = 'Update';
    }
  } else {
    console.error('Designation not found for id:', id);
  }
}

//refilling inputs with  empty values when added/updated
clearForm() {
  this.newproject = {
    projectprogressType: '',
    progress: '',
    projectprogressAlias:'',
    status: false
  };
  this.isUpdating = false; 
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  if (submitButton) {
    submitButton.innerText = 'Submit';
  }
}

//searching data
searchProject() {
  if (this.searchTerm.trim() === '') {
    this.filteredProject = this.Project; // Reset to show all designations if search term is empty
  } else {
    this.filteredProject = this.Project.filter(Project =>
      Project.projectprogressType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      Project.progress.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      Project.projectprogressAlias.toLowerCase().includes(this.searchTerm.toLowerCase())

    );
  }
}
 
}
