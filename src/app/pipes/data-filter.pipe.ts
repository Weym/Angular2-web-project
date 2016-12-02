import { Pipe, PipeTransform } from '@angular/core';

import * as _ from "lodash";

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

    transform(array: any[], query: string, otherquery:string): any {
    	console.log(query);
    	console.log(otherquery);
        if (query) {
            return _.filter(array, row=>row[otherquery].indexOf(query) > -1);
        }
        return array;
    }

}
