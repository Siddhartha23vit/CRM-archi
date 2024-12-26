import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-document-type',
  templateUrl: './admin-document-type.component.html',
  styleUrls: ['./admin-document-type.component.css']
})
export class AdminDocumentTypeComponent  implements OnInit{

  newDocument={
    documentType:'',
    documentAlias:'',
    status:false
  };

  Document:any[]=[];
  filteredDocument: any[] = [];
  searchTerm: string = '';
  isUpdating: boolean = false;
  selectedDocuments: any;

  constructor(private http :HttpClient) { }

  ngOnInit(){
    this.getDocument()
  }

//fetching from api
  getDocument(){
    this.http.get<any>('http://127.0.0.1:5001/api/masters/documentType/get')
      .subscribe(
        response => {
          if (response.success && Array.isArray(response.data)) {
            this.Document = response.data;
            this.filteredDocument = response.data;

          } else {
            console.log('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching Document Details:', error);
        }
      );
  }
  checkIfdocumentTypeExists(documentType: string): boolean {
    for (const Document of this.Document) {
      if (Document.documentType.toLowerCase() === documentType &&
    (!this.isUpdating || Document._id !== this.selectedDocuments._id)) {
        return true; // documentType exists
      }
    }
    return false; // documentType does not exist
  }
  //submitting data to api
  submitDocument() {
    if (!this.newDocument.documentType) {
      return; 
    }
    const exists = this.checkIfdocumentTypeExists(this.newDocument.documentType.toLowerCase());
    if (exists) {
      alert('Document with the same name already exists.');
      return; // Prevent form submission
    }
    this.http.post<any>('http://127.0.0.1:5001/api/masters/documentType/create', this.newDocument)
      .subscribe(
        response => {
          console.log('Documents Type added successfully:', response);
          alert('Documents Type Details Added Successfully');
          this.Document.push(response.data); 
          this.clearForm();
          this.getDocument();
        },
        error => {
          console.error('Error Adding Documents Type details', error);
        }
      );
  }
  //updateing data
  updateDocument() {
    if (!this.selectedDocuments || !this.newDocument.documentType ) {
      return;
    }
    const exists = this.checkIfdocumentTypeExists(this.newDocument.documentType.toLowerCase());
    if (exists) {
      alert('Document with the same name already exists.');
      return; // Prevent form submission
    }
    const updatedData = {
      id: this.selectedDocuments._id,
      ...this.newDocument
    };
    this.http.put<any>(`http://127.0.0.1:5001/api/masters/documentType/update`, updatedData)
      .subscribe(
        response => {
          console.log('Doucment Type updated successfully:', response);
          alert('Doucment Type Details Updated Successfully');
          const index = this.Document.findIndex(item => item._id === this.selectedDocuments._id);
          if (index !== -1) {
            this.Document[index] = response.data;
            this.clearForm();
            this.getDocument();
          }
        },
        error => {
          console.error('Error updating Doucment Type:', error);
        }
      );
  }
  
//deleting data
  deletedocument(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this Document Type Details?');
    if (confirmed) {
      this.http.post<any>(`http://127.0.0.1:5001/api/masters/documentType/delete`, { id: id })
        .subscribe(
          response => {
            console.log('Document Type Details deleted successfully:', response);
            this.Document = this.Document.filter(item => item._id !== id);
            alert('Document Type Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Raw House Details:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Document Type Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }
 //refilling input with value to update
 populateFormFields(id: string) {
  const Document = this.Document.find(item => item._id === id);
  if (Document) {
    this.selectedDocuments = Document;
    this.newDocument = { 
      documentType: Document.documentType,
      documentAlias: Document.documentAlias,
      status: Document.status
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
  this.newDocument = {
    documentType: '',
    documentAlias: '',
    status: false
  };
  this.isUpdating = false; 
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  if (submitButton) {
    submitButton.innerText = 'Submit';
  }
}

  //searching data
searchDocument() {
    if (this.searchTerm.trim() === '') {
      this.filteredDocument = this.Document; // Reset to show all designations if search term is empty
    } else {
      this.filteredDocument = this.Document.filter(Document =>
        Document.documentType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        Document.documentAlias.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

}

