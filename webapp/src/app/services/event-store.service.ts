import { Injectable } from '@angular/core';
import { EventDate } from '../models/event-date';
import { EventDateCounter } from '../models/event-date-counter';
import { EventNameCounter, IEventNameCounter } from '../models/event-name-counter';
import * as helpers from "../helpers";

@Injectable({
  providedIn: 'root'
})
export class EventStoreService {
  public constructor() {
  }
  public readonly byName  : Map<string, EventNameCounter> = new Map<string, EventNameCounter>();
  public readonly byDate  : Map<number, EventDateCounter> = new Map<number, EventDateCounter>();

  public add( name : string , date : Date ) : void {
      let edate : EventDate = new EventDate(date);

      let ec = this.byName.get(name);
      if ( ec === undefined ) {
          ec = new EventNameCounter(name);
          this.byName.set( name, ec );
      }

      let ed = this.byDate.get(edate.hash());
      if ( ed === undefined ) {
          ed = new EventDateCounter(edate);
          this.byDate.set(edate.hash(), ed );
      }
      ec.add(date);
      ed.add();
  }

  public all() : IEventNameCounter[] {
      let events : EventNameCounter[] = [... this.byName.values() ];
      if ( this.filterDate === null ) {
          return events.sort( (aa,bb) => -(aa.count - bb.count ));
      }
      let events1 = events
        .map( event => event.findEventCountByDate((this.filterDate!)))
      return events1.sort( (aa,bb) => -(aa.count - bb.count ));
  }


  public dates() {
      return [ ... this.byDate.values()]
  }

  public setFilterDate(date: EventDate | null ) {
      this.filterDate = date;
  }

  public generate( numEvents: number) : void {
    for ( let aa = 0; aa < numEvents ; aa++ ) {
      this.add(
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

  public generateByWs(numEvents:number) : void {
    for ( let aa = 0; aa < numEvents ; aa++ ) {
      this.conn.send( helpers.random(1,20) );
    }
  }

  public destroy() {
    if (this._idGenerate !== null ) {
      window.clearInterval(this._idGenerate);
      this._idGenerate = 0;
    }
    if (this.conn) {
      this.conn.close();
    }
  }

  public autoGenerate() {
    this._idGenerate = window.setInterval(
      () => this.generate(helpers.random(1,25)), 1000
    )
  }

  public autoGenerateWs() {
    this._idGenerate = window.setInterval(
      () => this.generateByWs(helpers.random(1,25)), 1000
    );
    this.conn = new WebSocket('ws://localhost:8080');
    this.conn.onopen = () => {
        console.log("Connection established!")
    };
    this.conn.onmessage = (ee: any) => {
      console.log(ee.data);
      return this.add( 'Event' + (ee.data.toString().padStart(2,'0')) , new Date() );
    }
  }
  private _idGenerate = 0;
  private conn : any;




  // ---
  public filterDate : EventDate | null = null;

}
