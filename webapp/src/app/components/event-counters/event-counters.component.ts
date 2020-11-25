import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventCounterStore } from "../../models/event-counter-store";
import * as helpers from "../../helpers";
import { EventDate } from 'src/app/models/event-date';
@Component({
  selector: 'app-event-counters',
  templateUrl: './event-counters.component.html',
  styleUrls: ['./event-counters.component.scss']
})
export class EventCountersComponent implements OnInit,OnDestroy {
  constructor() { }

  ngOnInit(): void {
    /*
    this.generate(100);
    this._idGenerate = window.setInterval(
      () => this.generate(helpers.random(1,25)), 1000
    )
    */
    this._idGenerate = window.setInterval(
      () => this.generate1(helpers.random(1,25)), 1000
    );
    this.conn = new WebSocket('ws://localhost:8080');
    this.conn.onopen = () => { console.log("Connection established!") };
    this.conn.onmessage = (ee: any) => {
      console.log(ee.data);
      return this.events.add( 'Event' + (ee.data.toString().padStart(2,'0')) , new Date() );
    }
  }
  ngOnDestroy(): void {
    if (this._idGenerate !== null ) {
      window.clearInterval(this._idGenerate);
      this._idGenerate = 0;
    }
    if (this.conn) {
      this.conn.close();
    }
  }

  private generate( numEvents: number) : void {
    for ( let aa = 0; aa < numEvents ; aa++ ) {
      this.events.add(
        'Event' + (helpers.random(1,20)).toString().padStart(2,'0') ,
        new Date(
          helpers.random(2020,2020,true),
          helpers.random(0,1),
          helpers.random(0,11),
          helpers.random(0,25),
          helpers.random(0,60),
          helpers.random(0,60),
        )
      );
    }
  }
  private generate1(numEvents:number) : void {
    for ( let aa = 0; aa < numEvents ; aa++ ) {
      this.conn.send( helpers.random(1,20) );
    }

  }


  public onFilterDateChange(event:any) {
    let value = event.target.value;
    this.events.setFilterDate( value != 0 ? EventDate.fromHash(event.target.value) : null );
  }

  // ---
  private _idGenerate = 0;
  private conn : any;
  public events : EventCounterStore = new EventCounterStore();

}
