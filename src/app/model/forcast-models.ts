export interface IForecastResponse {
  city: ICity,
  cod: number,
  message: number,
  cnt: number,
  list: IForcastItem[],
}

export interface ICity {
  id: number,
  name: string,
  country: string,
  timezone: number,
}

export interface IForcastItem {
  dt: number,
  main: {
    temp_max: number,
    temp_min: number,
  }
}

export interface IShowingData {
  temp: number,
  unix_time: number,
}

export interface IForcastDisplay {
  city?: ICity,
  max?: IShowingData[],
  min?: IShowingData[],
  mean?: IShowingData[],
}

export enum EUnitType {
  IMPERIAL = 'imperial',
  METRIC = 'metric'
}
