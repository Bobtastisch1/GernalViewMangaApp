import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import IconBrandAmongus from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-amongus.tsx"
import IconLego from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/lego.tsx"
import IconMoodSing from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/mood-sing.tsx"
export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <Counter start={3} />
        
        <button onClick="window.location.href='api/Numbers'" ><IconBrandAmongus class="w-9 h-9" ></IconBrandAmongus></button>
        <button onClick="window.location.href='api/Manga'" ><IconLego class="w-9 h-9" /></button>
        <button onClick="window.location.href='api/Anime'" ><IconMoodSing class="w-9 h-9" ></IconMoodSing></button>
      </div>
    </>
  );
}