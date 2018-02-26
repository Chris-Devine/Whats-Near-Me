import { Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { NearByService, IDistanceResult, IPlaceType } from '../services/near-by.service';

import { Subscription } from 'rxjs/Subscription';
import { GoogleMap } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-whats-near-by',
  templateUrl: './whats-near-by.component.html',
  styleUrls: ['./whats-near-by.component.css']
})
export class WhatsNearByComponent implements OnInit {

  @ViewChild('distanceUiResultsTable') distanceUiResultsTable;

  public nativeMap: GoogleMap;
  public distanceUiResults: Array<IDistanceUiResult> = [];
  public placeTypes: Array<IPlaceType>;
  public selectedPlaceTypes: Array<IPlaceType>;

  public headOfficeLat: number;
  public headOfficeLng: number;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private nearByService: NearByService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Set place types array
    this.placeTypes = this.nearByService.createPlaceTypesArray();
    this.selectedPlaceTypes = [];

    //Set Head Office Lat, Lng
    this.headOfficeLat = 53.331271;
    this.headOfficeLng = -2.973563;

    //set google maps defaults
    this.zoom = 11;
    this.latitude = 51.5074;
    this.longitude = 0.1278;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position (gets current position using browser location tools)
    this.setPositionToCurrentLocation();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.setNewLatLong(place.geometry.location.lat(), place.geometry.location.lng());

          this.distanceUiResults = [];
          this.findDistanceFromHeadOffice();
          this.findSelectedPlaceTypes();
        });
      });
    });
  }

  public loadNativeMap(nativeMap): void {
    this.nativeMap = nativeMap;
  }

  public addPlaceTypeToTable(placeTypeKey: string, placeTypeValue: string): void {
    let placeType: IPlaceType = {
      key: placeTypeKey,
      value: placeTypeValue
    }
    if (!this.placeTypeContainsType(placeType)) {
      this.selectedPlaceTypes.push(placeType);
      this.findPlaceByType(placeType);
    }
  }

  private setPositionToCurrentLocation(): void {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  private setNewLatLong(lat: number, lng: number) {
    this.latitude = lat;
    this.longitude = lng;
  }

  private findDistanceFromHeadOffice() {
    this.nearByService.distanceFromHeadOffice(this.headOfficeLat, this.headOfficeLng, this.latitude, this.longitude)
      .subscribe((result: IDistanceResult) => {
        let distanceUiResult: IDistanceUiResult = {
          description: "Head Office",
          travelTime: result.directions.routes.length > 0 ? result.directions.routes[0].legs[0].duration.text : "NA",
          travelDistance: result.directions.routes.length > 0 ? result.directions.routes[0].legs[0].distance.text : "NA"
        }
        this.distanceUiResults.push(distanceUiResult);
      });
  }

  private findPlaceByType(placeType: IPlaceType) {
    this.nearByService.findPlaceByType(this.nativeMap, this.latitude, this.longitude, placeType)
      .subscribe((result: google.maps.places.PlaceResult[]) => {
        if (result.length === 0) {
          let distanceUiResult: IDistanceUiResult = {
            description: placeType.value,
            travelTime: "None in range",
            travelDistance: "None in range"
          }
          this.distanceUiResults.push(distanceUiResult);
        } else {
          let placeId = result[0].place_id;
          this.nearByService.findDistanceFromAssetToPlaceId(placeId, this.latitude, this.longitude)
            .subscribe((result: IDistanceResult) => {
              let distanceUiResult: IDistanceUiResult = {
                description: placeType.value,
                travelTime: result.directions.routes.length > 0 ? result.directions.routes[0].legs[0].duration.text : "NA",
                travelDistance: result.directions.routes.length > 0 ? result.directions.routes[0].legs[0].distance.text : "NA"
              }
              this.distanceUiResults.push(distanceUiResult);
            });
        }
      });
  }

  private placeTypeContainsType(placeType): boolean {
    var found = false;
    for (var i = 0; i < this.selectedPlaceTypes.length; i++) {
      if (this.selectedPlaceTypes[i].key == placeType.key) {
        found = true;
        break;
      }
    }
    return found;
  }

  private findSelectedPlaceTypes(): void {
    for (var i = 0; i < this.selectedPlaceTypes.length; i++) {
      this.findPlaceByType(this.selectedPlaceTypes[i]);
    }
  }

}

export interface IDistanceUiResult {
  description: string;
  travelTime: string;
  travelDistance: string;
}