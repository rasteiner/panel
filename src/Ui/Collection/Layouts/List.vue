<template>
  <kirby-table>
    <kirby-table-body>
      <kirby-table-row v-for="(item, index) in items" :key="item.id" @click.native="$emit('click', item)">
        <kirby-table-cell type="image" aria-hidden="true">
          <router-link :to="item.link" tabindex="-1">
            <kirby-image v-if="item.image && item.image.url" :src="item.image.url" :cover="true" />
            <kirby-icon v-else :type="preview(item)" :style="background(item)" />
          </router-link>
        </kirby-table-cell>
        <kirby-table-cell type="link">
          <router-link v-tab :to="item.link">{{ item.text }}</router-link>
        </kirby-table-cell>
        <kirby-table-cell v-if="item.info" type="info">
          <router-link :to="item.link">{{ item.info }}</router-link>
        </kirby-table-cell>
        <kirby-table-cell v-if="item.options" type="button">
          <kirby-dropdown>
            <kirby-button
              icon="dots"
              alt="Options"
              @click="$refs['dropdown-' + index][0].toggle()">
            </kirby-button>
            <kirby-dropdown-content
              @action="$emit('action', item, $event)"
              align="right"
              :ref="'dropdown-' + index"
              :options="item.options"
              :dark="true">
            </kirby-dropdown-content>
          </kirby-dropdown>
        </kirby-table-cell>
      </kirby-table-row>
    </kirby-table-body>
  </kirby-table>
</template>

<script>

export default {
  props: ['items'],
  methods: {
    preview (item) {
      if (item.preview && item.preview.icon) {
        return item.preview.icon;
      } else {
        return 'file';
      }
    },
    background (item) {
      if (item.preview && item.preview.color) {
        return { backgroundColor: item.preview.color };
      }
    }
  }
};

</script>
