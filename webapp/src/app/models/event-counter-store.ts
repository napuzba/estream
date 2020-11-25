import { EventDate } from './event-date';
import { EventNameCounter , IEventNameCounter } from "./event-name-counter";
import { EventDateCounter } from "./event-date-counter";

import { EventManager } from '@angular/platform-browser';

export class EventCounterStore {
    public constructor() {
    }
    public readonly byName  : Map<string, EventNameCounter> = new Map<string, EventNameCounter>();
    public readonly byDate  : Map<number, EventDateCounter> = new Map<number, EventDateCounter>();

    add( name : string , date : Date ) : void {
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

    setFilterDate(date: EventDate | null ) {
        this.filterDate = date;
    }

    // ---
    public filterDate : EventDate | null = null;


}