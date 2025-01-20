import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorting'
})
export class ShortingPipe implements PipeTransform {

  transform(value: string, args: number): string {
    if(value !== null){
      return value.length > args ? value.substr(0, args) + '...' : value;
    }
    return '';
  }

}
