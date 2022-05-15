import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPrice'
})
export class SortPricePipe implements PipeTransform {

  isAscending = true;

  transform(data: [], order: number): [] {
    if(this.isAscending) {
      data = data.sort(
        function(a: any, b: any) {
          if(a.PRICE < b.PRICE) return -1;
          if(b.PRICE > a.PRICE) return 1;
          
        
          return 0;
        }
      );
    } else {
      data = data.sort(
        function(a: any, b: any) {
          if(a.PRICE > b.PRICE) return -1;
          if(b.PRICE < a.PRICE) return 1;
          
          return 0;
        }
      );
    }
    this.isAscending = !this.isAscending;
    return data;
  }
}
