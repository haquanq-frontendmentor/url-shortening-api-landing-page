<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../utils/cn";

  type ButtonProps = {
    children?: Snippet;
    type?: HTMLButtonAttributes["type"];
    link?: string;
    xClass?: string;
    square?: boolean;
    onClick?: (e: Event) => void;
  };

  const { square, children, type = "button", link, xClass, onClick }: ButtonProps = $props();
  const className = cn(
    "bg-blue-400 rounded-full px-10 py-[1.125rem] text-xl font-bold text-white leading-none block hover:opacity-70 transition-opacity cursor-pointer",
    {
      "rounded-md": square,
    },
  );
</script>

{#if link !== undefined}
  <a class={cn(className, xClass)} href={link} onclick={onClick}>{@render children?.()}</a>
{:else}
  <button class={cn(className, xClass)} {type} onclick={onClick}>{@render children?.()}</button>
{/if}
