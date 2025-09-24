<script lang="ts">
  import type { Action } from "svelte/action";
  import SiteLogo from "../assets/images/logo.svg";
  import Button from "../components/Button.svelte";
  import Container from "../layouts/Container.svelte";

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
    <div class="flex justify-between pt-10 pb-6 relative items-center md:pt-12">
      <a href="/" aria-current="page">
        <img src={SiteLogo} alt="Homepage" />
      </a>
      <button
        class="peer *:w-6 *:h-[0.1875rem] *:bg-gray-950 *:shrink-0 flex justify-center items-center gap-1.5 flex-col min-h-[2.0625rem] cursor-pointer group *:transition-transform aria-expanded:gap-0 md:hidden"
        type="button"
        aria-label="Mobile menu"
        aria-expanded={menuOpening}
        aria-controls="mobile-menu"
        use:menuButtonAction
      >
        <span class="group-aria-expanded:rotate-45 group-aria-expanded:-mb-[0.1875rem]"></span>
        <span class="group-aria-expanded:hidden"></span>
        <span class="group-aria-expanded:-rotate-45"></span>
      </button>
      <div
        class="hidden peer-aria-expanded:block absolute top-full left-3/6 -translate-x-2/4 rounded-lg bg-purple-950 w-[min(100vw-3rem,25rem)] px-6 py-10 md:static md:translate-x-0 md:bg-transparent md:p-0 md:w-full md:inset-0 md:block"
        id="mobile-menu"
        use:menuAction
      >
        <ul
          class="text-white *:shrink-0 font-bold leading-[1.5625rem] text-lg flex flex-col gap-8 text-center md:flex-row md:text-gray-500 md:text-[0.9375rem] md:leading-none h-fit md:items-center md:pl-[2.8125rem] md:*:hover:text-gray-950 *:transition-colors"
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
              >Sign Up</Button
            >
          </li>
        </ul>
      </div>
    </div>
  </Container>
</nav>
