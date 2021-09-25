import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IForcastDisplayingData } from '../model/forcast-models';

@Injectable({
  providedIn: 'root'
})
export class ForcastDataService {

  constructor() { }

  private readonly _displayData = new BehaviorSubject<IForcastDisplayingData[]>([]);

  readonly displayData$ = this._displayData.asObservable();

  _setData(displayData: IForcastDisplayingData[]): void {
    this._displayData.next(displayData);
  }

}
