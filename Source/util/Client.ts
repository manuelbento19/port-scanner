import { Socket, TcpNetConnectOpts } from "net";
import { Port } from "../types/Port";
import { GetService } from "./Service";

export function Client({host, port}:TcpNetConnectOpts):Promise<Port>{

    const client = new Socket();
    client.setTimeout(60000);
    let address : Port;
    return new Promise(function(resolve){
        try{
            client.connect({host,port});
            client.on('ready',async()=>{
                const service = await GetService({host,port});
                address = {...address,port,state: client.readyState,service:service}

                client.write('Who are you?');
                client.end();
            });
            client.on('data',async(message)=>{
                if(address.service==port.toString()){
                    const result = message.toString().replace(/\r/g,"").trim().split("\n");
                    address = {...address,service:result[0].split(' ')[0]}
                }
                client.destroy();
            });
            client.on('error',(err)=>{
                address = {...address,port,state: client.readyState,service:'unknow'}
                client.destroy()
            });
            client.on('timeout',()=>{
                //console.log(`Porta: ${index}, Estado: ${client.readyState} - "Timeout"`);
                client.destroy()
            });
            client.on('close',()=>{
                resolve(address);
            });
        }
        catch{
            resolve(address);
        }
    })
}