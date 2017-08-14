<template>
  <div class="kirby-column" :data-width="width">
    <div class="kirby-column-content">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  props: ['width']
}

</script>

<style lang="scss">

.kirby-column {
  flex-grow: 1;
  display: flex;
}

.kirby-column[data-width="1/1"] {
  width: 100%;
}
.kirby-column[data-width="1/2"] {
  width: 50%;
}
.kirby-column[data-width="1/3"] {
  width: 33.33%;
}
.kirby-column[data-width="2/3"] {
  width: 66.66%;
}
.kirby-column[data-width="1/4"] {
  width: 25%;
  min-width: 15rem;
}
.kirby-column[data-width="1/5"] {
  width: 20%;
}
.kirby-column[data-width="2/5"] {
  width: 40%;
}
.kirby-column[data-width="3/5"] {
  width: 60%;
}
.kirby-column[data-width="4/5"] {
  width: 80%;
}
.kirby-column[data-width="1/6"] {
  width: 16.66%;
}
.kirby-column[data-width="2/6"] {
  width: 33.33%;
}
.kirby-column[data-width="3/6"] {
  width: 50%;
}
.kirby-column[data-width="4/6"] {
  width: 66.66%;
}
.kirby-column[data-width="5/6"] {
  width: 83.33%;
}
.kirby-column[data-width="3/4"] {
  width: 75%;
}

.kirby-column-content {
  width: 100%;
}

</style>
