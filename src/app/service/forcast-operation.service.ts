import { Injectable } from '@angular/core';
import { IForecastResponse, IForcastItem, IForcastDisplayingData } from '../model/forcast-models';



@Injectable({
  providedIn: 'root'
})
export class ForcastOperationService {
  constructor() { }

  getDayChunk(data: IForecastResponse): IForcastItem[][] {
    let dateChunk: IForcastItem[][] = [];
    let previousDay: number;
    let indexToSlice: number = 1;
    if (data.list.length) {
      data.list.forEach((item, index) => {
        const dayOfMonth = new Date(item.dt * 1000).getDate();
        if(index === 0) previousDay = dayOfMonth
        else if(previousDay !== dayOfMonth) {
          // push to chunk as an array of same day forcast items
          dateChunk.push(data.list.slice((index - indexToSlice), index) as IForcastItem[])
          previousDay = dayOfMonth
          indexToSlice = 1
        } else {
          indexToSlice += 1;
        }
        if (index === data.list.length - 1) {
          // handle the last few forcast items, push them as the last day array to datechunk 
          dateChunk.push(data.list.slice((index - indexToSlice + 1), index +1) as IForcastItem[])
        }
      })
    }
    console.log('before ',dateChunk)
    if (dateChunk.length === 6) {
      if(dateChunk[0].length >= dateChunk[5].length) dateChunk.pop();
      else dateChunk.shift();
    }
    console.log('after', dateChunk)
    return dateChunk
  }

  // combine show min , max, mean together
  getMinMaxMean(chunk: IForcastItem[][]): IForcastDisplayingData[]{
    const data: IForcastDisplayingData[] = []
    if (chunk.length) {
      chunk.forEach(dayItems => {
        const min = this.getMinForOneDay(dayItems);
        const max = this.getMaxForOneDay(dayItems);
        const mean = this.getMeanForOneDay(dayItems);
        // pick any unix time from the current loop dayItems since we dont 
        // care about displaying the hour/ minute
        data.push({unix_time: dayItems[0].dt, max, min, mean});
      })
    }
    return data
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
