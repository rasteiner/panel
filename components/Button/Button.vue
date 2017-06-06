<template>
  <button type="button" @click="click" :class="selector">
    <kirby-icon v-if="icon" :type="icon"></kirby-icon>
    <img class="panel-button-image" v-else-if="image" :src="image">
    <span class="panel-button-text"><slot /></span>
    <input type="file" ref="input" v-if="upload" 
      :multiple="upload.multiple || false" 
      :accept="upload.accept || '*'" 
      @change="change">
  </button>
</template>

<script>

import Icon from '../Icon/Icon.vue'

export default {
  components: {
    'kirby-icon': Icon
  },
  props: [
    'icon',
    'image',
    'type',
    'shape',
    'upload',
    'link'
  ],
  computed: {
    selector: function () {
      var selector = 'panel-button'

      if (this.type) {
        selector += ' is-' + this.type
      }

      if (this.shape) {
        selector += ' is-' + this.shape
      }

      return selector
    },
    component: function () {
      return this.link ? 'router-link' : 'button'
    }
  },
  methods: {
    click: function () {
      if (this.upload) {
        // open the file dialog
        this.$refs.input.value = ''
        this.$refs.input.click()
      } else if (this.link) {
        this.$router.push(this.link)
      }
      this.$emit('click')
    },
    change: function (event) {
      this.$emit('upload')
    }
  }
}

</script>

<style>

.panel-button {
  position: relative;
  background: none;
  font: inherit;
  line-height: inherit;
  border: 0;
  cursor: pointer;
  color: inherit;
}
.panel-button:focus {
  outline: 0;
}
.panel-button.is-positive {
  color: #8dae28;
}
.panel-button.is-negative {
  color: #b3000a;  
}
.panel-button.is-round {
  border: 2px solid #282c34;
  color: #282c34;
  border-radius: 3rem;
  padding: .2rem 1rem;
  font-weight: 500;
}
.panel-button.is-round:hover,
.panel-button.is-round:focus {
  background-color: #282c34;
  color: #fff;
}
.panel-button.is-round.is-positive {
  border-color: #8dae28;  
  color: #8dae28;
}
.panel-button.is-round.is-positive:hover,
.panel-button.is-round.is-positive:focus {
  background-color: #8dae28;
  color: #fff;
}
.panel-button.is-round.is-negative {
  border-color: #b3000a;  
  color: #b3000a;
}
.panel-button.is-round.is-negative:hover,
.panel-button.is-round.is-negative:focus {
  background-color: #b3000a;
  color: #fff;
}
.panel-button .panel-icon ~ .panel-button-text:not(:empty) {
  padding-left: .5rem;
}
.panel-button.is-image {
  width: 100%;
}
.panel-button.is-image .panel-button-text {
  padding: 0;  
}
.panel-button input[type="file"] {
  position: absolute;
  top: 0;
  left: -5000px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.panel-button-image {
  width: 1.5rem;
  height: 1.5rem;
  margin: -.5rem 1rem -.5rem 0;
  border-radius: 50%;
  background: #282c34;
  object-fit: cover;
}

</style>
