import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-fligh-booked',
  templateUrl: './fligh-booked.component.html',
  styleUrls: ['./fligh-booked.component.css']
})
export class FlighBookedComponent implements OnInit {


  bookedFlight = {
    "company": "Spicejet",
      "FROM": "New Delhi",
      "TO": "Mumbai",
      "Time": "2h 20m",
      "TAKEOFF_TIME": "17:45",
      "LANDING_TIME": "20:05",
      "PRICE": "₹7,776",
      "EMI": "No Cost EMI from ₹2,592",
      "IsREFUNDABLE": "Partially Refundable",
     };
  private localKey = "val";
  val = new BehaviorSubject(localStorage.getItem(this.localKey)??{});
  constructor(private api: ApiService) {}


  ngOnInit(): void {
    
    this.api.getDataObject().subscribe(res => {
      console.log(res);
      this.bookedFlight = res;
    });

  }

}
