import { Range } from '../types/Range';
import { Port } from '../types/Port';
import { Client } from './Client';

export async function Scan(ip:string,range:Range){
    if(!ip.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)){
        return console.log("Introduza um endereço válido.");
    }
    const ports : Port[] = [];
    const {start,end} = range;
    
    if(!((start>0 && start<=65536) && (end>0 && end<=65536))){
        return {error: "As portas devem estar no intervalo de 1 e 65536"};
    }
    
    let iterator : Range = range;

    if(start > end){
        range = {...range,start:end,end:start}
    }
    for(let index = iterator.start; index<=iterator.end;index++){
        const result = await Client({host:ip,port:index})
        ports.push(result)
    }
    return ports;
    
}