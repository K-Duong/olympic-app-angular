import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";
import {Olympic} from "../../models/olympic.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = './assets/mock/olympic.json';
  http = inject(HttpClient);

  public olympics$: Observable<Olympic[]> = this.http.get<Olympic[]>(this.baseUrl).pipe(
    shareReplay(1)
  )
  /**
   * @returns: Olympics observable
   * */
  public getOlympicData(): Observable<Olympic[]> {
    return this.olympics$;
  };

  /**
   * get info's olympic country by countryName
   */

  public getCountryById(countryId: number): Observable<Olympic | null> {
    return this.olympics$.pipe(
      map((data) => {
        if (!data || data.length < 1) {
          console.log('No data found');
          return null
        }
        const foundCountry = data.find(d => d.id === countryId);
        return foundCountry ?? null;
      })
    )
  }
}
