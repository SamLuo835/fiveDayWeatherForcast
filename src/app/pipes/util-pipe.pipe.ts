import { Pipe, PipeTransform } from '@angular/core';
import { EUnitType } from '../model/forcast-models';

@Pipe({
  name: 'transformTemp'
})
export class TransformTempPipe implements PipeTransform {

  transform(value: number, unit: string, lastUnit: string) {
    console.log(lastUnit)
    if (value && !isNaN(value)) {
      if (lastUnit !== unit) {
        if (unit === EUnitType.METRIC) {
          var temperature = (value - 32) / 1.8;
          return temperature.toFixed(2) + '°C';
        } else if (unit === EUnitType.IMPERIAL) {
          var temperature = (value * 1.8) + 32
          return temperature.toFixed(2) + '°F';
        }
      } else {
        if (unit === EUnitType.METRIC) {
          return value.toFixed(2) + '°C';
        } else if (unit === EUnitType.IMPERIAL) {
          return value.toFixed(2) + '°F';
        }
      }
    }
    return;
  }

}
