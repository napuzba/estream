export function random(min:number , max:number, withMax : boolean = false) : number{
    let range = max-min + (withMax ? 1 : 0);
    return min + Math.floor( range * Math.random() );
}