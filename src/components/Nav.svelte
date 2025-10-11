<script lang="ts">
  import type { Action } from "svelte/action";
  import Button from "./common/Button.svelte";

  const showDesktopNav = () => window.matchMedia("(min-width: 48em)").matches;

  let { menuOpening = $bindable() }: { menuOpening: boolean } = $props();

  const openMenu = () => {
    document.body.style.overflow = "hidden";
    menuOpening = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMenu = () => {
    document.body.style.overflow = "";
    menuOpening = false;
  };

  const menuButtonAction: Action<HTMLButtonElement> = (button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menuOpening) closeMenu();
      else openMenu();
    });
  };

  const menuAction: Action<HTMLElement> = (menu) => {
    menu.addEventListener("click", () => {
      if (menuOpening && !showDesktopNav()) closeMenu();
    });

    (menu.querySelector("& > div") as HTMLElement).addEventListener("click", (e) => {
      e.stopPropagation();
    });

    window.addEventListener("resize", () => {
      if (showDesktopNav()) {
        closeMenu();
      }
    });

    menu.addEventListener("keydown", (e) => {
      if (!e.shiftKey && e.key === "Escape" && menuOpening) {
        closeMenu();
      }
    });
  };
</script>

<nav class="md:w-full" aria-label="Header navigation">
  <button
    class="peer group relative z-50 flex min-h-[2.0625rem] cursor-pointer flex-col items-center justify-center gap-1.5 *:h-[0.1875rem] *:w-6 *:shrink-0 *:bg-gray-950 *:transition-transform aria-expanded:gap-0 aria-expanded:*:bg-white md:hidden"
    type="button"
    aria-label="Mobile menu"
    aria-expanded={menuOpening}
    aria-controls="mobile-menu"
    use:menuButtonAction
  >
    <span class="group-aria-expanded:-mb-[0.1875rem] group-aria-expanded:rotate-45"></span>
    <span class="group-aria-expanded:hidden"></span>
    <span class="group-aria-expanded:-rotate-45"></span>
  </button>
  <div
    class="absolute inset-0 hidden items-start justify-center overflow-y-scroll bg-[hsla(0,0%,0%,0.5)] pt-24 pb-6 peer-aria-expanded:flex md:static md:block md:w-full md:overflow-auto md:bg-transparent md:p-0"
    id="mobile-menu"
    use:menuAction
  >
    <div class="w-[calc(100vw-3rem)] rounded-lg bg-purple-950 px-6 py-10 md:w-full md:bg-transparent md:p-0">
      <ul
        class="flex h-fit flex-col gap-8 text-center text-lg leading-[1.5625rem] font-bold text-white *:shrink-0 *:transition-colors md:flex-row md:items-center md:pl-[2.8125rem] md:text-[0.9375rem] md:leading-none md:text-gray-500 md:*:hover:text-gray-950"
        role="list"
      >
        <li><a href="">Features</a></li>
        <li><a href="">Pricing</a></li>
        <li><a href="">Resources</a></li>
        <li class="border-b border-gray-500 md:grow md:border-none" role="none"></li>
        <li><a href="">Login</a></li>
        <li>
          <Button
            link=""
            xClass=" pt-4 pb-[0.875rem] text-lg md:text-[0.9375rem] leading-none md:pt-3 md:pb-[0.8125rem] md:px-6"
          >
            Sign Up
          </Button>
        </li>
      </ul>
    </div>
  </div>
</nav>
