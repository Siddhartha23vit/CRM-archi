import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOptimizedImage } from '@angular/common'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './Admin/admindashboard/admindashboard.component';
import { AttendanceComponent } from './Admin/attendance/attendance.component';
import { AdminsidebarComponent } from './Admin/adminsidebar/adminsidebar.component';
import {MatToolbarModule} from  '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { AdmincustomerComponent } from './Admin/admincustomer/admincustomer.component';
import { AdminleadComponent } from './Admin/adminlead/adminlead.component';
import { AdminsitevisitComponent } from './Admin/adminsitevisit/adminsitevisit.component';
import { AdminreportsComponent } from './Admin/adminreports/adminreports.component';
import { AdminsettingComponent } from './Admin/adminsetting/adminsetting.component';
import { AdmingeneralmasterComponent } from './Admin/admingeneralmaster/admingeneralmaster.component';
import { AdminLicenseComponent } from './Admin/admin-license/admin-license.component';
import { UserSidebarComponent } from './User/user-sidebar/user-sidebar.component';
import { UserdashboardComponent } from './User/userdashboard/userdashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminDesignationComponent } from './Pages/admin-designation/admin-designation.component';
import { AdminBankComponent } from './Pages/admin-bank/admin-bank.component';
import { AdminUserTypeComponent } from './Pages/admin-user-type/admin-user-type.component';
import { AdminCityComponent } from './Pages/admin-city/admin-city.component';
import { AdminFacingComponent } from './Pages/admin-facing/admin-facing.component';
import { AdminDriectionComponent } from './Pages/admin-driection/admin-driection.component';
import { AdminInguiryComponent } from './Pages/admin-inguiry/admin-inguiry.component';
import { AdminDocumentTypeComponent } from './Pages/admin-document-type/admin-document-type.component';
import { AdminFlatTypeComponent } from './Pages/admin-flat-type/admin-flat-type.component';
import { AdminRawHouseComponent } from './Pages/admin-raw-house/admin-raw-house.component';
import { AdminFarmLandComponent } from './Pages/admin-farm-land/admin-farm-land.component';
import { AdminLeadSourceComponent } from './Pages/admin-lead-source/admin-lead-source.component';
import { AdminProjectProcessComponent } from './Pages/admin-project-process/admin-project-process.component';
import { AdminAmenityComponent } from './Pages/admin-amenity/admin-amenity.component';
import { AdminInventoryComponent } from './Pages/admin-inventory/admin-inventory.component';
import { AdminDeductionComponent } from './Pages/admin-deduction/admin-deduction.component';
import { AdminChargesComponent } from './Pages/admin-charges/admin-charges.component';
import { LucideAngularModule,UserRound} from 'lucide-angular';
import { AdminBirthdayComponent } from './Admin/admin-birthday/admin-birthday.component';
import { AdminAssociateComponent } from './Admin/admin-associate/admin-associate.component';
import { AdminBookingComponent } from './Admin/admin-booking/admin-booking.component';
import { AdminPaymentComponent } from './Admin/admin-payment/admin-payment.component';
import { AdminLoanProgressComponent } from './Admin/admin-loan-progress/admin-loan-progress.component';
import { AdminBookingDemandComponent } from './Admin/admin-booking-demand/admin-booking-demand.component';
import { AdminBuildingListComponent } from './Admin/AdminProject/admin-building-list/admin-building-list.component';
import { AdminProjectListComponent } from './Admin/AdminProject/admin-project-list/admin-project-list.component';
import { AdminFloorListComponent } from './Admin/AdminProject/admin-floor-list/admin-floor-list.component';
import { AdminFlatListComponent } from './Admin/AdminProject/admin-flat-list/admin-flat-list.component';
import { AdminPlotListComponent } from './Admin/AdminProject/admin-plot-list/admin-plot-list.component';
import { AdminRawHouseListComponent } from './Admin/AdminProject/admin-raw-house-list/admin-raw-house-list.component';
import { AdminFarmLandListComponent } from './Admin/AdminProject/admin-farm-land-list/admin-farm-land-list.component';
import { AdminApartmentListComponent } from './Admin/AdminProject/admin-apartment-list/admin-apartment-list.component';
import { AdminInventoryListComponent } from './Admin/AdminProject/admin-inventory-list/admin-inventory-list.component';
import { AdminProjectDemandComponent } from './Admin/admin-project-demand/admin-project-demand.component';
import { AdminaddcustomerComponent } from './Pages/adminaddcustomer/adminaddcustomer.component';
import { AdminAddProjectComponent } from './Pages/admin-add-project/admin-add-project.component';
import { AdminaddleadComponent } from './Pages/adminaddlead/adminaddlead.component';
import { AdminPrivacyPolicyComponent } from './Admin/admin-privacy-policy/admin-privacy-policy.component';
import { AdminFQAComponent } from './Admin/admin-fqa/admin-fqa.component';
import { AdminAddSiteVisitComponent } from './Pages/admin-add-site-visit/admin-add-site-visit.component';
import { AdminAddAssociateComponent } from './Pages/admin-add-associate/admin-add-associate.component';
import { AdminCommissionLabComponent } from './Admin/admin-commission-lab/admin-commission-lab.component';
import { AdminAddbookingComponent } from './Pages/admin-addbooking/admin-addbooking.component';
import { MarkattendanceComponent } from './Pages/markattendance/markattendance.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdmindashboardComponent,
    AdminsidebarComponent,
    AttendanceComponent,
    AdmincustomerComponent,
    AdminleadComponent,
    AdminsitevisitComponent,
    AdminreportsComponent,
    AdminsettingComponent,
    AdmingeneralmasterComponent,
    AdminLicenseComponent,
    UserSidebarComponent,
    UserdashboardComponent,
    PagenotfoundComponent,
    AdminDesignationComponent,
    AdminBankComponent,
    AdminUserTypeComponent,
    AdminCityComponent,
    AdminFacingComponent,
    AdminDriectionComponent,
    AdminInguiryComponent,
    AdminDocumentTypeComponent,
    AdminFlatTypeComponent,
    AdminRawHouseComponent,
    AdminFarmLandComponent,
    AdminLeadSourceComponent,
    AdminProjectProcessComponent,
    AdminAmenityComponent,
    AdminInventoryComponent,
    AdminDeductionComponent,
    AdminChargesComponent,
    AdminBirthdayComponent,
    AdminAssociateComponent,
    AdminBookingComponent,
    AdminPaymentComponent,
    AdminLoanProgressComponent,
    AdminBookingDemandComponent,
    AdminBuildingListComponent,
    AdminProjectListComponent,
    AdminFloorListComponent,
    AdminFlatListComponent,
    AdminPlotListComponent,
    AdminRawHouseListComponent,
    AdminFarmLandListComponent,
    AdminApartmentListComponent,
    AdminInventoryListComponent,
    AdminProjectDemandComponent,
    AdminaddcustomerComponent,
    AdminAddProjectComponent,
    AdminaddleadComponent,
    AdminPrivacyPolicyComponent,
    AdminFQAComponent,
    AdminAddSiteVisitComponent,
    AdminAddAssociateComponent,
    AdminCommissionLabComponent,
    AdminAddbookingComponent,
    MarkattendanceComponent,
  
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    LucideAngularModule.pick({UserRound})
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
