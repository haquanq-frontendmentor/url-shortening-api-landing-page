<script lang="ts">
  import { BrandRecognitionIcon, DetailedRecordsIcon, FullyCustomizableIcon } from "../assets/images";
  import Container from "../layouts/Container.svelte";
</script>

{#snippet Feature(icon: string, title: string, description: string)}
  <li class="relative flex max-w-100 flex-col items-center rounded-md px-6 pb-10 text-center lg:items-start">
    <span class="absolute top-11 right-0 bottom-0 left-0 block rounded-[inherit] bg-white"></span>
    <div
      class="z-10 mb-9 flex aspect-square w-22 items-center justify-center rounded-full bg-purple-950 object-contain"
    >
      <img src={icon} alt="" />
    </div>
    <h3 class="z-10 mb-[1.1875rem] text-2xl font-bold tracking-tighter text-gray-900">{title}</h3>
    <p class="z-10 text-base leading-[1.625rem] tracking-tight">{description}</p>
  </li>
{/snippet}

<section class="flex flex-col items-center pb-30 md:pt-5">
  <h2 class="mb-5 text-center text-[clamp(1.75rem,1.3166rem+1.849vw,2.5rem)] leading-none font-bold tracking-tight">
    Advanced Statistics
  </h2>
  <p class="mb-12 max-w-[32.375rem] text-center text-base leading-7 md:mb-[3.375rem] md:text-lg md:leading-8">
    Track how your links are performing across the web with our advanced statistics dashboard.
  </p>
  <ul
    class=" flex flex-col items-center gap-x-[1.875rem] gap-y-12 lg:flex-row lg:items-start lg:*:nth-[2]:mt-11 lg:*:nth-[3]:mt-22"
  >
    {@render Feature(
      BrandRecognitionIcon,
      "Brand Recognition",
      "Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
    )}
    {@render Feature(
      DetailedRecordsIcon,
      "Detailed Records",
      "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
    )}
    {@render Feature(
      FullyCustomizableIcon,
      "Fully Customizable",
      "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
    )}
  </ul>
</section>
