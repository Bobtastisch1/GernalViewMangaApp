import { Client } from "https://deno.land/x/postgres/mod.ts";
import { data } from "../../db/dbconnection.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import IconArrowBigLeft from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/arrow-big-left.tsx"
import IconDatabaseExport from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/database-export.tsx"
const client = await new Client(data);

interface NumbersDB {
    id:number;
    name: string;
    link: string;
    tag: string;
    read: string;
    date0: Date;
    score: number;
    art: number;
    reread: string;
    date2: Date;
    reread3: string;
    date3: Date;
    date: Date;
    active: boolean;
}

export const handler: Handlers<NumbersDB[] | null> = {
    async GET(_, ctx){
        await client.connect();
        const resp = await client.queryObject<NumbersDB>(`SELECT * FROM public."Numbers";`);
        let result: NumbersDB[] = resp.rows;
        await client.end();
       return ctx.render(result);
    }
};

export default function Page({ data }: PageProps<NumbersDB[] | null>) {
    if (!data) {
      return <h1>User not found</h1>;
    }

    return (
      <>
      <button onClick="window.location.href='..'" class="py-2"><IconArrowBigLeft class="w-9 h-9"></IconArrowBigLeft></button>
      <button onClick="window.location.href='..'" class="py-2"><IconDatabaseExport class="w-9 h-9"></IconDatabaseExport></button>
      <Head>
        <title>Numbers</title>
      </Head>
<table class="table-auto w-full text-left">
  <thead class="bg-gray-800 text-white">
    <tr>
      <th class="px-4 py-2">id</th>
      <th class="px-4 py-2">name</th>
      <th class="px-4 py-2">link</th>
      <th class="px-4 py-2">tag</th>
      <th class="px-4 py-2">read</th>
      <th class="px-4 py-2">date</th>
      <th class="px-4 py-2">score</th>
      <th class="px-4 py-2">art</th>
      <th class="px-4 py-2">reread</th>
      <th class="px-4 py-2">date2</th>
      <th class="px-4 py-2">reread3</th>
      <th class="px-4 py-2">date3</th>
      <th class="px-4 py-2">date</th>
      <th class="px-4 py-2">active</th>
    </tr>
  </thead>
  <tbody>
    {data.map((record) => (
      <tr key={record.id} class="bg-gray-100">
        <td class="border px-4 py-2">{record.id}</td>
        <td class="border px-4 py-2">{record.name}</td>
        <td class="border px-4 py-2">{record.link}</td>
        <td class="border px-4 py-2">{record.tag}</td>
        <td class="border px-4 py-2">{record.read}</td>
        <td class="border px-4 py-2">{new Date(record.date0).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{record.score}</td>
        <td class="border px-4 py-2">{record.art}</td>
        <td class="border px-4 py-2">{record.reread}</td>
        <td class="border px-4 py-2">{new Date(record.date2).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{record.reread3}</td>
        <td class="border px-4 py-2">{new Date(record.date3).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{new Date(record.date).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{record.active ? "Active" : "Inactive"}</td>
      </tr>
    ))}
  </tbody>
</table>
</>
    );
  }