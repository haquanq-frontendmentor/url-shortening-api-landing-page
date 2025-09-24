<script lang="ts">
  import type { Action } from "svelte/action";
  import Button from "../components/Button.svelte";
  import { copyToClipboard } from "../utils/copyToClipboard";
  import { cn } from "../utils/cn";
  import Container from "../layouts/Container.svelte";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  const LOCAL_STORAGE_ITEM_KEY = "shortened-urls";

  type SpooResponse = { domain: string; original_url: string; short_url: string };
  type SpooErrorResponse = { error: string; message: string };

  type ShortenedURL = { link: string; shortened: string; copied: boolean };

  const shortenedURLs = $state<Array<ShortenedURL>>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_KEY) || "[]") as Array<ShortenedURL>,
  );
  let errorMessage = $state<string>("");

  const getShortenedUrl = async (url: string): Promise<string> => {
    return "Haha";
    const response = await fetch("https://spoo.me", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ url }),
    });

    if (response.status === 400) {
      throw new Error("Please provide a valid URL.");
    } else if (response.status === 429) {
      throw new Error("You have reached your request limit for today!");
    }

    const data = (await response.json()) as SpooResponse;
    return data.short_url;
  };

  const saveShortenedURL = (link: string, shortened: string) => {
    shortenedURLs.splice(0, 0, { link, shortened, copied: false });
    shortenedURLs.splice(4, shortenedURLs.length - 4);
    localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(shortenedURLs));
  };

  const isValidURL = (url: string) => {
    const urlRegex = /^(https?):\/\//;
    return urlRegex.test(url);
  };

  const handleCopyClick = (shortenedLink: string, index: number) => {
    copyToClipboard(shortenedLink);
    shortenedURLs[index].copied = true;
    setTimeout(() => {
      shortenedURLs[index].copied = false;
    }, 5000);
  };

  const validateInput = (input: HTMLInputElement) => {
    if (input.value === "") errorMessage = "Please add a link.";
    else if (isValidURL(input.value) === false) errorMessage = "Please use a valid link.";
    else errorMessage = "";
  };

  const formAction: Action<HTMLFormElement> = (form) => {
    const input = form.querySelector("#url-input") as HTMLInputElement;

    input.addEventListener("blur", () => validateInput(input));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      validateInput(input);

      if (errorMessage === "") {
        const formData = new FormData(form);
        const originalURL = formData.get("url") as string;

        getShortenedUrl(originalURL)
          .then((shortenedURL) => {
            saveShortenedURL(originalURL, shortenedURL);
          })
          .catch((err) => {
            if (err instanceof Error) {
              errorMessage = err.message;
            }
          });
      }
    });
  };
</script>

{#snippet Result(link: string, shortened: string, index: number)}
  <li
    class="rounded-lg bg-white p-4 text-base md:flex md:items-center md:justify-between md:gap-x-8 md:pr-6 md:pl-8"
    in:fly={{ y: -20 }}
  >
    <a class="block max-w-full truncate" href={link}>{link}</a>
    <span class="my-4 block border-b border-gray-400 md:hidden"></span>
    <div class="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6 md:text-end">
      <a class="block max-w-full truncate text-blue-400" href={shortened}>{shortened}</a>
      <Button
        square
        xClass={cn(
          "text-base w-full md:w-[6.4375rem] md:px-0 leading-none py-3",
          shortenedURLs[index].copied && "bg-purple-950",
        )}
        onClick={() => handleCopyClick(shortened, index)}
      >
        {shortenedURLs[index].copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  </li>
{/snippet}

<section class="relative -top-21">
  <h2 class="sr-only">Shorten your URL here</h2>
  <form
    class="flex flex-wrap gap-x-6 gap-y-4 rounded-lg bg-purple-950 px-[clamp(1.5rem,0.0555rem+6.1633vw,4rem)] py-[clamp(1.5rem,0.4888rem+4.3143vw,3.25rem)] md:text-xl"
    novalidate
    use:formAction
  >
    <label class="sr-only" for="url-input">Your URL</label>
    <div class="relative grow-[100]">
      <div class="relative h-[clamp(3rem,2.4222rem+2.4653vw,4rem)] rounded-md">
        <input
          class="h-full w-full rounded-[inherit] bg-white px-6 md:rounded-lg"
          id="url-input"
          type="text"
          name="url"
          required
          placeholder="Shorten a link here..."
          aria-invalid="false"
          aria-describedby="url-input-hint"
        />
        <span
          class={cn(
            "pointer-events-none absolute inset-0 rounded rounded-[inherit] border-2 border-transparent",
            errorMessage !== "" && "border-red-400",
          )}
        ></span>
      </div>
      <span
        class="mt-2 block text-sm text-red-400 md:absolute md:left-0 md:text-base"
        id="url-input-hint"
        hidden={errorMessage === ""}>{errorMessage}</span
      >
    </div>
    <Button
      xClass="text-lg leading-none grow py-[0.9375rem] h-[clamp(3rem,2.4222rem+2.4653vw,4rem)] md:text-xl md:max-w-[11.75rem] md:rounded-lg"
      square
      type="submit">Shorten It!</Button
    >
  </form>
  <ul class="grid max-w-full grid-cols-1 gap-6 pt-6 md:gap-4" role="list">
    {#each shortenedURLs as item, index (item)}
      {@render Result(item.link, item.shortened, index)}
    {/each}
  </ul>
</section>
