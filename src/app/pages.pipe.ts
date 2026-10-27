import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pages',
})
export class PagesPipe implements PipeTransform {
  transform(pagesCount: number): string {
    return String(pagesCount) + 'Pages';
  }
}
