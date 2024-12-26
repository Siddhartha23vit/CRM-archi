import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, AlignmentType } from 'docx';



@Component({
  selector: 'app-admin-associate',
  templateUrl: './admin-associate.component.html',
  styleUrls: ['./admin-associate.component.css']
})
export class AdminAssociateComponent implements OnInit {
  @Input() associate: { password: string } | undefined;
  associates: any[] = [];
  passwordVisibility: { [key: string]: boolean } = {};
  totalCount: number = 0; // Initialize totalCount as 0


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getassociate();
  }

  copyAssociate() {
    const associateDetails = this.associates.map(associate => {
      return `
        UniqueId: ${associate.uniqueId}
        Role: ${associate.role}
        Full Name: ${associate.fullName}
        Mobile Number: ${associate.mobileNumber}
        Whatsapp Number: ${associate.whatsappNumber}
        Email Id: ${associate.emailId}
        Application Designation: ${associate.applicantDesignation}
        DOB: ${associate.dateOfBirth}
        Pan Number: ${associate.panNo}
        Aadhar Number: ${associate.aadhar}
        Register Date: ${associate.registerDate}
        Father/Husband: ${associate.fatherOrHusbandName}
        Commission: ${associate.commission}
        Sponsor By: ${associate.sponsorBy}
        Applicant Designation: ${associate.applicantDesignation}
        State: ${associate.state}
        City: ${associate.city}
        Address: ${associate.fullAddress}
        Password: ********
        Nominee Name: ${associate.nomineeName}
        Relation Nominee: ${associate.relationWithNominee}
        Nominee Mobile Number: ${associate.nomineeMobileNumber}
     
      `;
    }).join('\n\n');

    const textarea = document.createElement('textarea');
    textarea.value = associateDetails;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Associate details copied to clipboard!');
  }

  
  generatePDF() {
    const doc = new jsPDF('p', 'mm', 'a3');
    const pageWidth = doc.internal.pageSize.getWidth();
  
    const columns = [
      { title: 'Card', dataKey: 'cardtype' },
      { title: 'Register Date	', dataKey: 'RegisterDate' },
      { title: 'Father/Husband Name	', dataKey: 'FatherorHusbandName' },
      { title: '%', dataKey: 'per' },
      { title: 'Sponsor By', dataKey: 'SponsorBy' },
      { title: 'Sponsor Designation', dataKey: 'SponsorDesignation' },
      { title: 'Address', dataKey: 'Address' },
      { title: 'Password', dataKey: 'Password' },
      { title: 'Nominee Name', dataKey: 'NomineeName' },
      { title: 'Nominee Relation', dataKey: 'NomineeRelation' },
      { title: 'Nominee Phone', dataKey: 'NomineePhone' },

    ];
  
    const rows = this.associates.map(associate => {
  
      return {
        cardtype:` 
        Id:${associate.uniqueId}-Role:${associate.role}
        Full Name:${associate.fullName}
        Mobile Number:${associate.mobileNumber}
        Whatsapp Number:${associate.whatsappNumber}
        Email:${associate.emailId}
        Applicant Designation :${associate.applicantDesignation}
        DOB:${associate.dateOfBirth}
        Pan Number:${associate.panNo}
        Aadhar Number:${associate.aadhar}
        `,
        RegisterDate: associate.registerDate,
        FatherorHusbandName: associate.fatherOrHusbandName,
        per:associate.commission,
        SponsorBy:associate.sponsorBy,
        SponsorDesignation:associate.applicantDesignation,
        Address: `
          State: ${associate.state}
          City: ${associate.city}
        Address: ${associate.fullAddress.replace(/, /g, ',\n')}
        `,
        Password:'*******',
        NomineeName:associate.nomineeName,
        NomineeRelation:associate.relationWithNominee,
        NomineePhone:associate.nomineeMobileNumber,         
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
        0: { cellWidth: 50 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 15 },
        4: { cellWidth: 20 },
        5: { cellWidth: 30 },
        6: { cellWidth: 50 },
        7: { cellWidth: 15 },
        8: { cellWidth: 15 },
        9: { cellWidth: 15 },
        10: { cellWidth: 15 },

      },
      margin: { top: 20 },
      didDrawPage: (data) => {
        doc.setFontSize(14);
        doc.text('Associates Report', pageWidth / 2, 10, { align: 'center' });
      }
    });
  
    doc.save('Associate List.pdf');
  }

  
  
  generateExcelFile() {
    const worksheetData = this.associates.map(associate => ({
      'Card':`Id:${associate.uniqueId}-Role:${associate.role}\nFull Name:${associate.fullName}
        Mobile Number:${associate.mobileNumber}\n
        Whatsapp Number:${associate.whatsappNumber}\n
        Email:${associate.emailId}\n
        Applicant Designation :${associate.applicantDesignation}\n
        DOB:${associate.dateOfBirth}\n
        Pan Number:${associate.panNo}\n
        Aadhar Number:${associate.aadhar}`,
        RegisterDate: associate.registerDate,
        FatherorHusbandName: associate.fatherOrHusbandName,
        commission:associate.commission,
        SponsorBy:associate.sponsorBy,
        SponsorDesignation:associate.applicantDesignation,
        Address: `
          State: ${associate.state}
          City: ${associate.city}
        Address: ${associate.fullAddress.replace(/, /g, ',\n')}
        `,
        Password:'*******',
        NomineeName:associate.nomineeName,
        NomineeRelation:associate.relationWithNominee,
        NomineePhone:associate.nomineeMobileNumber,      

        }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');

    XLSX.writeFile(workbook, 'Associate List.xlsx');
  }

  downloadWordFile() {
    const rows = this.associates.map(associate => new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({
          text: `Id:${associate.uniqueId}-Role:${associate.role}\nFull Name:${associate.fullName}
        Mobile Number:${associate.mobileNumber}\n
        Whatsapp Number:${associate.whatsappNumber}\n
        Email:${associate.emailId}\n
        Applicant Designation :${associate.applicantDesignation}\n
        DOB:${associate.dateOfBirth}\n
        Pan Number:${associate.panNo}\n
        Aadhar Number:${associate.aadhar}`,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({ text: associate.registerDate, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({
          text: associate.fatherOrHusbandName,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({ text: associate.commission, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({
          text: associate.sponsorBy,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({
          text: associate.applicantDesignation,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({
          text: `
          State: ${associate.state}\n
          City: ${associate.city}\n
        Address: ${associate.fullAddress.replace(/, /g, ',\n')}
        `,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({ text: '*******', alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ text: associate.nomineeName, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ text: associate.relationWithNominee, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ text: associate.nomineeMobileNumber, alignment: AlignmentType.CENTER })] }),
      ],
    }));

    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Card", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Register Date", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Father/Husband Name", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "%", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Sponso BY", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Sponser Designation", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Address", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Password", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Nominee Name", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Nominee Relation", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Nominee PhoneNumber", alignment: AlignmentType.CENTER })] }),
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

  get totalEntries(): number {
    return this.totalCount;
  }
  

  getassociate() {
    this.http.get<any>('http://127.0.0.1:5001/api/associates/get-associates')
      .subscribe(
        data => {
          this.associates = data.associates;
          // Initialize password visibility for each associate
          this.associates.forEach(associate => {
            this.passwordVisibility[associate._id] = false;
            this.totalCount = this.associates.length;

          });
        },
        error => {
          console.error('Error fetching Associates:', error);
        }
      );
  }

  togglePasswordVisibility(id: string) {
    this.passwordVisibility[id] = !this.passwordVisibility[id];
  }

  deleteAssociates(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete Associates Details?');
    if (confirmed) {
      console.log(id);
      this.http.get<any>(`http://127.0.0.1:5001/api/associates/delete-associate?id=${id}`)
        .subscribe(
          response => {
            console.log('Associates Details deleted successfully:', response);
            this.associates = this.associates.filter(item => item._id !== id);
            alert('Associates Details Deleted Successfully');
            // Remove the password visibility state
            delete this.passwordVisibility[id];
          },
          error => {
            console.error('Error deleting Associates:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Associates Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }


  updateassociate(associate: any) {
    this.router.navigate(['/Admin', 'AdminAssociate', 'AddAssociate'], { queryParams: { associate: JSON.stringify(associate) } });
  }

  editAssociate(id: string) {
    // Navigate to edit page with the associate ID
    this.router.navigate(['/Admin/AdminAssociate/AddAssociate'], { queryParams: { id: id } });
  }

  deleteAssociate(id: string) {
    if (confirm('Are you sure you want to delete this associate?')) {
      this.http.get(`http://127.0.0.1:5001/api/associates/delete-associate?id=${id}`)
        .subscribe({
          next: () => {
            this.getassociate(); // Refresh the list after deletion
          },
          error: (error) => {
            console.error('Error deleting associate:', error);
          }
        });
    }
  }

}
