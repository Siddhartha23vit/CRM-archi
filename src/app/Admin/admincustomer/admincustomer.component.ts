import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, AlignmentType } from 'docx';

interface Customer {
 reg:string;
 state:string;
 city: string;
}

@Component({
  selector: 'app-admincustomer',
  templateUrl: './admincustomer.component.html',
  styleUrls: ['./admincustomer.component.css']
})
export class AdmincustomerComponent implements OnInit {
  customers: any[] = []; 
  
  filteredCustomer: Customer[] = [];
  searchReg: string = ''; 
  searchState: string = ''; 
  searchCity: string = ''; 
  totalCount: number = 0; // Initialize totalCount as 0

  

  constructor(private http: HttpClient,private router: Router) {

   }

  
  ngOnInit(): void {
    this.getcustomer(); 
  }

  
  generatePDF() {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
  
    const columns = [
      { title: 'Date', dataKey: 'Date' },
      { title: 'Customer Details', dataKey: 'Details' },
      { title: 'Address', dataKey: 'Address' },
    ];
  
    const rows = this.customers.map(customer => {
  
      return {
        Date: customer.registerDate,
        Details: `
          Full Name: ${customer.fullName}
          Mobile Number: ${customer.mobileNumber}
          WhatsApp Number:${customer.whatsappNumber }
          DOB: ${customer.dateOfBirth}
        `,
        Address: `
          State: ${customer.state}
          City: ${customer.city.city}
          Address: ${customer.fullAddress.replace(/, /g, ',\n')}
        `,
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
        1: { cellWidth: 50 },
      },
      margin: { top: 20 },
      didDrawPage: (data) => {
        doc.setFontSize(14);
        doc.text('Customer Report', pageWidth / 2, 10, { align: 'center' });
      }
    });
  
    doc.save('Customer List.pdf');
  }

  
  downloadWordFile() {
    const rows = this.customers.map(customer => new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ text: customer.registerDate, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({
          text: `Name: ${customer.fullName}
          \nMobile Number: ${customer.mobileNumber}
          \nWhatsApp Number: ${customer.whatsappNumber}
          \nDOB: ${customer.dateOfBirth}`,
          alignment: AlignmentType.CENTER
        })]}),
        new TableCell({ children: [new Paragraph({
          text: `State: ${customer.state}\nCity: ${customer.city.city}\nAddress: ${customer.fullAddress}`,
          alignment: AlignmentType.CENTER
        })]}),
      ],
    }));

    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Register Date", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Customer Details", alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ text: "Address", alignment: AlignmentType.CENTER })] }),
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
      saveAs(blob, 'Customer List.docx');
    });
  }

  generateExcelFile() {
    const worksheetData = this.customers.map(customer => ({
      'Register Date	': customer.registerDate,
      'Customer Details	': `Name: ${customer.fullName}\nPhone Number: ${customer.mobileNumber}\WhatsApp Number: ${customer.whatsappNumber}\nDOB: ${customer.dateOfBirth}`,
      'Address': `State: ${customer.state}\nCity: ${customer.city.city}\nAddress: ${customer.fullAddress}`,
      
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customer');

    XLSX.writeFile(workbook, 'Customer List.xlsx');
  }




  get totalEntries(): number {
    return this.totalCount;
  }

  getcustomer() {
    this.http.get<any>('http://127.0.0.1:5001/api/customers/getallcustomers')
      .subscribe(
        data => {
          this.customers = data.customers;
          this.totalCount = this.customers.length; // Update totalCount after fetching customers

        },
        error => {
          console.error('Error fetching project list:', error);
        }
      );
  }

  deleteCustomer(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete Customer Details?');
    if (confirmed) {
      console.log(id)
      this.http.get<any>(`http://127.0.0.1:5001/api/customers/deletecustomer?id=${id}`)
        .subscribe(
          response => {
            console.log('Customer Details deleted successfully:', response);
            this.customers = this.customers.filter(item => item._id !== id);
            alert('Customers Details Deleted Successfully');
          },
          error => {
            console.error('Error deleting Customer:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
            alert('Error Deleting Customer Details');
          }
        );
    } else {
      console.log('Deletion cancelled by user');
    }
  }


  
  searchCustomer() {
    // Fetch projects only if at least one search criteria is provided
    if (this.searchReg.trim() !== '' || this.searchState.trim() !== '' || this.searchCity.trim() !== '') {
      this.http.get<any>('http://127.0.0.1:5001/api/customers/getallcustomers')
        .subscribe(
          data => {
            this.customers = data.customers.filter((customer: Customer) => {
              let regMatch = true;
              let cityMatch = true;
              let stateMatch = true;

              if (this.searchReg.trim() !== '') {
                regMatch = customer.reg.toLowerCase().includes(this.searchReg.toLowerCase());
              }

              if (this.searchCity.trim() !== '') {
                cityMatch = customer.city.toLowerCase().includes(this.searchCity.toLowerCase());
              }

              if (this.searchState.trim() !== '') {
                stateMatch = customer.state.toLowerCase().includes(this.searchState.toLowerCase());
              }

              return regMatch && cityMatch && stateMatch;
            });
          },
          error => {
            console.error('Error fetching customer list:', error);
          }
        );
    } else {
      this.getcustomer();
    }
  }
  

  updatecustomer(customer: any) {
    this.router.navigate(['/Admin', 'AdminCustomer', 'AddCustomer'], { queryParams: { customer: JSON.stringify(customer) } });
  }
}

