import { Client } from "https://deno.land/x/postgres/mod.ts";
import { data } from "../../db/dbconnection.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import IconArrowBigLeft from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/arrow-big-left.tsx"
const client = await new Client(data);

interface MangaDB {
    id: number;
    name: string;
    chapter: string;
    score: number;
    date0: Date;
    weblist: string;
    date1: Date;
    chapter1: string;
    date2: Date;
    chapter2: string;
    date3: Date;
    chapter3: string;
    date4: Date;
    chapter4: string;
    date: Date;
    active: boolean;
}

export const handler: Handlers<MangaDB[] | null> = {
    async GET(_, ctx){
        await client.connect();
        const resp = await client.queryObject<MangaDB>(`SELECT * FROM public."Manga";`);
        let result: MangaDB[] = resp.rows;
        await client.end();
       return ctx.render(result);
    }
};

export default function Page({ data }: PageProps<MangaDB[] | null>) {
    if (!data) {
      return <h1>User not found</h1>;
    }
    
    return (
      <>
      <button onClick="window.location.href='..'" class="py-2"><IconArrowBigLeft class="w-9 h-9"></IconArrowBigLeft></button>
      <Head>
        <title>Manga</title>
      </Head>
<table class="table-auto w-full text-left">
  <thead class="bg-gray-800 text-white">
    <tr>
      <th class="px-4 py-2">id</th>
      <th class="px-4 py-2">name</th>
      <th class="px-4 py-2">chapter</th>
      <th class="px-4 py-2">score</th>
      <th class="px-4 py-2">date</th>
      <th class="px-4 py-2">weblist</th>
      <th class="px-4 py-2">date1</th>
      <th class="px-4 py-2">chapter1</th>
      <th class="px-4 py-2">date2</th>
      <th class="px-4 py-2">chapter2</th>
      <th class="px-4 py-2">date3</th>
      <th class="px-4 py-2">chapter3</th>
      <th class="px-4 py-2">date3</th>
      <th class="px-4 py-2">chapter4</th>
      <th class="px-4 py-2">date</th>
      <th class="px-4 py-2">active</th>
    </tr>
  </thead>
  <tbody>
    {data.map((record) => (
      <tr key={record.id} class="bg-gray-100">
        <td class="border px-4 py-2">{record.id}</td>
        <td class="border px-4 py-2">{record.name}</td>
        <td class="border px-4 py-2">{record.chapter}</td>
        <td class="border px-4 py-2">{record.score === -1 ? "" : record.score}</td>
        <td class="border px-4 py-2">{new Date(record.date0).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{record.weblist}</td>
        <td class="border px-4 py-2">{new Date(record.date1).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{record.chapter1}</td>
        <td class="border px-4 py-2">{new Date(record.date2).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{record.chapter2}</td>
        <td class="border px-4 py-2">{new Date(record.date3).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{record.chapter3}</td>
        <td class="border px-4 py-2">{new Date(record.date4).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{new Date(record.date).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{record.active}</td>
      </tr>
    ))}
  </tbody>
</table>
</>
    );
  }