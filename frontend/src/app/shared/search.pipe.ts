import { Team } from './model/team';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Team[], searchString?: string): Team[]  {
    if (!items) { return[]; }
    if (!searchString) { return items; }

    searchString = searchString.toLowerCase();
    return items.filter( it => {
      return it.name.toLowerCase().includes(searchString);
    });
   }
  }


