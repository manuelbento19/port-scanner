import readline from 'readline';
import util from 'util';
import { stdin as input,stdout as output } from 'process';

const reader = readline.createInterface({input,output})
export const Question = util.promisify(reader.question).bind(reader);