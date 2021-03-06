<template>
  <transition name="kirby-dialog-transition">
    <div v-show="isOpen" @click="close" class="kirby-dialog">
      <div @click.stop class="kirby-dialog-box" :data-size="size">
        <div class="kirby-dialog-body">
          <slot></slot>
        </div>
        <slot name="footer">
          <footer class="kirby-dialog-footer">
            <kirby-button-group>
              <kirby-button @click="cancel" icon="cancel">Cancel</kirby-button>
              <kirby-button @click="submit" :icon="icon" :state="state">{{ button }}</kirby-button>
            </kirby-button-group>
          </footer>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    headline: {},
    size: {},
    state: {},
    button: {
      default: "Ok"
    },
    icon: {
      default: "check"
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    open() {
      this.isOpen = true;

      this.$nextTick(() => {
        var autofocus = this.$el.querySelector("input, textarea, button");
        if (autofocus) {
          autofocus.focus();
        }
      });
    },
    close() {
      this.isOpen = false;
    },
    cancel() {
      this.$emit("cancel");
      this.close();
    },
    submit() {
      this.$emit("submit");
    }
  }
};
</script>

<style lang="scss">
.kirby-dialog {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 0;

  width: 100%;
  height: 100%;

  background: $color-backdrop;
  z-index: z-index(dialog);
}

.kirby-dialog-transition-enter-active,
.kirby-dialog-transition-leave-active {
  transition: opacity 0.15s;
}
.kirby-dialog-transition-enter,
.kirby-dialog-transition-leave-to {
  opacity: 0;
}

.kirby-dialog-transition-enter-active .kirby-dialog-box,
.kirby-dialog-transition-leave-active .kirby-dialog-box {
  transition: transform 0.2s;
}
.kirby-dialog-transition-enter .kirby-dialog-box,
.kirby-dialog-transition-leave-to .kirby-dialog-box {
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
.kirby-dialog-body {
  padding: 1.5rem;
  max-height: calc(100vh - 9rem);
  overflow-y: auto;
  overflow-x: hidden;
}
.kirby-dialog-body .kirby-fieldset {
  padding-bottom: 0.5rem;
}
.kirby-dialog-body .kirby-form {
  margin-top: -1rem;
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
    [dir="ltr"] & {
      text-align: left;
    }
    [dir="rtl"] & {
      text-align: right;
    }
  }
  .kirby-button:last-child {
    [dir="ltr"] & {
      text-align: right;
    }
    [dir="rtl"] & {
      text-align: left;
    }
  }
}
</style>
