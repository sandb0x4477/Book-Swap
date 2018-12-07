import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authors',
})
export class AuthorsPipe implements PipeTransform {
  transform(value: any[]) {
    let str = '';
    if (value.length > 1) {
      str = value.join(', ');
      return str;
    } else {
      return value;
    }
  }
}
