<template>
  <div class="kirby-block">

    <kirby-dropdown class="kirby-block-options">
      <kirby-button @click="$refs.dropdown.toggle()" icon="angle-down" />
      <kirby-dropdown-content ref="dropdown">
        <div class="kirby-block-options-group">
          <h2>Insert</h2>
          <kirby-dropdown-item icon="title" @click="$emit('append', 'headline')">Headline</kirby-dropdown-item>
          <kirby-dropdown-item icon="title" @click="$emit('append', 'subheadline')">Subheadline</kirby-dropdown-item>
          <kirby-dropdown-item icon="text" @click="$emit('append', 'text')">Text</kirby-dropdown-item>
          <kirby-dropdown-item icon="image" @click="$emit('append', 'image')">Image</kirby-dropdown-item>
          <kirby-dropdown-item icon="list-bullet" @click="$emit('append', 'list', {tag: 'ul'})">Unordered list</kirby-dropdown-item>
          <kirby-dropdown-item icon="list-numbers" @click="$emit('append', 'list', {tag: 'ol'})">Ordered list</kirby-dropdown-item>
          <kirby-dropdown-item icon="quote" @click="$emit('append', 'quote')">Quote</kirby-dropdown-item>
          <kirby-dropdown-item icon="code" @click="$emit('append', 'code')">Code</kirby-dropdown-item>
        </div>
        <div class="kirby-block-options-group">
          <h2>Options</h2>
          <kirby-dropdown-item icon="trash" @click="$emit('remove')">Delete</kirby-dropdown-item>
        </div>
      </kirby-dropdown-content>
    </kirby-dropdown>

    <slot />
  </div>
</template>

<script>

export default {
  props: {
    options: Array
  }
}

</script>

<style lang="scss">

.kirby-block {
  position: relative;
  padding: 0 1.5rem;
}
.kirby-block-options {
  opacity: 0;
  transition: opacity .3s;
}
.kirby-block:hover .kirby-block-options {
  opacity: 1;
}
.kirby-block-options.kirby-dropdown {
  position: absolute;
  top: 0;

  [dir="ltr"] & {
    left: 0;
  }
  [dir="rtl"] & {
    right: 0;
  }
}
.kirby-block-options .kirby-dropdown-item {
  border-bottom: 0 !important;
  padding-top: .5rem;
  padding-bottom: .5rem;
  margin-left: .5rem;
}
.kirby-block-options.kirby-dropdown h2 {
  padding: .5rem 1.5rem .5rem;
  font-size: $font-size-small;
  text-transform: uppercase;
  letter-spacing: .1em;
  font-weight: 400;
}
.kirby-block-options-group {
  padding: .5rem 0 .75rem;
}
.kirby-block-options-group:last-child {
  border-bottom: 0;
}
</style>
