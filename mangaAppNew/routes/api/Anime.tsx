import { Client } from "https://deno.land/x/postgres/mod.ts";
import { data } from "../../db/dbconnection.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import IconArrowBigLeft from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/arrow-big-left.tsx"
import IconDatabaseExport from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/database-export.tsx"

const client = await new Client(data);

interface AnimeDB {
    id: number;
    name: string;
    plan: number;
    watched: string;
    score: number;
    comment: string;
    watched2: string;
    score2: number;
    date: Date;
    active: boolean;
} 

export const handler: Handlers<AnimeDB[] | null> = {
    async GET(_, ctx){
        await client.connect();
        const resp = await client.queryObject<AnimeDB>(`SELECT * FROM public."Anime";`);
        let result: AnimeDB[] = resp.rows;
        await client.end();
       return ctx.render(result);
    }
};


export default function Page({ data }: PageProps<AnimeDB[] | null>) {
    if (!data) {
      return <h1>User not found</h1>;
    }
    return (
      <>
      <button onClick="window.location.href='..'" class="py-2"><IconArrowBigLeft class="w-9 h-9"></IconArrowBigLeft></button>
      <button onClick="window.location.href='..'" class="py-2"><IconDatabaseExport class="w-9 h-9"></IconDatabaseExport></button>
      
      <Head>
        <title>Anime</title>
      </Head>
<table class="table-auto w-full text-left">
  <thead class="bg-gray-800 text-white">
    <tr>
      <th class="px-4 py-2">id</th>
      <th class="px-4 py-2">name</th>
      <th class="px-4 py-2">plan</th>
      <th class="px-4 py-2">watched</th>
      <th class="px-4 py-2">score</th>
      <th class="px-4 py-2">comment</th>
      <th class="px-4 py-2">watched2</th>
      <th class="px-4 py-2">score2</th>
      <th class="px-4 py-2">date</th>
      <th class="px-4 py-2">active</th>
    </tr>
  </thead>
  <tbody>
    {data.map((record) => (
      <tr key={record.id} class="bg-gray-100">
        <td class="border px-4 py-2">{record.id}</td>
        <td class="border px-4 py-2">{record.name}</td>
        <td class="border px-4 py-2">{(() => {
            switch (record.plan) {
              case 1:
                return "Finished";
              case 2:
                return "Planned to Watch";
              case 3:
                return "Watching";
              default:
                return record.plan;
            }
            })()}
        </td>
        <td class="border px-4 py-2">{record.watched}</td>
        <td class="border px-4 py-2">{record.score === -1 ? "" : record.score}</td>
        <td class="border px-4 py-2">{record.comment}</td>
        <td class="border px-4 py-2">{record.watched2}</td>
        <td class="border px-4 py-2">{record.score2 === -1 ? "" : record.score2}</td>
        <td class="border px-4 py-2">{new Date(record.date).toLocaleDateString("de-DE")}</td>
        <td class="border px-4 py-2">{record.active ? "Active" : "Inactive"}</td>
      </tr>
    ))}
  </tbody>
</table>
</>
    );
  }