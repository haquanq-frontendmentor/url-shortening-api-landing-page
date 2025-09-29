<script lang="ts">
  import Boost from "./components/Boost.svelte";
  import Features from "./components/Features.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Nav from "./components/Nav.svelte";
  import Shortener from "./components/Shortener.svelte";
  import Container from "./layouts/Container.svelte";
</script>

<Nav />
<Header />
<main class="bg-gray-100">
  <Container>
    <Shortener />
    <Features />
  </Container>
</main>
<aside>
  <Boost />
</aside>
<Footer />
