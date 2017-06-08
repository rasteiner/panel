<template>
  <button 
    type="button" 
    @click="click" 
    class="kirby-button" 
    :data-shape="shape" 
    :data-state="state"
    :data-has-image="image ? true : false">    
    <kirby-icon v-if="icon" :type="icon"></kirby-icon>
    <img class="kirby-button-image" v-else-if="image" :src="image">
    <span class="kirby-button-text"><slot /></span>
    <input type="file" ref="input" v-if="upload" 
      :multiple="upload.multiple || false" 
      :accept="upload.accept || '*'" 
      @change="change">
  </button>
</template>

<script>

import Icon from '../../Images/Icon/Icon.vue'

export default {
  components: {
    'kirby-icon': Icon
  },
  props: [
    'icon',
    'image',
    'state',
    'shape',
    'upload',
    'link'
  ],
  computed: {
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

<style lang="scss">

.kirby-button {
  position: relative;
  background: none;
  font: inherit;
  line-height: inherit;
  border: 0;
  cursor: pointer;
  color: inherit;
}
.kirby-button:focus {
  outline: 0;
}
.kirby-button[data-state="positive"] {
  color: #8dae28;
}
.kirby-button[data-state="negative"] {
  color: #b3000a;  
}
.kirby-button[data-shape="round"] {
  border: 2px solid #282c34;
  color: #282c34;
  border-radius: 3rem;
  padding: .2rem 1rem;
  font-weight: 500;
}
.kirby-button[data-shape="round"]:hover,
.kirby-button[data-shape="round"]:focus {
  background-color: #282c34;
  color: #fff;
}
.kirby-button[data-shape="round"][data-state="positive"] {
  border-color: #8dae28;  
  color: #8dae28;
}
.kirby-button[data-shape="round"][data-state="positive"]:hover,
.kirby-button[data-shape="round"][data-state="positive"]:focus {
  background-color: #8dae28;
  color: #fff;
}
.kirby-button[data-shape="round"][data-state="negative"] {
  border-color: #b3000a;  
  color: #b3000a;
}
.kirby-button[data-shape="round"][data-state="negative"]:hover,
.kirby-button[data-shape="round"][data-state="negative"]:focus {
  background-color: #b3000a;
  color: #fff;
}
.kirby-button .kirby-icon ~ .kirby-button-text:not(:empty) {
  padding-left: .5rem;
}
.kirby-button[data-has-image] {
  width: 100%;
  text-align: left;
}
.kirby-button[data-has-image] .kirby-button-text {
  padding: 0;  
}
.kirby-button input[type="file"] {
  position: absolute;
  top: 0;
  left: -5000px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.kirby-button-image {
  width: 1.5rem;
  height: 1.5rem;
  margin: -.5rem 1rem -.5rem 0;
  border-radius: 50%;
  background: #282c34;
  object-fit: cover;
}

</style>
