<template>
  <div class="kirby-blocks">
    <component v-for="(block, index) in blocks"
      v-bind="block.props || {}"
      :key="block.id"
      :ref="'block-' + index"
      :is="'kirby-' + block.type + '-block'"
      :value="block.value"
      @input="input(index, $event)"
      @append="append(index, ...$event)"
      @remove="remove(index)" />
  </div>
</template>

<script>

const guid = function() {
  return Math.random().toString(36).substr(2, 10);
};

export default {
  props: {
    value: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data() {

    let blocks = this.value;

    if (blocks === null || blocks.length === 0) {

      blocks = [
        {
          type: 'text',
          value: ''
        }
      ];

    }

    return {
      blocks: blocks.map(function(item) {
        item._id = guid();
        return item;
      })
    }
  },
  methods: {
    input(index, value) {
      this.blocks[index].value = value;
      this.$emit('input', this.blocks);
    },
    append(index, type, props) {

      this.blocks.splice(index + 1, 0, {
        id: guid(),
        type: type,
        props: props || {},
        value: ''
      });

      this.$nextTick(() => {
        this.focus(index + 1);
      });

      this.$emit('input', this.blocks);

    },
    remove(index) {

      this.blocks.splice(index, 1);

      if (this.blocks.length === 0) {
        this.blocks = [
          {
            type: 'text',
            value: ''
          }
        ];
      }

      this.$nextTick(() => {
        this.focus(index - 1);
      });

      this.$emit('input', this.blocks);

    },
    focus(index) {
      try {
        this.$refs['block-' + index][0].focus();
      } catch(e) {
        console.log('could not focus on ' + index);
      }
    }
  }
}

</script>

<style lang="scss">

.kirby-blocks {
  background: #fff;
  padding: 1.5rem;
}

</style>
