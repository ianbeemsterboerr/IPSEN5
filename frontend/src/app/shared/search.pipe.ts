import { User } from './model/user';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: User[], searchString?: string): User[]  {
    if (!items) { return[]; }
    if (!searchString) { return items; }

    searchString = searchString.toLowerCase();
    return items.filter( it => {
      return it.username.toLowerCase().includes(searchString);
    });
   }
  }


