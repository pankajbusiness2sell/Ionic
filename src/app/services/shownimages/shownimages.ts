
import { Injectable } from '@angular/core';
import { AccessUrlsProvider } from '../access-urls/access-urls';

/*
  Generated class for the ShownimagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShownimagesProvider {

  constructor(public accessUrlProvider: AccessUrlsProvider) {
    console.log('Hello ShownimagesProvider Provider');
  }



}
