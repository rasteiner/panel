<template>
  <transition name="kirby-dialog-transition">
    <div v-if="isOpen" @click="close" class="kirby-dialog">
      <div @click.stop class="kirby-dialog-box" :data-size="size">
        <slot name="header">
          <kirby-bar class="kirby-dialog-header">
            <template slot="left">
              <slot name="headline">
                <kirby-headline>{{ headline }}</kirby-headline>
              </slot>
            </template>
            <template slot="right">
              <slot name="options"></slot>
            </template>
          </kirby-bar>
        </slot>
        <div class="kirby-dialog-body">
          <slot />
        </div>
        <footer class="kirby-dialog-footer">
          <slot name="footer">
            <kirby-button-group>
              <kirby-button @click="cancel" icon="times">Cancel</kirby-button>
              <kirby-button @click="submit" :icon="icon" :state="state">{{ button }}</kirby-button>
            </kirby-button-group>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>

import Bar from 'Layout/Bar/Bar.vue';
import Button from 'Buttons/Button/Button.vue';
import ButtonGroup from 'Buttons/ButtonGroup/ButtonGroup.vue';
import Headline from 'Text/Headline/Headline.vue';

const PanelDialogEscapeListener = function (e) {
  if (e.code === 'Escape') {
    this.close()
  }
}

export default {
  components: {
    'kirby-bar': Bar,
    'kirby-button-group': ButtonGroup,
    'kirby-button': Button,
    'kirby-headline': Headline
  },
  props: {
    'headline': {},
    'size': {},
    'sticky': {},
    'state': {},
    'button': {
      default: 'Ok'
    },
    'icon': {
      default: 'check'
    }
  },
  data: function () {
    return {
      isOpen: this.sticky === true
    }
  },
  methods: {
    open: function () {
      this.isOpen = true

      this.$nextTick(function () {
        var autofocus = this.$el.querySelector('input, textarea, button')
        if (autofocus) {
          autofocus.focus()
        }
      }.bind(this))
    },
    close: function () {
      if (this.sticky !== true) {
        this.isOpen = false
      }
    },
    cancel: function() {
      this.$emit('cancel');
      this.close();
    },
    submit: function() {
      this.$emit('submit');
      this.close();
    }
  },
  created: function () {
    window.addEventListener('keyup', PanelDialogEscapeListener.bind(this), false)
  },
  destroyed: function () {
    window.removeEventListener('keyup', PanelDialogEscapeListener, false)
  }
}

</script>

<style lang="scss">

.kirby-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 0;
  width: 100%;
  height: 100%;
  background: $color-backdrop;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: z-index(dialog);
}

.kirby-dialog-transition-enter-active,
.kirby-dialog-transition-leave-active {
  transition: opacity .15s
}
.kirby-dialog-transition-enter,
.kirby-dialog-transition-leave-to {
  opacity: 0
}

.kirby-dialog-transition-enter-active .kirby-dialog-box,
.kirby-dialog-transition-leave-active .kirby-dialog-box{
  transition: transform .2s
}
.kirby-dialog-transition-enter .kirby-dialog-box,
.kirby-dialog-transition-leave-to .kirby-dialog-box{
  transform: translateY(-5%);
}



.kirby-dialog-box {
  position: relative;
  background: $color-light;
  width: 22rem;
  box-shadow: $box-shadow;
  border-radius: $border-radius;
  line-height: 1;
  max-height: calc(100vh - 3rem);
  margin: 1.5rem;
}
.kirby-dialog-box[data-size="small"] {
  width: 20rem;
}
.kirby-dialog-box[data-size="medium"] {
  width: 30rem;
}
.kirby-dialog-box[data-size="large"] {
  width: 40rem;
}
.kirby-dialog-header {
  background: $color-light;
  color: $color-dark;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  display: none;
}
.kirby-dialog-header .kirby-headline {
  margin: 0;
  line-height: 1;
  font-family: $font-family-mono;
  color: $color-light-grey;
  font-size: $font-size-small;
  padding: 1rem 1.5rem;
}
.kirby-dialog-body {
  padding: 1.5rem;
  max-height: calc(100vh - 9rem);
  overflow: auto;
}
.kirby-dialog-footer {
  border-top: 1px solid $color-border;
  padding: 0 1.5rem;
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  height: 3rem;
  line-height: 1;
}
.kirby-dialog-footer .kirby-button-group {
  display: flex;

  .kirby-button {
    flex-grow: 1;
  }

  .kirby-button:first-child {
    text-align: left;
  }
  .kirby-button:last-child {
    text-align: right;
  }

}



</style>
