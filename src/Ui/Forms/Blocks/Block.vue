<template>
  <div class="kirby-block">

    <kirby-dropdown class="kirby-block-options">
      <kirby-button @click="$refs.dropdown.toggle()" icon="angle-down" />
      <kirby-dropdown-content ref="dropdown" :dark="true">
        <div class="kirby-block-options-group">
          <h2>Insert</h2>
          <kirby-dropdown-item icon="header" @click="$emit('append', 'headline')">Headline</kirby-dropdown-item>
          <kirby-dropdown-item icon="font" @click="$emit('append', 'subheadline')">Subheadline</kirby-dropdown-item>
          <kirby-dropdown-item icon="align-left" @click="$emit('append', 'text')">Text</kirby-dropdown-item>
          <kirby-dropdown-item icon="file-image-o" @click="$emit('append', 'image')">Image</kirby-dropdown-item>
          <kirby-dropdown-item icon="list" @click="$emit('append', 'list', {tag: 'ul'})">Unordered list</kirby-dropdown-item>
          <kirby-dropdown-item icon="list" @click="$emit('append', 'list', {tag: 'ol'})">Ordered list</kirby-dropdown-item>
          <kirby-dropdown-item icon="quote-left" @click="$emit('append', 'quote')">Quote</kirby-dropdown-item>
          <kirby-dropdown-item icon="code" @click="$emit('append', 'code')">Code</kirby-dropdown-item>
        </div>
        <div class="kirby-block-options-group">
          <h2>Options</h2>
          <kirby-dropdown-item icon="trash-o" @click="$emit('remove')">Delete</kirby-dropdown-item>
        </div>
      </kirby-dropdown-content>
    </kirby-dropdown>

    <slot />
  </div>
</template>

<script>

export default {
}

</script>

<style lang="scss">

.kirby-block {
  position: relative;
  padding: 0 1.5rem;
}
.kirby-block-options.kirby-dropdown {
  position: absolute;
  top: 0;
  left: 0;
}
.kirby-block-options .kirby-dropdown-item {
  border-bottom: 0 !important;
  padding-top: .5rem;
  padding-bottom: .5rem;
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
  border-bottom: 1px solid rgba(#fff, .1);
}
.kirby-block-options-group:last-child {
  border-bottom: 0;
}
</style>
