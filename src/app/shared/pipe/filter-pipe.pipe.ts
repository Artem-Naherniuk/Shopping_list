import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any[], search: string): any[] {
    if (!items) { return []; }
    if (!search) { return items; };

    return items.filter(item => item.product_name.includes(search.toLocaleLowerCase()));

}
}


