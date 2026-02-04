<script setup lang="ts">
useHead({
  title: 'Products',
  meta: [{ name: 'description', content: 'Products from dummyapi' }, { charset: 'utf-8' }],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
    }
  ]
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
