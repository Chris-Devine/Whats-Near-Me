import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NearByRoutingModule } from './near-by-routing.module';
import { WhatsNearByComponent } from './whats-near-by/whats-near-by.component';
import { NearByService } from './services/near-by.service';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD45jae41u2x660NI7HypwOrChSzNBH6lQ",
      libraries: ["places"]
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NearByRoutingModule,
    HttpClientModule
  ],
  declarations: [WhatsNearByComponent],
  providers: [
    NearByService
  ]
})
export class NearByModule { }
