<script context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
	<title>Escola Entrelaços</title>
  <meta name="description" content="Curso de Teatro Musical no Rio de Janeiro" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Escola Entrelaços",
    "image": "https://escolaentrelacos.com.br",
    "telephone": "+5521991082968",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua São Clemente, 421",
      "addressLocality": "Botafogo, Rio de Janeiro",
      "addressRegion": "RJ",
      "postalCode": "Rua São Clemente",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+5521991082968",
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    }
  }
  </script>
</svelte:head>

{@render children()}
