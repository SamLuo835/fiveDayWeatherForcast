import { Injectable } from '@angular/core';
import { IForecastResponse, IForcastItem, IShowingData, IForcastDisplay } from '../model/forcast-models';



@Injectable({
  providedIn: 'root'
})
export class ForcastOperationService {
  constructor() { }

  getDayChunk(data: IForecastResponse): IForcastItem[][] {
    // api data is returned in a format of every 3 hours gap , so 8 IForcastItems for one day
    // but the response for first day is missing 00:00, hence only 7 IForcastItems for the first day.
    // Total of fix 39 IForcastItems (5 days) from response
    let dateChunk: IForcastItem[][] = [];
    if (data.list.length) {
      data.list.forEach((_item, index) => {
        if ((index + 2) % 8 === 0) {
          if (index === 6) {
            dateChunk.push(data.list.slice((index + 2 - 8), index + 1) as IForcastItem[])
          } else {
            dateChunk.push(data.list.slice((index + 2 - 9), index + 1) as IForcastItem[])
          }
        }
      })
    }
    return dateChunk
  }

  // combine show min , max, mean together
  getMinMaxMean(chunk: IForcastItem[][]): IForcastDisplay{
    // reset first
    const meanTemp: IShowingData[] = [];
    const maxTemp: IShowingData[] = [];
    const minimumTemp: IShowingData[] = [];
    if (chunk.length) {
      chunk.forEach(dayItems => {
        const min = this.getMinForOneDay(dayItems);
        const max = this.getMaxForOneDay(dayItems);
        const mean = this.getMeanForOneDay(dayItems);
        // pick any unix time from the current loop dayItems since we dont 
        // care about displaying the hour/ minute
        minimumTemp.push({ temp: min, unix_time: dayItems[0].dt });
        maxTemp.push({ temp: max, unix_time: dayItems[0].dt });
        meanTemp.push({ temp: mean, unix_time: dayItems[0].dt })
      })
    }
    return {max: maxTemp, min: minimumTemp, mean: meanTemp }
  }

  getMinForOneDay(data: IForcastItem[]): number {
    return data.reduce((acc, cur, index) => {
      if (index === 0) acc = cur.main.temp_min
      else if (acc > cur.main.temp_min) acc = cur.main.temp_min;
      return acc
    }, 0)
  }

  getMaxForOneDay(data: IForcastItem[]): number {
    return data.reduce((acc, cur, index) => {
      if (index === 0) acc = cur.main.temp_max
      else if (acc < cur.main.temp_min) acc = cur.main.temp_max;
      return acc
    }, 0)
  }

  getMeanForOneDay(data: IForcastItem[]): number {
    const sum = data.reduce((acc, cur) => acc + (cur.main.temp_max + cur.main.temp_min) / 2, 0);
    return (sum / data.length) || 0;
  }

  
}
