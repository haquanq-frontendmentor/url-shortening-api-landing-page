<script>
  import Container from "../layouts/Container.svelte";
  import WorkingIllustration from "../assets/images/illustration-working.svg";
  import Button from "../components/Button.svelte";
</script>

<header class="overflow-x-hidden">
  <Container>
    <div
      class="grid gap-x-8 gap-y-10 pt-[clamp(0rem,-1.9501rem+8.3205vw,3.375rem)] pb-38 md:grid-flow-dense md:grid-cols-[55%_1fr]"
    >
      <div class="md:col-start-2">
        <img class="max-w-[150%] md:max-w-[500%]" src={WorkingIllustration} alt="" />
      </div>
      <div class="flex flex-col items-center text-center md:items-start md:text-start">
        <h1
          class="mb-3 text-[clamp(2.625rem,_1.2527rem_+_5.8552vw,_5rem)] leading-[clamp(3rem,_1.4832rem_+_6.4715vw,_5.625rem)] font-bold"
        >
          More than just shorter links
        </h1>
        <p
          class="mb-[clamp(1.875rem,_1.6583rem_+_0.9245vw,_2.25rem)] text-[clamp(1.125rem,0.9805rem+0.6163vw,1.375rem)] leading-[clamp(1.875rem,1.6583rem+0.9245vw,2.25rem)]"
        >
          Build your brand’s recognition and get detailed insights on how your links are performing
        </p>
        <Button>Get Started</Button>
      </div>
    </div>
  </Container>
</header>
