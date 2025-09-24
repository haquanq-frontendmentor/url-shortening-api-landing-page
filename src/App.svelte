<script lang="ts">
  import Header from "./features/Header.svelte";
  import Nav from "./features/Nav.svelte";
  import URLShortener from "./features/URLShortener.svelte";
  import Container from "./layouts/Container.svelte";
</script>

<Nav />
<Header />
<main class="bg-gray-100">
  <Container>
    <URLShortener />
  </Container>
</main>
