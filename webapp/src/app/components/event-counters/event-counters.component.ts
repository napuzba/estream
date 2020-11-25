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
    this.generate(100);
    this._idGenerate = window.setInterval(
      () => this.generate(helpers.random(1,25)), 1000
    )
  }
  ngOnDestroy(): void {
    if (this._idGenerate !== null ) {
      window.clearInterval(this._idGenerate);
      this._idGenerate = 0;
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

  public onFilterDateChange(event:any) {
    let value = event.target.value;
    this.events.setFilterDate( value != 0 ? EventDate.fromHash(event.target.value) : null );
  }

  // ---
  private _idGenerate = 0;
  public events : EventCounterStore = new EventCounterStore();

}
