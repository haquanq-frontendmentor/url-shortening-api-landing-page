<script lang="ts">
  import Header from "./features/Header.svelte";
  import Nav from "./features/Nav.svelte";
  import URLShortener from "./features/URLShortener.svelte";
</script>

<Nav />
<Header />
<main class="bg-gray-100">
  <URLShortener />
</main>
