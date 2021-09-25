import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EUnitType, ICity, IShowingData } from '../model/forcast-models';
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
  cityData!: ICity;
  max!: IShowingData[];
  min!: IShowingData[];
  mean!: IShowingData[];

  destroyed$ = new Subject()

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.forcast.displayData$.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      if (data.city && data.max && data.min && data.mean) {
        this.cityData = data.city
        this.max = data.max;
        this.min = data.min;
        this.mean = data.mean;
      }
    })
  }

}
