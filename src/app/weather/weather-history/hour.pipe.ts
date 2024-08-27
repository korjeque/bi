import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour',
  standalone: true
})
export class HourPipe implements PipeTransform {

  public transform(value: string): number {
    const hour = new Date(value).getHours();

    return hour;
  }

}
