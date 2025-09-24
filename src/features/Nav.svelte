<script lang="ts">
  import type { Action } from "svelte/action";
  import Container from "../layouts/Container.svelte";
  import SiteLogo from "../assets/images/logo.svg";
  import Button from "../components/Button.svelte";

  const showDesktopNav = () => window.matchMedia("(min-width: 48em)").matches;

  let menuOpening = $state(showDesktopNav());

  const menuButtonAction: Action<HTMLButtonElement> = (button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      menuOpening = !menuOpening;
    });
  };

  const menuAction: Action<HTMLElement> = (menu) => {
    window.addEventListener("click", () => {
      if (menuOpening && !showDesktopNav()) menuOpening = false;
    });
    window.addEventListener("resize", () => {
      if (showDesktopNav()) {
        menuOpening = false;
      }
    });
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  };
</script>

<nav>
  <Container>
    <div class="relative flex items-center justify-between pt-10 pb-6 md:pt-12">
      <a href="/" aria-current="page">
        <img src={SiteLogo} alt="Homepage" />
      </a>
      <button
        class="peer group flex min-h-[2.0625rem] cursor-pointer flex-col items-center justify-center gap-1.5 *:h-[0.1875rem] *:w-6 *:shrink-0 *:bg-gray-950 *:transition-transform aria-expanded:gap-0 md:hidden"
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
        class="absolute top-full left-3/6 hidden w-[min(100vw-3rem,25rem)] -translate-x-2/4 rounded-lg bg-purple-950 px-6 py-10 peer-aria-expanded:block md:static md:inset-0 md:block md:w-full md:translate-x-0 md:bg-transparent md:p-0"
        id="mobile-menu"
        use:menuAction
      >
        <ul
          class="flex h-fit flex-col gap-8 text-center text-lg leading-[1.5625rem] font-bold text-white *:shrink-0 *:transition-colors md:flex-row md:items-center md:pl-[2.8125rem] md:text-[0.9375rem] md:leading-none md:text-gray-500 md:*:hover:text-gray-950"
          role="list"
        >
          <li><a href="/">Features</a></li>
          <li><a href="/">Pricing</a></li>
          <li><a href="/">Resources</a></li>
          <li class="border-b border-gray-500 md:grow md:border-none" role="none"></li>
          <li><a href="/">Login</a></li>
          <li>
            <Button
              link="/"
              xClass=" pt-4 pb-[0.875rem] text-lg md:text-[0.9375rem] leading-none md:pt-3 md:pb-[0.8125rem] md:px-6"
            >
              Sign Up
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </Container>
</nav>
