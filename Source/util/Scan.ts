import { Socket } from 'net';
import { Range } from '../types/Range';
import { Port } from '../types/Port';

export async function Scan(ip:string,range:Range):Promise<void>{
    if(!ip.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)){
        return console.log("Introduza um endereço válido.");
    }
    const ports : Port[] = [];
    const {start,end} = range;

    if(!((start>0 && start<=65536) && (end>0 && end<=65536))){
        return console.log("As portas devem estar no intervalo de 1 e 65536");
    }
    let iterator : Range = range;
    
    if(start > end){
        range = {...range,start:end,end:start}
    }

    for(let index = iterator.start; index<=iterator.end;index++){
        const client = new Socket();
        client.setTimeout(60000);
        try{
            client.connect({host:ip,port:index},()=>{
                ports.push({port:index,state: client.readyState});
                console.log(`Porta: ${index}, Estado: ${client.readyState}`);
                client.destroy();
            });
            client.on('data',(message)=>{
                console.log(message.toString());
            })
            client.on('error',(err)=>{
                ports.push({port:index,state: client.readyState});
                console.log(`Porta: ${index}, Estado: ${client.readyState}`);
                client.destroy()
            });
            client.on('timeout',()=>{
                //console.log(`Porta: ${index}, Estado: ${client.readyState} - "Timeout"`);
                client.destroy()
            });
        }
        catch{}       
    }
}