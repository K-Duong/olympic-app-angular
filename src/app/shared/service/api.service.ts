import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Olympic} from "../../models/olympic.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = './assets/mock/olympic.json';
  http = inject(HttpClient);

  /**
   * @returns: Olympics observable
   * */
  public getOlympicData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.baseUrl)
  };

  /**
   * get info's olympic country by countryName
   */

  // public getCountryByCountryName(data : Olympic[], countryName) : Olympic | undefined {
  //   if (!data || data.length < 1) {
  //     console.log('No Olympic country found');
  //   }
  //   const foundCountry = data.find(d => d.country.toLowerCase() === countryName.toLowerCase());
  //   console.log('country found', foundCountry);
  //   return foundCountry;
  // }
}
