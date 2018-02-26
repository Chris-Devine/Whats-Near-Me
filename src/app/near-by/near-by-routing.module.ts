import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatsNearByComponent } from './whats-near-by/whats-near-by.component'

const routes: Routes = [
  {
    path: '',
    component: WhatsNearByComponent,
    /* children: [
      {
        path: '',
        redirectTo: 'company-settings',
        pathMatch: 'full'
      },
      {
        path: 'company-settings',
        component: CompanySettingsComponent,
        data: {
          title: 'Company Settings'
        }
      },
      {
        path: 'import-from-link',
        component: ImportFromLinkComponent,
        data: {
          title: 'Import from Link'
        }
      }
    ] */
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NearByRoutingModule { }
