// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/api/Anime.tsx";
import * as $2 from "./routes/api/Manga.tsx";
import * as $3 from "./routes/api/Numbers.tsx";
import * as $4 from "./routes/api/joke.ts";
import * as $5 from "./routes/index.tsx";
import * as $$0 from "./islands/Counter.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/api/Anime.tsx": $1,
    "./routes/api/Manga.tsx": $2,
    "./routes/api/Numbers.tsx": $3,
    "./routes/api/joke.ts": $4,
    "./routes/index.tsx": $5,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
