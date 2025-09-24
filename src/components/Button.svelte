<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../utils/cn";

  interface ButtonProps {
    children?: Snippet;
    type?: HTMLButtonAttributes["type"];
    link?: string;
    xClass?: string;
    square?: boolean;
  }

  const { square, children, type = "button", link, xClass }: ButtonProps = $props();
  const className = cn(
    "bg-blue-400 rounded-full px-10 py-[1.125rem] text-xl font-bold text-white leading-none block hover:opacity-70 transition-opacity cursor-pointer",
    {
      "rounded-md": square,
    },
  );
</script>

{#if link != undefined}
  <a class={cn(className, xClass)} href={link}>{@render children?.()}</a>
{:else}
  <button class={cn(className, xClass)} {type}>{@render children?.()}</button>
{/if}
