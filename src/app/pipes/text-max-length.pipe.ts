import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textMaxLength'
})
export class TextMaxLengthPipe implements PipeTransform {

  transform(value: any) {
    if (value.length > 240) {
    	return value.slice(0,240)+"...";
    }
    return value;
  }

}
