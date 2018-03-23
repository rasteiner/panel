<template>
  <draggable class="kirby-list-collection" :options="{disabled: true}">
    <li v-for="(item, index) in items" :key="item.id" @click.native="$emit('click', item)">
      <router-link class="kirby-list-collection-image" :to="item.link" tabindex="-1">
        <kirby-image v-if="item.image && item.image.url" :src="item.image.url" :back="item.image.back || 'black'" :cover="true" />
        <kirby-icon v-else :type="preview(item)" :style="background(item)" />
      </router-link>
      <router-link class="kirby-list-collection-text" v-tab :to="item.link"><em>{{ item.text }}</em> <small v-if="item.info">{{ item.info }}</small></router-link>
      <div class="kirby-list-collection-options">
        <kirby-dropdown>
          <kirby-button class="kirby-list-collection-toggle"
            icon="dots"
            alt="Options"
            @click="$refs['dropdown-' + index][0].toggle()">
          </kirby-button>
          <kirby-dropdown-content
            @action="$emit('action', item, $event)"
            align="right"
            :ref="'dropdown-' + index"
            :options="item.options" />
        </kirby-dropdown>
      </div>
    </li>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  props: ["items"],
  methods: {
    preview(item) {
      if (item.preview && item.preview.icon) {
        return item.preview.icon;
      } else {
        return "file";
      }
    },
    background(item) {
      if (item.preview && item.preview.color) {
        return { backgroundColor: item.preview.color };
      }
    }
  }
};
</script>

<style lang="scss">
.kirby-list-collection li {
  position: relative;
  background: $color-white;
  border-radius: $border-radius;
  margin-bottom: 2px;
  height: 2.5rem;
  box-shadow: $box-shadow-card;
}
.kirby-list-collection .sortable-ghost {
  background: $color-inset;
  box-shadow: $box-shadow-inset, $color-border 0 0 0 1px inset;
}
.kirby-list-collection .sortable-ghost * {
  display: none;
}
.kirby-list-collection-image {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2.5rem;
  overflow: hidden;
  line-height: 0;
}
.kirby-list-collection-image .kirby-image {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
}
.kirby-list-collection-image .kirby-icon {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background: $color-dark;
  width: 2.5rem;
  height: 100%;
}
.kirby-list-collection-image .kirby-icon svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.kirby-list-collection-image .kirby-icon svg * {
  fill: rgba($color-white, 0.5);
}
.kirby-list-collection-text {
  display: block;
  padding: 0.75rem;
  line-height: 1;
  height: 2.5rem;
  margin-left: 2.5rem;
  font-family: $font-family-mono;
  font-size: $font-size-small;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 3rem;
  display: flex;
  align-items: baseline;

  @include highlight-tabbed;
}
.kirby-list-collection-text em {
  font-style: normal;
  margin-right: 1rem;
  flex-grow: 1;
}

.kirby-list-collection-text small {
  color: $color-light-grey;
  font-size: $font-size-tiny;
  display: none;

  @media screen and (min-width: $breakpoint-medium) {
    display: block;
  }
}

.kirby-list-collection-options {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3em;
  height: 2.5rem;
}
.kirby-list-collection-toggle {
  width: 3rem;
  height: 2.5rem;
}
.kirby-list-collection-toggle::before {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1rem;
  content: "";
  left: -1rem;
  background: -webkit-linear-gradient(left, rgba(#fff, 0), rgba(#fff, 1));
}
</style>
