<template>
  <nav class="">
    <ul class="flex fixed top-0 inset-x-0 p-3">
      <li class="flex-1 mr-2">
        <nuxt-link class="btn block" to="/">Home</nuxt-link>
      </li>
      <li class="flex-1 mr-2">
        <nuxt-link class="btn block" to="/blog">Blog</nuxt-link>
      </li>
      <li class="flex-1">
        <nuxt-link class="btn block" to="/projects">Projects</nuxt-link>
      </li>
      <lunr-search>
        <template v-slot:default="{ meta }">
          <!-- {{ result }} -->
          <!-- {{ meta.title }} -->
          <!-- {{ meta }} -->
          <!-- {{ meta.route }}
          {{ meta.title }} -->
          <nuxt-link :to="meta.route">
            <!-- {{ result }} -->
            {{ meta.title }}
            <!-- {{ meta }} -->
          </nuxt-link>
        </template>
      </lunr-search>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  components: {
    // Note: 'lunr-module' below is a custom webpack alias and
    // does NOT refer to the folder in node_modules
    LunrSearch: () => import('lunr-module/search'),
  },
}
</script>

<style lang="postcss" scoped>
.nuxt-link-exact-active {
  @apply text-accent-100 bg-accent bg-opacity-20;
  &:hover {
    @apply text-white bg-accent-600;
  }
}
.light-mode {
  & .nuxt-link-exact-active {
    @apply text-accent-600;
    &:hover {
      @apply text-white;
    }
  }
}
</style>
