<template>
  <kirby-dropdown class="kirby-autocomplete">
    <input 
      type="text" 
      ref="input" 
      :id="id" 
      @keydown.tab="keydown" 
      @keydown.enter="keydown" 
      @keydown.up.prevent="navigate(-1)" 
      @keydown.down.prevent="navigate(1)" 
      @input="search($event.target.value)" />
    <kirby-dropdown-content :dark="true" ref="items">
      <kirby-dropdown-item v-for="(item, index) in items" 
        tabindex="-1" 
        :key="index"
        :icon="item.icon" 
        :image="item.image" 
        :class="(selected === index) ? 'is-selected' : ''" 
        @click="select(item.value)"> 
          {{ item.text }} 
      </kirby-dropdown-item>
    </kirby-dropdown-content>
  </kirby-dropdown>
</template>

<script>

import Dropdown from 'Navigation/Dropdown/Dropdown.vue';
import DropdownContent from 'Navigation/Dropdown/DropdownContent.vue';
import DropdownItem from 'Navigation/Dropdown/DropdownItem.vue';

export default {
  components: {
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem
  },
  props: {
    id: '',
    url: {
      required: true
    },
    value: {},
    icon: {},
    ignore: {
      default: function() {
        return [];
      },
    },
    map: {
      default: function() {
        return {
          value: 'value',
          text: 'text',
          icon: false,
          image: false          
        };
      }
    },
    limit: {
      default: 5
    }
  },
  data: function() {
    return {
      source: [],
      items: [],
      val: this.value,
      selected: -1
    };
  },
  mounted: function() {

    fetch(this.url).then(function(response) {
      return response.json();
    }).then(function(json) {        
      
      json.forEach(function(item) {

        this.source.push({
          value: item[this.map.value],
          text: item[this.map.text],
          icon: item[this.map.icon],
          image: item[this.map.image],
          original: item
        });

      }.bind(this));

    }.bind(this));

  },
  methods: {
    search: function(value) {

      if(value === '') {
        this.items = [];
        this.$refs.items.close();
        return;
      }

      var regex = new RegExp('^' + value, 'i');

      this.items = this.source.filter(function(item) {
        
        if(this.ignore.indexOf(item.text) !== -1) {
          return false;
        } else if(item.text.match(regex)) {
          return true;
        } else {
          return false;
        }

      }.bind(this));

      this.items = this.items.slice(0, this.limit);      
      this.$refs.items.open();

    },
    keydown: function(event) {
      if(this.items[this.selected]) {
        this.select(null);
        event.preventDefault();
      } else {

        switch(event.key) {
          case 'Enter':
            this.$emit('enter', this.$refs.input.value);
            break;
          case 'Tab':
            this.$emit('tab', this.$refs.input.value);
            break;
        }

        this.close();

      }
    },
    select: function(value) {

      if(value === null && this.items[this.selected]) {
        value = this.items[this.selected].value;
      }

      this.val = value;
      this.$emit('input', value);      
      this.$emit('select', this.items[this.selected]);

      this.close();

    },
    clear: function() {
      this.$refs.input.value = '';
    },
    close: function() {
      this.$refs.items.close();
      this.selected = -1;
    },
    focus: function() {
      this.$refs.input.focus();
    },
    navigate: function(direction) {

      this.selected = this.selected + direction;
    
      if(this.selected <= -1) {
        return this.close();  
      } 

      if(this.selected > (this.items.length - 1)) {
        this.selected = (this.items.length - 1);
      }

    }
  }
}

</script>

<style lang="scss">

.kirby-dropdown-item.is-selected {
  background: $color-positive;
}

</style>