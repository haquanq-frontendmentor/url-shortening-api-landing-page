<script>
  import { BoostDesktopBackground, BoostMobileBackground } from "../assets/images";
  import Button from "./common/Button.svelte";
</script>

<section
  class="relative flex flex-col items-center gap-6 overflow-hidden bg-purple-950 pt-26 pb-22 md:pt-[4.0625rem] md:pb-[3.5625rem]"
>
  <img class="absolute top-0 right-0 bottom-0 md:hidden" src={BoostMobileBackground} alt="" />
  <img class="absolute inset-0 hidden max-w-[200%] object-cover md:block" src={BoostDesktopBackground} alt="" />
  <h2 class="z-10 text-[clamp(1.75rem,1.3166rem+1.849vw,2.5rem)] leading-none font-bold tracking-tight text-white">
    Boost your links today
  </h2>
  <Button link="" xClass="z-10">Get Started</Button>
</section>
