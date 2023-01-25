import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NumtoarrayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'numtoarray',
})
export class NumtoarrayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    console.log('-----------');
    console.log(value);
    return this.numToArrayBuild(value);
  }

  numToArrayBuild(value: number) {
    return (value > 0) ? Array(value) : 0;
  }
}
