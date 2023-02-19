import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';
import Anime from './AnimeClass.ts';

import { Client } from "https://deno.land/x/postgres/mod.ts";
import { data } from "../db/dbconnection.ts";
const client = await new Client(data);


const wb = XLSX.readFile('D:/Desktop/Anime.xlsx');

const ws = wb.Sheets["Sheet1"];

const xlsxData = XLSX.utils.sheet_to_json(ws);

const rows: Anime[] = [];

xlsxData.forEach(row => {
   const anime:Anime = new Anime(row);
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

async function insertData(datarows:Anime[]):Promise<void>{
   let rows: string = '';

   for(let i = 0 ; i < datarows.length; i++){
      const anime:Anime = datarows[i];
      if(anime.score == undefined){
         anime.score = -1;
      }
      if(anime.comment == undefined){
         anime.comment = '';
      }
      if(anime.watched == undefined){
         anime.watched = '';
      }
      if(anime.score2 == undefined){
         anime.score2 = -1;
      }
      if(anime.watched2 == undefined){
         anime.watched2 = '';
      }
      const currentValue = `('${i + 1}','${anime.name}','${anime.plan}','${anime.watched}','${anime.score}','${anime.comment}','${anime.watched2}','${anime.score2}','${new Date().toISOString().slice(0,10)}','${true}'),`;
      rows += currentValue;
   }
   if(rows.endsWith(',')){
      rows = rows.slice(0, rows.length -1);
  }
   await client.queryObject(`INSERT INTO public."Anime"(id,name, plan, watched, score, comment, watched2, score2,date,active) VALUES ${rows};`);
}