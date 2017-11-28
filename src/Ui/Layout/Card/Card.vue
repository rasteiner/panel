<template>
  <div class="kirby-card">
    <component :is="wrapper" :to="link">
      <kirby-image
        v-if="image && image.url"
        :src="image.url"
        :ratio="image.ratio || '3/2'"
        back="black"
        :cover="true">
      </kirby-image>
      <kirby-icon v-else class="kirby-preview" :style="{ backgroundColor: preview.color }" :type="preview.icon || 'document'" />
      <div class="kirby-card-content">
        <p class="kirby-card-text">{{ text }}</p>
        <p class="kirby-card-info">{{ info }}</p>
      </div>
    </component>
    <kirby-dropdown v-if="options">
      <kirby-button
        class="kirby-card-options-button"
        icon="dots"
        :alt="menuLabel"
        @click="$refs.dropdown.toggle()">
      </kirby-button>
      <kirby-dropdown-content
        @action="$emit('action', $event)"
        align="right"
        ref="dropdown"
        :options="options" />
    </kirby-dropdown>
  </div>
</template>

<script>

export default {
  props: {
    image: Object,
    preview: {
      type: Object,
      default () {
        return {
          icon: 'file'
        }
      }
    },
    text: String,
    info: String,
    link: {},
    options: {},
    menuLabel: {
      type: String,
      default: 'Actions'
    }
  },
  computed: {
    wrapper: function() {
      return this.link ? 'router-link' : 'div';
    }
  }
}

</script>

<style lang="scss">

.kirby-card {
  position: relative;
}
.kirby-card a {
  display: block;
  height: 100%;
  background: $color-white;
  border-radius: $border-radius;
}
.kirby-card a:focus {
  outline: 0;
  box-shadow: $box-shadow-focus-full;
}
.kirby-card-content {
  padding: .5rem 1rem;
  line-height: 1.5em;
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
}
.kirby-card .kirby-image,
.kirby-card .kirby-preview {
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  overflow: hidden;
}
.kirby-card .kirby-preview {
  display: block;
  position: relative;
  padding-bottom: 66.66%;
  background-color: $color-dark;
}
.kirby-card .kirby-preview > * {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(3);
}
.kirby-card .kirby-preview svg * {
  fill: rgba($color-white, .5);
}
.kirby-card-text {
  display: block;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: $font-family-mono;
  font-size: $font-size-small;
}
.kirby-card-info {
  color: $color-light-grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: $font-size-tiny;
  font-family: $font-family-mono;
}
.kirby-card .kirby-dropdown {
  position: absolute;
  bottom: 0;

  [dir="ltr"] & {
    right: 0;
  }
  [dir="rtl"] & {
    left: 0;
  }
}
.kirby-card-options-button {
  padding: .6rem 1rem;
  line-height: 1.5em;
  background: #fff;
}
.kirby-card-options-button::before {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1rem;
  content: "";
  left: -1rem;
  background: -webkit-linear-gradient(left, rgba(#fff, 0), rgba(#fff, 1));
}

</style>
