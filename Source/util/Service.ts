import dns from 'dns';
import { TcpNetConnectOpts } from 'net';
import util from 'util';
const Service = util.promisify(dns.lookupService);

export async function GetService({host, port}:TcpNetConnectOpts){
    try{
        const result = await Service(host as string,port);
        return result.service;
    }
    catch{
        return "unknow"
    }
}