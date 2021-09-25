import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IForcastDisplay } from '../model/forcast-models';

@Injectable({
  providedIn: 'root'
})
export class ForcastDataService {

  constructor() { }

  private readonly _displayData = new BehaviorSubject<IForcastDisplay>({});

  readonly displayData$ = this._displayData.asObservable();

  _setData(displayData: IForcastDisplay): void {
    this._displayData.next(displayData);
  }

}
