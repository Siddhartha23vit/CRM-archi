import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './Admin/admindashboard/admindashboard.component';
import { AuthService } from 'src/app/Services/auth.service';
import { AuthGuard } from './Guards/auth.guard';
import { AttendanceComponent } from './Admin/attendance/attendance.component';
import { AdminsidebarComponent } from './Admin/adminsidebar/adminsidebar.component';
import { AdmincustomerComponent } from './Admin/admincustomer/admincustomer.component';
import { AdminLicenseComponent } from './Admin/admin-license/admin-license.component';
import { AdmingeneralmasterComponent } from './Admin/admingeneralmaster/admingeneralmaster.component';
import { AdminleadComponent } from './Admin/adminlead/adminlead.component';
import { AdminreportsComponent } from './Admin/adminreports/adminreports.component';
import { AdminsettingComponent } from './Admin/adminsetting/adminsetting.component';
import { AdminsitevisitComponent } from './Admin/adminsitevisit/adminsitevisit.component';
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
import { AdminProjectListComponent } from './Admin/AdminProject/admin-project-list/admin-project-list.component';
import { AdminBuildingListComponent } from './Admin/AdminProject/admin-building-list/admin-building-list.component';
import { AdminFloorListComponent } from './Admin/AdminProject/admin-floor-list/admin-floor-list.component';
import { AdminFlatListComponent } from './Admin/AdminProject/admin-flat-list/admin-flat-list.component';
import { AdminPlotListComponent } from './Admin/AdminProject/admin-plot-list/admin-plot-list.component';
import { AdminRawHouseListComponent } from './Admin/AdminProject/admin-raw-house-list/admin-raw-house-list.component';
import { AdminFarmLandListComponent } from './Admin/AdminProject/admin-farm-land-list/admin-farm-land-list.component';
import { AdminApartmentListComponent } from './Admin/AdminProject/admin-apartment-list/admin-apartment-list.component';
import { AdminInventoryListComponent } from './Admin/AdminProject/admin-inventory-list/admin-inventory-list.component';
import { AdminBookingComponent } from './Admin/admin-booking/admin-booking.component';
import { AdminBirthdayComponent } from './Admin/admin-birthday/admin-birthday.component';
import { AdminPaymentComponent } from './Admin/admin-payment/admin-payment.component';
import { AdminLoanProgressComponent } from './Admin/admin-loan-progress/admin-loan-progress.component';
import { AdminProjectDemandComponent } from './Admin/admin-project-demand/admin-project-demand.component';
import { AdminBookingDemandComponent } from './Admin/admin-booking-demand/admin-booking-demand.component';
import { AdminaddcustomerComponent } from './Pages/adminaddcustomer/adminaddcustomer.component';
import { AdminAddProjectComponent } from './Pages/admin-add-project/admin-add-project.component';
import { AdminaddleadComponent } from './Pages/adminaddlead/adminaddlead.component';
import { AdminPrivacyPolicyComponent } from './Admin/admin-privacy-policy/admin-privacy-policy.component';
import { AdminFQAComponent } from './Admin/admin-fqa/admin-fqa.component';
import { AdminAddSiteVisitComponent } from './Pages/admin-add-site-visit/admin-add-site-visit.component';
import { AdminAssociateComponent } from './Admin/admin-associate/admin-associate.component';
import { AdminAddAssociateComponent } from './Pages/admin-add-associate/admin-add-associate.component';
import { AdminCommissionLabComponent } from './Admin/admin-commission-lab/admin-commission-lab.component';
import { AdminAddbookingComponent } from './Pages/admin-addbooking/admin-addbooking.component';
import { MarkattendanceComponent } from './Pages/markattendance/markattendance.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'Admin', pathMatch: 'full' },
  { path: 'Admin', 
    component: AdminsidebarComponent,canActivate:[AuthGuard],
    children: [
      { path: '', redirectTo: 'AdminDashboard', pathMatch: 'full' }, 
      { path: 'AdminAttendance', component: AttendanceComponent },
      {path:'AdminAttendance/Markattendance',component:MarkattendanceComponent},
      { path: 'AdminDashboard', component: AdmindashboardComponent },
      { path: 'AdminProjectList', component:AdminProjectListComponent },
      { path: 'AdminProjectList/AddProject', component: AdminAddProjectComponent }, 
      { path: 'AdminBuildingList', component:AdminBuildingListComponent },
      {path:'AdminFloorList', component : AdminFloorListComponent},
      {path:'AdminFlatList', component:AdminFlatListComponent},
      {path:'AdminPlotList', component:AdminPlotListComponent},
      {path:'AdminRawHouseList', component:AdminRawHouseListComponent},
      {path:'AdminFarmLandList', component:AdminFarmLandListComponent},
      {path:'AdminApartmentList', component:AdminApartmentListComponent},
      {path:'AdminInventoryList', component:AdminInventoryListComponent},
      {path:'AdminLicense', component:AdminLicenseComponent},
      {path:'AdminCustomer', component:AdmincustomerComponent},
      { path: 'AdminCustomer/AddCustomer', component: AdminaddcustomerComponent }, 
      {path:'AdminGeneralMaster', component:AdmingeneralmasterComponent,
         children:[
          { path: '', redirectTo: 'AdminDesignation', pathMatch: 'full' }, 
          {path:'AdminDesignation', component:AdminDesignationComponent},
          {path:'AdminBank', component:AdminBankComponent},
          {path:'AdminUserType', component:AdminUserTypeComponent},
          {path:'AdminCity', component:AdminCityComponent},
          {path:'AdminCharges', component:AdminChargesComponent},
          {path:'AdminFacing', component:AdminFacingComponent},
          {path:'AdminDirection', component:AdminDriectionComponent},
          {path:'AdminInquiryStatus', component:AdminInguiryComponent},
          {path:'AdminDoucmentType', component:AdminDocumentTypeComponent},
          {path:'AdminFlatType', component:AdminFlatTypeComponent},
          {path:'AdminRawHouseType', component:AdminRawHouseComponent},
          {path:'AdminFarmLandType', component:AdminFarmLandComponent},
          {path:'AdminLeadSource', component:AdminLeadSourceComponent},
          {path:'AdminProjectProcess', component:AdminProjectProcessComponent},
          {path:'AdminAmenities', component:AdminAmenityComponent},
          {path:'AdminInventoryType', component:AdminInventoryComponent},
          {path:'AdminDediction', component:AdminDeductionComponent},
    ]},
      {path:'AdminLead',component:AdminleadComponent},
      {path:'AdminLead/AddLead',component:AdminaddleadComponent},
      {path:'AdminReport', component:AdminreportsComponent},
      {path:'AdminSetting', component:AdminsettingComponent},
      {path:'AdminSiteVisit', component:AdminsitevisitComponent},
      {path:'AdminSiteVisit/AddSiteVisit',component:AdminAddSiteVisitComponent},
      {path:'AdminBooking', component:AdminBookingComponent},
      {path:'AdminBooking/AdminAddBooking',component:AdminAddbookingComponent},
      {path:'AdminBirthday', component:AdminBirthdayComponent},
      {path:'AdminPayment', component:AdminPaymentComponent},
      {path:'AdminLoanProgress', component:AdminLoanProgressComponent},
      {path:'AdminProjectDenamd',component:AdminProjectDemandComponent},
      {path:'AdminBookingDemand',component:AdminBookingDemandComponent},
      {path:'AdminPrivacyPolicy', component:AdminPrivacyPolicyComponent},
      {path:'AdminFAQ', component:AdminFQAComponent},
      {path:'AdminAssociate', component:AdminAssociateComponent},
      {path:'AdminAssociate/AddAssociate',component:AdminAddAssociateComponent},
      {path:'AdminCommissionLab', component:AdminCommissionLabComponent},






    ]
  },


  { path: 'User', component: UserSidebarComponent, canActivate: [AuthGuard] ,
  children:[
    {path:'UserDashboard', component:UserdashboardComponent}
  ]

  },
  { path: 'ERROR', component: PagenotfoundComponent },

];