<script lang="ts">
  import Boost from "./components/Boost.svelte";
  import Features from "./components/Features.svelte";
  import Footer from "./components/Footer.svelte";
  import Intro from "./components/Intro.svelte";
  import Nav from "./components/Nav.svelte";
  import Shortener from "./components/Shortener.svelte";
  import Container from "./layouts/Container.svelte";
</script>

<Nav />
<main class="bg-gray-100">
  <Intro />
  <Container>
    <Shortener />
    <Features />
  </Container>
</main>
<aside>
  <Boost />
</aside>
<Footer />
