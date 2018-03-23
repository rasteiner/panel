<template>
  <kirby-field class="kirby-range-field" :id="_uid" v-bind="$props">
    <input
      type="range"
      :id="_uid"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :required="required"
      :style="`--min: ${min}; --max: ${max}; --val: ${position}`"
      :value="state"
      @input="input($event.target.value)"
    />
    <span>{{ prepend }} {{ display }} {{ append }}</span>
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Mixins/Field.js";
import Label from "Ui/Forms/Field/Mixins/Label.js";
import Help from "Ui/Forms/Field/Mixins/Help.js";
import Required from "Ui/Forms/Field/Mixins/Required.js";
import Step from "Ui/Forms/Field/Mixins/Step.js";
import Value from "Ui/Forms/Field/Mixins/Value.js";

export default {
  mixins: [Field, Label, Help, Required, Step, Value],
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    prepend: String,
    append: String
  },
  computed: {
    display() {
      return this.state !== null ? this.format(this.state) : "–";
    },
    center() {
      const middle = (this.max - this.min) / 2 + this.min;
      return Math.ceil(middle / this.step) * this.step;
    },
    position() {
      return this.state !== null ? this.state : this.center;
    }
  },
  methods: {
    format(value) {
      const locale = this.$store.state.locale.id.replace("_", "-");
      const parts = this.step.toString().split(".");
      const digits = parts.length > 1 ? parts[1].length : 0;
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: digits
      }).format(value);
    }
  }
};
</script>

<style lang="scss">
.kirby-range-field .kirby-input-content {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.4rem;
  height: 2.5rem;
}

$track-w: 100%;
$track-h: 0.3em;
$thumb-d: 1.35em;
$track-c: $color-light;
$filll-c: $color-dark;

@mixin track($fill: 0) {
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  width: $track-w;
  height: $track-h;
  background: $track-c;

  @if $fill == 1 {
    background: linear-gradient($filll-c, $filll-c) 0/ var(--sx) 100% no-repeat $track-c;
  }
}

@mixin fill() {
  height: $track-h;
  background: $filll-c;
}

@mixin thumb() {
  box-sizing: border-box;
  border: none;
  width: $thumb-d;
  height: $thumb-d;
  background: $color-dark;
  border: solid 3px $color-white;
  border-radius: 50%;
}

@mixin thumb-hover() {
  background: #567896;
  border-color: #b8d0e4;
}

.kirby-range-field [type="range"] {
  flex: 1;

  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--val) - var(--min))/var(--range));
  --sx: calc(0.5*#{$thumb-d} + var(--ratio)*(100% - #{$thumb-d}));
  margin: 0;
  padding: 0;
  width: $track-w;
  height: $thumb-d;
  background: transparent;
  font: 1em/1 arial, sans-serif;

  &::-webkit-slider-runnable-track {
    @include track(1);
  }
  &::-moz-range-track {
    @include track;
  }
  &::-ms-track {
    @include track;
  }

  &::-moz-range-progress {
    @include fill;
  }
  &::-ms-fill-lower {
    @include fill;
  }

  &::-webkit-slider-thumb {
    margin-top: 0.5*($track-h - $thumb-d);
    @include thumb;
  }
  &::-moz-range-thumb {
    @include thumb;
  }
  &::-ms-thumb {
    margin-top: 0;
    @include thumb;
  }

  &::-ms-tooltip {
    display: none;
  }
}

.kirby-range-field:hover [type="range"] {
  &::-webkit-slider-thumb {
    @include thumb-hover;
  }
  &::-moz-range-thumb {
    @include thumb;
  }
  &::-ms-thumb {
    @include thumb-hover;
  }
}

.kirby-range-field .kirby-input-content > span {
  position: relative;
  max-width: 20%;
  color: $color-white;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  background: $color-dark;
  padding: 5px 10px;
  margin-left: 18px;
  white-space: nowrap;

  &::after {
    position: absolute;
    top: 50%;
    left: -7px;
    width: 0;
    height: 0;
    transform: translateY(-50%);
    border-top: 7px solid transparent;
    border-right: 7px solid $color-dark;
    border-bottom: 7px solid transparent;
    content: "";
  }
}
</style>
