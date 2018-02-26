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
      apiKey: "AIzaSyAjsbEM-MxdgVXLr0vsy46h4hJsAlCW9ck",
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
