import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',  
    redirectTo: 'login',
    pathMatch: 'full'
  },{
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'activejobs',
    loadChildren: () => import('./activejobs/activejobs.module').then( m => m.ActivejobsPageModule)
  },
  {
    path: 'newjobs',
    loadChildren: () => import('./newjobs/newjobs.module').then( m => m.NewjobsPageModule)
  },
  {
    path: 'reclean',
    loadChildren: () => import('./reclean/reclean.module').then( m => m.RecleanPageModule)
  },
  {
    path: 'completejobs',
    loadChildren: () => import('./completejobs/completejobs.module').then( m => m.CompletejobsPageModule)
  },
  {
    path: 'alljobs',
    loadChildren: () => import('./alljobs/alljobs.module').then( m => m.AlljobsPageModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then( m => m.AccountsPageModule)
  },
  {
    path: 'mydetail',
    loadChildren: () => import('./mydetail/mydetail.module').then( m => m.MydetailPageModule)
  },
  {
    path: 'substaff',
    loadChildren: () => import('./substaff/substaff.module').then( m => m.SubstaffPageModule)
  },
  {
    path: 'availability',
    loadChildren: () => import('./availability/availability.module').then( m => m.AvailabilityPageModule)
  },
  {
    path: 'termandcondition',
    loadChildren: () => import('./termandcondition/termandcondition.module').then( m => m.TermandconditionPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'jobstartpopup',
    loadChildren: () => import('./popup/jobstartpopup/jobstartpopup.module').then( m => m.JobstartpopupPageModule)
  },
  {
    path: 'eveningcheckpopup',
    loadChildren: () => import('./popup/eveningcheckpopup/eveningcheckpopup.module').then( m => m.EveningcheckpopupPageModule)
  },
  {
    path: 'recleancheckpopup',
    loadChildren: () => import('./popup/recleancheckpopup/recleancheckpopup.module').then( m => m.RecleancheckpopupPageModule)
  },
  {
    path: 'jobdetail',
    loadChildren: () => import('./jobdetail/jobdetail.module').then( m => m.JobdetailPageModule)
  },
  {
    path: 'imagebefore',
    loadChildren: () => import('./imagebefore/imagebefore.module').then( m => m.ImagebeforePageModule)
  },
  {
    path: 'imageafter',
    loadChildren: () => import('./imageafter/imageafter.module').then( m => m.ImageafterPageModule)
  },
  {
    path: 'checklist',
    loadChildren: () => import('./checklist/checklist.module').then( m => m.ChecklistPageModule)
  },
  {
    path: 'gaurantee',
    loadChildren: () => import('./gaurantee/gaurantee.module').then( m => m.GauranteePageModule)
  },
  {
    path: 'upsell',
    loadChildren: () => import('./upsell/upsell.module').then( m => m.UpsellPageModule)
  },
  {
    path: 'addsubstaff',
    loadChildren: () => import('./addsubstaff/addsubstaff.module').then( m => m.AddsubstaffPageModule)
  },
  {
    path: 'eveningcheck',
    loadChildren: () => import('./eveningcheck/eveningcheck.module').then( m => m.EveningcheckPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'signature',
    loadChildren: () => import('./signature/signature.module').then( m => m.SignaturePageModule)
  },
  {
    path: 'leads',
    loadChildren: () => import('./leads/leads.module').then( m => m.LeadsPageModule)
  },
  {
    path: 'createquote',
    loadChildren: () => import('./createquote/createquote.module').then( m => m.CreatequotePageModule)
  },
  {
    path: 'viewquote',
    loadChildren: () => import('./viewquote/viewquote.module').then( m => m.ViewquotePageModule)
  },
  {
    path: 'leadsetting',
    loadChildren: () => import('./leadsetting/leadsetting.module').then( m => m.LeadsettingPageModule)
  },
  {
    path: 'paynow',
    loadChildren: () => import('./paynow/paynow.module').then( m => m.PaynowPageModule)
  },
  {
    path: 'createnotes',
    loadChildren: () => import('./createnotes/createnotes.module').then( m => m.CreatenotesPageModule)
  },
  {
    path: 'cleanertasks',
    loadChildren: () => import('./cleanertasks/cleanertasks.module').then( m => m.CleanertasksPageModule)
  },
  {
    path: 'cleaningpopup',
    loadChildren: () => import('./popup/cleaningpopup/cleaningpopup.module').then( m => m.CleaningpopupPageModule)
  },
  {
    path: 'viewnotes',
    loadChildren: () => import('./viewnotes/viewnotes.module').then( m => m.ViewnotesPageModule)
  },
  {
    path: 'assign-reclean-popup',
    loadChildren: () => import('./popup/assign-reclean-popup/assign-reclean-popup.module').then( m => m.AssignRecleanPopupPageModule)
  },
  {
    path: 'assign-complaint-popup',
    loadChildren: () => import('./popup/assign-complaint-popup/assign-complaint-popup.module').then( m => m.AssignComplaintPopupPageModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./testing/testing.module').then( m => m.TestingPageModule)
  }
];

@NgModule({  
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
