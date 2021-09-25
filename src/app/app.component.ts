import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, Subject } from 'rxjs';
import { WeatherForcastService } from './core/weather-forcast.service';
import { EUnitType } from './model/forcast-models';
import { ForcastDataService } from './service/forcast-data.service';
import { ForcastOperationService } from './service/forcast-operation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private weatherForcastService: WeatherForcastService,
              private msg: NzMessageService, 
              private forcastOperation: ForcastOperationService,
              private forcastData: ForcastDataService) {}

  unitType = EUnitType
  cityToSearch: string = ''
  fetchingData$ = new Subject<boolean>();
  unit: EUnitType = EUnitType.IMPERIAL;
  unitSubject$ = new BehaviorSubject<EUnitType>(this.unit);

  ngOnInit(): void {}

  async onSearch() {
    if (!this.cityToSearch) {
      this.msg.info('Please enter a city to proceed')
      return
    }
    this.fetchingData$.next(true)
    // test spinner
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.weatherForcastService.getFiveDaysForcast(this.cityToSearch, this.unit).subscribe(res => {
      const chunk = this.forcastOperation.getDayChunk(res);
      const result = this.forcastOperation.getMinMaxMean(chunk);
      result.city = res.city;
      this.forcastData._setData(result);
      this.fetchingData$.next(false)
    }, error => {
      this.fetchingData$.next(false)
      console.log(error);
      this.msg.error(error.error.message)
    })
  }

  onSelectChange($event: EUnitType ) {
    console.log($event);
    this.unitSubject$.next($event);
  }
}
