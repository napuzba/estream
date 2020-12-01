import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventStoreService } from "../../services/event-store.service";
import * as helpers from "../../helpers";
import { EventDate } from 'src/app/models/event-date';
@Component({
  selector: 'app-event-counters',
  templateUrl: './event-counters.component.html',
  styleUrls: ['./event-counters.component.scss']
})
export class EventCountersComponent implements OnInit,OnDestroy {
  constructor(public events: EventStoreService) { }

  ngOnInit(): void {
    this.events.generate(1000);
    this.events.autoGenerate();
  }
  ngOnDestroy(): void {
    this.events.destroy();

  }
  public onFilterDateChange(event:any) {
    let value = event.target.value;
    this.events.setFilterDate( value != 0 ? EventDate.fromHash(event.target.value) : null );
  }
}
