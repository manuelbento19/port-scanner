import { Question } from './Source/util/Question';
import { Scan } from './Source/util/Scan';

async function Get(){
    const ip = await Question('Endereço IP: ') as any as string;
    const start = await Question('Porta inicial: ') as any as number;
    const end = await Question('Porta final: ') as any as number;

    await Scan(ip,{start,end});
}
Get();