import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayObservable!: Observable<any>;
  public isAscendingPRICE = true;
  public isAscendingTIME = true;

  // Harcoded JSON data
  data: any = [
    {
      "company": "Vistara",
      "FROM": "New Delhi",
      "TO": "Mumbai",
      "Time": "2h 20m",
      "TAKEOFF_TIME": "17:45",
      "LANDING_TIME": "20:05",
      "PRICE": "₹7,776",
      "EMI": "No Cost EMI from ₹2,085",
      "IsREFUNDABLE": "Partially Refundable",
      "IMAGE": "https://pbs.twimg.com/media/B3B6A-7CUAAjarl.jpg"
  },
  {
      "company": "Spicejet",
      "FROM": "New Delhi",
      "TO": "Mumbai",
      "Time": "2h 15m",
      "TAKEOFF_TIME": "18:35",
      "LANDING_TIME": "20:50",
      "PRICE": "₹3,434",
      "EMI": "No Cost EMI from ₹2,592",
      "IsREFUNDABLE": "Partially Refundable",
      "IMAGE": "data:image/png;base64,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"
  },
  {
      "company": "Spicejet",
      "FROM": "New Delhi",
      "TO": "Mumbai",
      "Time": "2h 20m",
      "TAKEOFF_TIME": "17:45",
      "LANDING_TIME": "20:05",
      "PRICE": "₹3,434",
      "EMI": "No Cost EMI from ₹2,592",
      "IsREFUNDABLE": "Partially Refundable",
      "IMAGE": "data:image/png;base64,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"
  },
  {
    "company": "Vistara",
      "FROM": "New Delhi",
      "TO": "Mumbai",
      "Time": "2h 20m",
      "TAKEOFF_TIME": "17:45",
      "LANDING_TIME": "20:05",
      "PRICE": "₹4,776",
      "EMI": "No Cost EMI from ₹2,085",
      "IsREFUNDABLE": "Partially Refundable",
      "IMAGE": "https://pbs.twimg.com/media/B3B6A-7CUAAjarl.jpg"
}
  ];

  constructor(
    private router: Router,
    private api: ApiService
    ) { }

  ngOnInit(): void {
  }

  // sending data to another componenet using observable and api.
  book(flight: any){
    this.api.setDataObject(flight);
    this.router.navigate(['/booked']);
  }

  showDetails(flight: any) {
    alert("Your " + flight.company + " flight will take off from " +  flight.FROM + " To " + flight.TO + " At " + flight.TAKEOFF_TIME);
  }

  // sorting the data on the basis of price.
  sortPrice() {
    if(this.isAscendingPRICE) {
      this.data = this.data.sort(
        function(a: any, b: any) {
          if(a.PRICE < b.PRICE) return -1;
          if(b.PRICE > a.PRICE) return 1;
          
        
          return 0;
        }
      );
    } else {
      this.data = this.data.sort(
        function(a: any, b: any) {
          if(a.PRICE > b.PRICE) return -1;
          if(b.PRICE < a.PRICE) return 1;
          
          return 0;
        }
      );
    }
    this.isAscendingPRICE = !this.isAscendingPRICE;
  }

  // sorting the data on the basis of duration
  sortDuration() {
    if(this.isAscendingTIME) {
      this.data = this.data.sort(
        function(a: any, b: any) {
          if(a.Time < b.Time) return -1;
          if(b.Time > a.Time) return 1;
          
        
          return 0;
        }
      );
    } else {
      this.data = this.data.sort(
        function(a: any, b: any) {
          if(a.Time > b.Time) return -1;
          if(b.Time < a.Time) return 1;
          
          return 0;
        }
      );
    }
    this.isAscendingTIME = !this.isAscendingTIME;
    // console.log(this.data[0].TAKEOFF_TIME.slice(0, -3));
    // console.log(this.data[0].LANDING_TIME.slice(0, -3));
    // console.log(this.data[0].TIME.substring(3));
  }

}
