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

export interface IForcastDisplayingData {
  min: number, max: number, mean: number, unix_time: number
}

export enum EUnitType {
  IMPERIAL = 'imperial',
  METRIC = 'metric'
}
