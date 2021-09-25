import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EUnitType, ICity, IForcastDisplayingData } from '../model/forcast-models';
import { ForcastDataService } from '../service/forcast-data.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-display-forecast',
  templateUrl: './display-forecast.component.html',
  styleUrls: ['./display-forecast.component.css']
})
export class DisplayForecastComponent implements OnInit, OnDestroy {

  constructor(public forcast: ForcastDataService) { }

  unitType = EUnitType
  @Input() fetchingDataSubject!: Subject<boolean>;
  @Input() unitSubject!: BehaviorSubject<EUnitType>;

  displayDataList!: IForcastDisplayingData[];

  destroyed$ = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.forcast.displayData$.pipe(takeUntil(this.destroyed$)).subscribe(result => {
      if (result.length) {
        this.displayDataList = result;
      }
    })
  }

}
