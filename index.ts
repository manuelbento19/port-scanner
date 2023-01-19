import { Port } from './Source/types/Port';
import { Question } from './Source/util/Question';
import { Scan } from './Source/util/Scan';

async function Get(){
    const ip : string= await Question('Endereço IP: ') as any;
    const start :number = await Question('Porta inicial: ') as any;
    const end : number = await Question('Porta final: ') as any ;
    const result = await Scan(ip,{start,end}) as Port[];
    if(result && result.length>0){
        console.table(result);
        const openedPorts = result.filter(port=>port.state=='open').length || 0;
        const closedPorts = result.filter(port=>port.state!='open').length || 0;
        console.log(`Total de portas: ${result.length}`)
        console.log(`Total de portas abertas: ${openedPorts}`)
        console.log(`Total de portas fechadas: ${closedPorts}`)

    }
   process.exit();
}

(async()=>(
 await Get()
))()