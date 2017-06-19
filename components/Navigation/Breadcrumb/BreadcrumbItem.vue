<template>
  <li class="kirby-breadcrumb-item">
    <router-link v-if="link" :to="link">
      <slot />
    </router-link>
    <span v-else><slot /></span>
  </li>
</template>

<script>

export default {
  props: ['link']
}

</script>

<style lang="scss">

.kirby-breadcrumb-item {
  position: relative;
  display: inline-block;
  list-style: none;
  white-space: nowrap;
  font-family: $font-family-mono;
  font-size: 14px;
  color: $color-dark-grey;
  margin-right: .5rem;
}

.kirby-breadcrumb-item a,
.kirby-breadcrumb-item span {
  display: block;
  text-decoration: none;
  transition: color .3s;

  &:after {
    content: "/";
    margin-left: .5rem;
  }

}

.kirby-breadcrumb-item a:hover {
  color: $color-dark;
}

</style>
