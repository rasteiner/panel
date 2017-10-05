<template>
  <li class="kirby-breadcrumb-item">
    <router-link v-tab v-if="link" :to="link">
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
  list-style: none;
  white-space: nowrap;
  font-family: $font-family-mono;
  font-size: 14px;
  color: $color-dark-grey;

  [dir="ltr"] & {
    float: left;
    margin-right: 1.5rem;
  }
  [dir="rtl"] & {
    float: right;
    margin-left: 1.5rem;
  }
}

.kirby-breadcrumb-item a,
.kirby-breadcrumb-item span {
  padding: 1rem 0;
  display: block;
  text-decoration: none;
  transition: color .3s;

  &:after {
    position: absolute;
    content: "/";

    [dir="ltr"] & {
      right: -1rem;
    }
    [dir="rtl"] & {
      left: -1rem;
    }
  }

  &[data-tabbed] {
    @include focus-ring;
  }

}

.kirby-breadcrumb-item a:hover {
  color: $color-dark;
}

</style>
