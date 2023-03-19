import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';
import NumbersClass from './NumbersClass.ts';

import { Client } from "https://deno.land/x/postgres/mod.ts";
import { data } from "../db/dbconnection.ts";
const client = await new Client(data);


const wb = XLSX.readFile('D:/Desktop/Numbers.xlsx',{cellDates:true});

const ws = wb.Sheets["Sheet1"];

const xlsxData = XLSX.utils.sheet_to_json(ws);

const rows: NumbersClass[] = [];
xlsxData.forEach(row => {
    const numbers:NumbersClass = new NumbersClass(row);
    rows.push(numbers);
 });

 try {
    await client.connect();
    setTimeout(() => {
       const result = insertData(rows);
   }, 2000);
 } catch (error) {
    console.log(error);
 }

 async function insertData(datarows:NumbersClass[]):Promise<void>{
    let rows: string = '';
 
    for(let i = 0 ; i < datarows.length; i++){
       const number:NumbersClass = datarows[i];
       if(number.reread == undefined){
        number.reread = '';
       }
       if(number.date2 == undefined){
        number.date2 =  new Date('2000-01-01');
       }
       if(number.reread3 == undefined){
        number.reread3 = '';
       }
       if(number.date3 == undefined){
        number.date3 = new Date('2000-01-01');
       }
      
       const currentValue = `('${i + 1}','${number.name}','${number.link}','${number.tag}','${number.read}','${number.date.toISOString().slice(0,10)}','${number.score}','${number.art}','${number.reread}','${number.date2.toISOString().slice(0,10)}','${number.reread3}','${number.date3.toISOString().slice(0,10)}','${new Date().toISOString().slice(0,10)}','${true}'),`;
       rows += currentValue;
    }
    if(rows.endsWith(',')){
       rows = rows.slice(0, rows.length -1);
   }
   await client.queryObject(`INSERT INTO public."Numbers"(id,name, link, tag, read, date0, score, art,reread,date2,reread3,date3,date,active) VALUES ${rows};`);
   client.end();
}





