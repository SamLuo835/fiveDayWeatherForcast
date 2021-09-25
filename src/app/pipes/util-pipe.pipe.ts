import { Pipe, PipeTransform } from '@angular/core';
import { EUnitType } from '../model/forcast-models';

@Pipe({
  name: 'transformUnit'
})
export class TransformUnitPipe implements PipeTransform {
  transform(value: string): string {
    return value === EUnitType.METRIC ? '°C':'°F'
  }

}
