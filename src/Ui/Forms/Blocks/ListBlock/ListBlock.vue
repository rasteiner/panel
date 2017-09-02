<template>
  <kirby-block class="kirby-list-block"
    @append="append"
    @remove="$emit('remove')">

    <component :is="tag">
      <li v-for="(item, index) in items" :key="item._id">
        <kirby-fancy-input
          ref="item"
          placeholder="Type something …"
          @enter="enter(index)"
          @input="input(index)"
          @empty="empty(index)"
          :value="item.text" />
      </li>
    </component>

  </kirby-block>
</template>

<script>

const guid = function() {
  return Math.random().toString(36).substr(2, 10);
};

export default {
  props: {
    tag: {
      type: String,
      default: 'ul'
    },
    value: {
      type: [String,Array]
    }
  },
  data() {

    let items = this.value || [{
      _id: guid(),
      text: ''
    }];

    return {
      items: items.map(function(item) {
        item._id = guid();
        return item;
      })
    }
  },
  methods: {
    focus() {
      this.$refs.item[0].focus();
    },
    enter(index) {
      this.items.splice(index + 1, 0, {
        _id: guid(),
        text: ''
      });

      this.$nextTick(function() {
        this.select(index + 1);
      }.bind(this));

    },
    select(index) {
      try {
        this.$refs.item[index].focus();
      } catch(e) {

      }
    },
    empty(index) {

      if (this.items.length > 1) {
        this.items.splice(index, 1);
        this.$nextTick(function() {
          this.select(index - 1);
        }.bind(this));
      } else {
        this.remove();
      }

    },
    append(type, props) {

      console.log(props);

      this.$emit('append', type, props);
    },
    input() {

    }
  }
}

</script>

<style lang="scss">

.kirby-list-block {
  margin-bottom: 1.5rem;
}
.kirby-list-block ul,
.kirby-list-block ol {
  [dir="ltr"] & {
    margin-left: 1rem;
  }
  [dir="rtl"] & {
    margin-right: 1rem;
  }
}
.kirby-list-block ul li {
  list-style: disc;
}
.kirby-list-block ol li {
  list-style: decimal;
}

</style>
