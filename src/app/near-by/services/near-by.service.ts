import { IDistanceResult } from './near-by.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { } from 'googlemaps';
import { GoogleMap } from '@agm/core/services/google-maps-types';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/operator/map';


import { GoogleMapsAPIWrapper } from '@agm/core/services/google-maps-api-wrapper';

@Injectable()
export class NearByService {

  private key = "AIzaSyAjsbEM-MxdgVXLr0vsy46h4hJsAlCW9ck";
  
  constructor(
    private http: HttpClient
  ) { }



  public distanceFromHeadOffice(officeLat: number, officeLng: number, assetLat: number, assetLng: number): Observable<IDistanceResult> {
    var directionsService = new google.maps.DirectionsService;
    var route: any = Observable.bindCallback(directionsService.route);

    return route({
      origin: { lat: officeLat, lng: officeLng },
      destination: { lat: assetLat, lng: assetLng },
      waypoints: [],
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    })
      .map((response) => {
        let result: IDistanceResult;
        return result = {
          directions: response[0],
          status: response[1]
        }
      });
  }

  public findPlaceByType(map: any, assetLat: number, assetLng: number, placeType: IPlaceType): Observable<google.maps.places.PlaceResult[]> {
    let placesService = new google.maps.places.PlacesService(map);
    return Observable.create(observer => {
      placesService.nearbySearch({
        location: new google.maps.LatLng(assetLat, assetLng),
        radius: 2000,
        types: [placeType.key],
      }, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK || status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          observer.next(results);
          observer.complete();
        }
        else {
          observer.error(status);
        }
      });
    });
  }

  public findDistanceFromAssetToPlaceId(placeId: string, assetLat: number, assetLng: number) {
    var directionsService = new google.maps.DirectionsService;
    var route: any = Observable.bindCallback(directionsService.route);
    return route({
      origin: { placeId: placeId },
      destination: { lat: assetLat, lng: assetLng },
      waypoints: [],
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    })
      .map((response) => {
        let result: IDistanceResult;
        return result = {
          directions: response[0],
          status: response[1]
        }
      });
  }

  public createPlaceTypesArray(): Array<IPlaceType> {
    let placeTypes: Array<IPlaceType> = [
      { key: "accounting", value: "accounting" },
      { key: "airport", value: "airport" },
      { key: "amusement_park", value: "amusement park" },
      { key: "aquarium", value: "aquarium" },
      { key: "art_gallery", value: "art gallery" },
      { key: "atm", value: "atm" },
      { key: "bakery", value: "bakery" },
      { key: "bank", value: "bank" },
      { key: "bar", value: "bar" },
      { key: "beauty_salon", value: "beauty salon" },
      { key: "bicycle_store", value: "bicycle store" },
      { key: "book_store", value: "book store" },
      { key: "bowling_alley", value: "bowling alley" },
      { key: "bus_station", value: "bus station" },
      { key: "cafe", value: "cafe" },
      { key: "campground", value: "campground" },
      { key: "car_dealer", value: "car dealer" },
      { key: "car_rental", value: "car rental" },
      { key: "car_repair", value: "car repair" },
      { key: "car_wash", value: "car wash" },
      { key: "casino", value: "casino" },
      { key: "cemetery", value: "cemetery" },
      { key: "church", value: "church" },
      { key: "city_hall", value: "city hall" },
      { key: "clothing_store", value: "clothing store" },
      { key: "convenience_store", value: "convenience store" },
      { key: "courthouse", value: "courthouse" },
      { key: "dentist", value: "dentist" },
      { key: "department_store", value: "department store" },
      { key: "doctor", value: "doctor" },
      { key: "electrician", value: "electrician" },
      { key: "electronics_store", value: "electronics store" },
      { key: "embassy", value: "embassy" },
      { key: "fire_station", value: "fire station" },
      { key: "florist", value: "florist" },
      { key: "funeral_home", value: "funeral home" },
      { key: "furniture_store", value: "furniture store" },
      { key: "gas_station", value: "gas station" },
      { key: "gym", value: "gym" },
      { key: "hair_care", value: "hair care" },
      { key: "hardware_store", value: "hardware store" },
      { key: "hindu_temple", value: "hindu temple" },
      { key: "home_goods_store", value: "home goods store" },
      { key: "hospital", value: "hospital" },
      { key: "insurance_agency", value: "insurance agency" },
      { key: "jewelry_store", value: "jewelry store" },
      { key: "laundry", value: "laundry" },
      { key: "lawyer", value: "lawyer" },
      { key: "library", value: "library" },
      { key: "liquor_store", value: "liquor store" },
      { key: "local_government_office", value: "local government office" },
      { key: "locksmith", value: "locksmith" },
      { key: "lodging", value: "lodging" },
      { key: "meal_delivery", value: "meal delivery" },
      { key: "meal_takeaway", value: "meal takeaway" },
      { key: "mosque", value: "mosque" },
      { key: "movie_rental", value: "movie rental" },
      { key: "movie_theater", value: "movie theater" },
      { key: "moving_company", value: "moving company" },
      { key: "museum", value: "museum" },
      { key: "night_club", value: "night club" },
      { key: "painter", value: "painter" },
      { key: "park", value: "park" },
      { key: "parking", value: "parking" },
      { key: "pet_store", value: "pet store" },
      { key: "pharmacy", value: "pharmacy" },
      { key: "physiotherapist", value: "physiotherapist" },
      { key: "plumber", value: "plumber" },
      { key: "police", value: "police" },
      { key: "post_office", value: "post office" },
      { key: "real_estate_agency", value: "real estate agency" },
      { key: "restaurant", value: "restaurant" },
      { key: "roofing_contractor", value: "roofing contractor" },
      { key: "rv_park", value: "rv park" },
      { key: "school", value: "school" },
      { key: "shoe_store", value: "shoe store" },
      { key: "shopping_mall", value: "shopping mall" },
      { key: "spa", value: "spa" },
      { key: "stadium", value: "stadium" },
      { key: "storage", value: "storage" },
      { key: "store", value: "store" },
      { key: "subway_station", value: "subway station" },
      { key: "supermarket", value: "supermarket" },
      { key: "synagogue", value: "synagogue" },
      { key: "taxi_stand", value: "taxi stand" },
      { key: "train_station", value: "train station" },
      { key: "transit_station", value: "transit station" },
      { key: "travel_agency", value: "travel agency" },
      { key: "veterinary_care", value: "veterinary care" },
      { key: "zoo", value: "zoo" }
    ];
    return placeTypes;
  }

}

export interface IDistanceResult {
  directions: google.maps.DirectionsResult;
  status: google.maps.DirectionsStatus;
}

export interface IPlaceType {
  key: string;
  value: string;
}
