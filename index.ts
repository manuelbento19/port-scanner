import { Question } from './Source/util/Question';
import { Scan } from './Source/util/Scan';

async function Get(){
    const ip : string= await Question('Endereço IP: ') as any;
    const start :number = await Question('Porta inicial: ') as any;
    const end : number = await Question('Porta final: ') as any ;

    const result = await Scan(ip,{start,end});
    console.table(result);
}

(async()=>(
 await Get()
))()