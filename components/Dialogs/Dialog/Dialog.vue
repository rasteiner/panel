<template>
  <div v-if="isOpen" @click="close" class="kirby-dialog">
    <div @click.stop class="kirby-dialog-box" :data-size="size">
      <header class="kirby-dialog-header">
        <slot name="header" />
      </header>
      <div class="kirby-dialog-body">
        <slot name="body" />
      </div>
      <footer class="kirby-dialog-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script>

const PanelDialogEscapeListener = function (e) {
  if (e.code === 'Escape') {
    this.close()
  }
}

export default {
  props: [
    'size',
    'sticky'
  ],
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

<style>

.kirby-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, .6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.kirby-dialog-box {
  background: #fff;
  width: 22rem;
  box-shadow: rgba(0,0,0, .2) 0 2px 10px;
  border-radius: 3px;
  line-height: 1;
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
  padding: 1rem 1.5rem;
  background: #282c34;
  color: #fff;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.kirby-dialog-header h1 {
  font-size: 1rem;
  font-weight: 400;
}
.kirby-dialog-body {
  padding: 1rem 1.5rem;
  background: #efefef;
}
.kirby-dialog-footer {
}
.kirby-dialog-footer .kirby-buttons {
  display: flex;
}
.kirby-dialog-footer .kirby-button {
  flex-shrink: 0;
  flex-grow: 1;
  margin: 0 !important;
  width: 50%;
  border-left: 1px solid #ddd;
  padding: 1rem;
  font-weight: 500;
  height: 3rem;
}
.kirby-dialog-footer .kirby-button:first-child {
  border-left: 0;
} 

</style>
