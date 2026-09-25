import {Injectable} from "@angular/core";
import {Metadata} from "../../models/olympic.model";
import {BehaviorSubject} from "rxjs";



@Injectable({
  providedIn: 'root'
})
/**
 * service to get title, label and indicators info to render in header component
 */

export class HeaderService {

  private _metadata$ = new BehaviorSubject<Metadata>({title: '', indicators: []});
  public metadata$ = this._metadata$.asObservable();

  public setMetadata(metadata: Metadata) {
    this._metadata$.next(metadata);
  }

}

