import { EventDate } from './event-date';
export class EventDateCounter {
    constructor( date:EventDate )  {
        this.date = date;

    }
    public readonly date : EventDate;
    private _count : number = 0;

    public get count() : number  {
        return this._count;
    }

    public add() : void {
        this._count += 1;
    }

    public hash() : number {
        return this.date.hash()
    }
    public str() {
        return `${this.date.str()} - ( ${this._count} )`
    }
}
