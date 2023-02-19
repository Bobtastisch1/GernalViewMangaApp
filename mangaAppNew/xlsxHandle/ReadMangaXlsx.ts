import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';
import Manga from './MangaClass.ts';

import { Client } from "https://deno.land/x/postgres/mod.ts";
import { data } from "../db/dbconnection.ts";

const client = await new Client(data);


const wb = XLSX.readFile('D:/Desktop/Manga.xlsx',{cellDates:true});

const ws = wb.Sheets["Sheet1"];

const xlsxData = XLSX.utils.sheet_to_json(ws);

const rows: Manga[] = [];

xlsxData.forEach(row => {
    const anime:Manga = new Manga(row);
    rows.push(anime);
 });
 
 try {
    await client.connect();
    setTimeout(() => {
       const result = insertData(rows);
   }, 2000);
 } catch (error) {
    console.log(error);
 }
 
 async function insertData(datarows:Manga[]):Promise<void>{
    let rows: string = '';

    
   for(let i = 0 ; i < datarows.length; i++){
    const manga:Manga = datarows[i];
    if(manga.score == undefined) manga.score = -1;  
    if(manga.chapter == undefined) manga.chapter = '';
    if(manga.score == undefined) manga.score = -1;
    if(manga.date0 == undefined) manga.date0 = new Date('2000-01-01');
    if(manga.weblist == undefined) manga.weblist = '';
    if(manga.date1 == undefined)  manga.date1 =  new Date('2000-01-01');
    if(manga.chapter1 == undefined) manga.chapter1 = '';
    if(manga.date2 == undefined)  manga.date2 =  new Date('2000-01-01');
    if(manga.chapter2 == undefined) manga.chapter2 = '';
    if(manga.date3 == undefined)  manga.date3 =  new Date('2000-01-01');
    if(manga.chapter3 == undefined) manga.chapter3 = '';
    if(manga.date4 == undefined)  manga.date4 =  new Date('2000-01-01');
    if(manga.chapter4 == undefined) manga.chapter4 = '';

    const currentValue = `('${i + 1}','${manga.name}','${manga.chapter}','${manga.score}','${manga.date0.toISOString().slice(0,10)}','${manga.weblist}','${manga.date1.toISOString().slice(0,10)}','${manga.chapter1}','${manga.date2.toISOString().slice(0,10)}','${manga.chapter2}','${manga.date3.toISOString().slice(0,10)}','${manga.chapter3}','${manga.date4.toISOString().slice(0,10)}','${manga.chapter4}','${new Date().toISOString().slice(0,10)}','${true}'),`;
    rows += currentValue;
    console.log(currentValue);
    
 }
 if(rows.endsWith(',')){
    rows = rows.slice(0, rows.length -1);
}
 await client.queryObject(`INSERT INTO public."Manga"(id,name,chapter,score,date0,weblist,date1,chapter1,date2,chapter2,date3,chapter3,date4,chapter4,date,active) VALUES ${rows};`);

 }