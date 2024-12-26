import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, AlignmentType } from 'docx';



interface Project {
[x: string]: string;
  city: string;
  state: string;
  projectType: string;
  status: string;
}

interface Project {
  projectType: string;
  reraNumber:string;
  projectName:string;
  companyName:string;
  guideLineValue:string;
  headName:string;
  mobileNumber:string;
  startDate:string;
  completionDate:string;
  state:string;
  city:string;
  address:string;
  amenities:string;
  totalBuilding:string;
  totalPlot:string;
  totalfarmLand:string;
  totalrowHouse:string;
  bank:string;
  bankAddress:string;
  accountNumber:string;
  ifscCode:string;
  commissionMethod:string;
  commission:string;
  status:string;
}

@Component({
  selector: 'app-admin-project-list',
  templateUrl: './admin-project-list.component.html',
  styleUrls: ['./admin-project-list.component.css']
})
export class AdminProjectListComponent  implements OnInit {
[x: string]: any;
  projects: any[] = [];
  filteredProjects: Project[] = [];
  searchCity: string = ''; 
  searchState: string = ''; 
  searchType: string = ''; 
  searchStatus: string = ''; 
  paginatedProjects: Project[] = [];
  itemsPerPage: number | string = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  totalCount: number = 0; // Initialize totalCount as 0


  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.getProjectList();
  }

  copyProjects() {
    const projectDetails = this.projects.map(project => {
      return `
        Project Type: ${project.projectType}
        Project Name: ${project.projectName}
        Company Name: ${project.companyName}
        RERA Number: ${project.reraNumber}
        Guide Line Value: ${project.guideLineValue}
        Contact Person: ${project.headName}
        Mobile: ${project.mobileNumber}
        Start Date: ${project.startDate}
        Completion Date: ${project.completionDate}
        State: ${project.state}
        City: ${project.city}
        Address: ${project.address}
        Amenities: ${project.amenities}
        Total Building: ${project.totalBuilding}
        Total Plot: ${project.totalPlot}
        Total Farm Land: ${project.totalfarmLand}
        Total Row House: ${project.totalrowHouse}
        Bank Name: ${project.bank}
        Bank Address: ${project.bankAddress}
        Account Number: ${project.accountNumber}
        IFSC Code: ${project.ifscCode}
        Commission Method: ${project.commissionMethod}
        Commission: ${project.commission}
        Status: ${project.status}
      `;
    }).join('\n\n');

    const textarea = document.createElement('textarea');
    textarea.value = projectDetails;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Project details copied to clipboard!');
  }

  generatePDF() {
    const doc = new jsPDF('p', 'mm', 'a3');
    const pageWidth = doc.internal.pageSize.getWidth();
  
    const columns = [
      { title: 'Project Type', dataKey: 'projectType' },
      { title: 'Project Description', dataKey: 'projectDescription' },
      { title: 'Address', dataKey: 'address' },
      { title: 'Amenities', dataKey: 'amenities' },
      { title: 'Particular', dataKey: 'particular' },
      { title: 'Bank Detail', dataKey: 'bankDetail' },
      { title: 'Commission', dataKey: 'commission' },
      { title: 'Status', dataKey: 'status' }
    ];
  
    const rows = this.projects.map(project => {
  
      return {
        projectType: project.projectType,
        projectDescription: `
          RERA No: ${project.reraNumber ? project.reraNumber.join(', ') : 'N/A'}
          Name: ${project.projectName}
          GuideLineValue:${project.guideLineValue }
          Company Name: ${project.companyName}
          Contact Person: ${project.headName}
          Mobile: ${project.mobileNumber}
          Start Date: ${project.startDate}
          Complete Date: ${project.completionDate  ? project.completionDate.join(', ') : 'N/A'}
        `,
        address: `
          State: ${project.state}
          City: ${project.city}
        Address: ${project.address.replace(/, /g, ',\n')}
        `,
        amenities: project.amenities ? project.amenities.join(', ') : 'N/A', // Convert amenities array to string if it's an array
        particular: `Total Buildings: ${project.totalBuilding}
          Total Plot: ${project.totalPlot}
          Total Farm Land: ${project.totalfarmLand}
          Total Row House: ${project.totalrowHouse}`,
        bankDetail: `
          Bank: ${project.bank }
          Bank Address: ${project.bankAddress}
          Account Number: ${project.accountNumber}
          IFSC code: ${project.ifscCode}
        `,
        commission: `
          Commission Method: ${project.commissionMethod}
          Commission: ${project.commission}
        `,
        status: project.status
      };
    });
  
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak',
        halign: 'left',
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { cellWidth: 40 },
        7: { cellWidth: 30 }
      },
      margin: { top: 20 },
      didDrawPage: (data) => {
        doc.setFontSize(14);
        doc.text('Projects Report', pageWidth / 2, 10, { align: 'center' });
      }
    });
  
    doc.save('Project List.pdf');
  }

  downloadWordFile() {
    const rows = this.projects.map(project => new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ text: project.projectType, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({
          text: `RERA No: ${project.reraNumber}\nName: ${project.headName}\nGuideLine Value: ${project.guideLineValue}\nCompany Name: ${project.companyName}\nContact Person: ${project.headName}\nMobile: ${project.mobileNumber}\nStart Date: ${project.startDate}\nCompletion Date: ${project.completionDate}`,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({
          text: `State: ${project.state}\nCity: ${project.city}\nAddress: ${project.address}`,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({ text: project.amenities, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({
          text: `Total Buildings: ${project.totalBuilding}\nTotal Plot: ${project.totalPlot}\nTotal Farm Land: ${project.totalfarmLand}\nTotal Row House: ${project.totalrowHouse}`,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({
          text: `Bank: ${project.bank}\nBank Address: ${project.bankAddress}\nAccount Number: ${project.accountNumber}\nIFSC Code: ${project.ifscCode}`,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({
          text: `Commission Method: ${project.commissionMethod}\nCommission: ${project.commission}`,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({ text: project.status, alignment: AlignmentType.CENTER })] }),
      ],
    }));

    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Project Type", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Project Description", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Address", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Amenities", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Particular", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Bank Detail", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Commission", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Status", alignment: AlignmentType.CENTER })] }),
          ],
        }),
        ...rows
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    });

    const doc = new Document({
      sections: [{
        children: [table],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'ProjectList.docx');
    });
  }


  generateExcelFile() {
    const worksheetData = this.projects.map(project => ({
      'Project Type': project.projectType,
      'Project Description': `RERA No: ${project.reraNumber}\nName: ${project.headName}\nGuideLine Value: ${project.guideLineValue}\nCompany Name: ${project.companyName}\nContact Person: ${project.headName}\nMobile: ${project.mobileNumber}\nStart Date: ${project.startDate}\nCompletion Date: ${project.completionDate}`,
      'Address': `State: ${project.state}\nCity: ${project.city}\nAddress: ${project.address}`,
      'Amenities': project.amenities,
      'Particular': `Total Buildings: ${project.totalBuilding}\nTotal Plot: ${project.totalPlot}\nTotal Farm Land: ${project.totalfarmLand}\nTotal Row House: ${project.totalrowHouse}`,
      'Bank Detail': `Bank: ${project.bank}\nBank Address: ${project.bankAddress}\nAccount Number: ${project.accountNumber}\nIFSC Code: ${project.ifscCode}`,
      'Commission': `Commission Method: ${project.commissionMethod}\nCommission: ${project.commission}`,
      'Status': project.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');

    XLSX.writeFile(workbook, 'ProjectList.xlsx');
  }

  get totalEntries(): number {
    return this.totalCount;
  }
  
  getProjectList() {
    this.http.get<any>('http://127.0.0.1:5001/api/projectList/get-all-projectlist')
      .subscribe(
        data => {
          this.projects = data.projects;
          this.totalCount = this.projects.length;
          this.paginateProjects();
        },
        error => {
          console.error('Error fetching project list:', error);
        }
      );
  }
  onItemsPerPageChange(): void {
    if (this.itemsPerPage === 'all') {
      this.itemsPerPage = this.projects.length;
    } else {
      this.itemsPerPage = Number(this.itemsPerPage);
    }
    this.changePage(1); // Reset to the first page
  }

  paginateProjects(): void {
    const startIndex = (this.currentPage - 1) * Number(this.itemsPerPage);
    const endIndex = startIndex + Number(this.itemsPerPage);
    this.paginatedProjects = this.projects.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.projects.length / Number(this.itemsPerPage));
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginateProjects();
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  deleteProjectList(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete Project List Details?');
    if (confirmed) {
      this.http.delete<any>(`http://127.0.0.1:5001/api/projectList/delete-projectlist?projectListId=${id}`)
        .subscribe(
          response => {
            console.log('Project List Details deleted successfully:', response);
            this.projects = this.projects.filter(item => item._id !== id);
            this.paginateProjects();
            alert('Project List Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Project List:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Project List Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }
  
  searchProject() {
    // Fetch projects only if at least one search criteria is provided
    if (this.searchCity.trim() !== '' || this.searchState.trim() !== '' || this.searchType.trim() !== '' || this.searchStatus.trim() !== '') {
      this.http.get<any>('http://127.0.0.1:5001/api/projectList/get-all-projectlist')
        .subscribe(
          data => {
            this.projects = data.projects.filter((project: Project) => {
              let cityMatch = true;
              let stateMatch = true;
              let typeMatch = true;
              let statusMatch = true;

              if (this.searchCity.trim() !== '') {
                cityMatch = project.city.toLowerCase().includes(this.searchCity.toLowerCase());
              }
              if (this.searchState.trim() !== '') {
                stateMatch = project.state.toLowerCase().includes(this.searchState.toLowerCase());
              }
              if (this.searchType.trim() !== '') {
                typeMatch = project.projectType.toLowerCase().includes(this.searchType.toLowerCase());
              }
              if (this.searchStatus.trim() !== '') {
                statusMatch = project.status.toLowerCase().includes(this.searchStatus.toLowerCase());
              }

              return cityMatch && stateMatch && typeMatch && statusMatch;
            });
            this.paginateProjects();

          },
          error => {
            console.error('Error fetching project list:', error);
          }
        );
    } else {
      this.getProjectList();
    }
  }

updateProject(project: any) {
    this.router.navigate(['/Admin', 'AdminProjectList', 'AddProject'], { queryParams: { project: JSON.stringify(project) } });
  }

}


