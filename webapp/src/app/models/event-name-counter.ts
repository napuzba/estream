import { EventDate } from './event-date';


export interface IEventNameCounter {
    name : string;
    count : number;
}

export class EventNameCounter implements IEventNameCounter {
    constructor(name:string, count : number = 0)  {
        this._name = name;
        this._count = count;
    }

    private readonly _name : string;

    private _byDate : Map<number, number> = new Map<number, number>();
    private _count : number = 0;

    public get name() : string  {
        return this._name;
    }

    public get count() : number  {
        return this._count;
    }

    public findCountByDate( date: EventDate | null  ) : number  {
        if ( date === null ) {
            return 0;
        }
        let cc = this._byDate.get( date.hash() );
        return  cc === undefined ? 0 : cc;
    }

    public findEventCountByDate(date: EventDate ) : IEventNameCounter {
        return new EventNameCounterDate(this,date);
    }

    public add( date : Date ) : void {
        this._count += 1;
        let key = new EventDate(date).hash()
        let cc = this._byDate.get( key );
        this._byDate.set( key , cc !== undefined ? cc + 1 : 1 );
    }
}

class EventNameCounterDate implements IEventNameCounter {
    private _parent: EventNameCounter;
    private _date: EventDate;

    constructor(parent : EventNameCounter,date : EventDate )  {
        this._parent = parent;
        this._date = date;
    }
    public get name() : string  {
        return this._parent.name;
    }


    public get count() : number  {
        return this._parent.findCountByDate(this._date)
    }
}