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
  list-style: none;
  white-space: nowrap;
  overflow: hidden;
  min-width: 4rem;
  flex-shrink: 0;
}
.kirby-breadcrumb-item a,
.kirby-breadcrumb-item span {
  display: block;
  padding: 1rem 1.25rem 1rem .5rem;
  text-decoration: none;
  transition: color .3s;
}

/* Shim */
.kirby-breadcrumb-item a:hover {
  color: $color-dark-grey;
}
.kirby-breadcrumb-item:after {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  width: 3rem;
  background: -webkit-linear-gradient(left, transparent, $color-white 75%, $color-white);
  pointer-events: none;
}

/* Arrows */
.kirby-breadcrumb-item a:after,
.kirby-breadcrumb-item span:after,
.kirby-breadcrumb-item a:before,
.kirby-breadcrumb-item span:before {
  position: absolute;
  content: "";
  width: 1px;
  right: 0;
  z-index: 1;
  pointer-events: none;
}
.kirby-breadcrumb-item a:before,
.kirby-breadcrumb-item span:before {
  top: 0;
  bottom: 0;
  transform: rotate(-30deg);
  background: -webkit-linear-gradient(top, transparent, $color-border 25%, $color-border);
}
.kirby-breadcrumb-item a:after,
.kirby-breadcrumb-item span:after {
  bottom: 0;
  top: 0;
  transform: rotate(30deg);
  background: -webkit-linear-gradient(bottom, transparent, $color-border 25%, $color-border);
}

/* Media Queries */
@media screen and (min-width: 30em) {
  .kirby-breadcrumb-item {
    display: block;
    min-width: auto;
    flex-basis: auto;
  }
  .kirby-breadcrumb-item:after {
    width: 1.5rem;
  }
  .kirby-breadcrumb-item a {
    display: block;
    padding: 1rem 1.25rem 1rem 1rem;
    font-size: 1rem;
  }
}

</style>
