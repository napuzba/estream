export class EventDate {
    public constructor( date : Date ) {
        this._date = date;
    }

    public hash() : number{
        return (10000 * ( this._date.getFullYear() )  )+
               (  100 * ( this._date.getMonth()+1  )  )+
               (    1 * ( this._date.getDate()      )  );
    }

    public static fromHash(hash : number) : EventDate {
        let day   = (hash % 100);
        let month = ((hash / 100) % 100) - 1;
        let year  = (hash / 10000);
        console.log( new Date(year,month,day));

        return new EventDate( new Date(year,month,day));
    }

    public str() {
        let year  = (this._date.getFullYear() ).toString();
        let month = (1 + this._date.getMonth()).toString().padStart(2,'0');
        let day   = (1 + this._date.getDate()  ).toString().padStart(2,'0');
        return `${year}-${month}-${day}`;
    }
    private _date : Date ;
}