<template>
  <div class="panel-column" :data-width="width">
    <div class="panel-column-content">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  props: ['width']
}

</script>

<style>

.panel-column {
  flex-grow: 1;
  display: flex;
}
.panel-column[data-width="1/1"] {
  width: 100%;
}
.panel-column[data-width="1/2"] {
  width: 50%;
}
.panel-column[data-width="1/3"] {
  width: 33.33%;
}
.panel-column[data-width="2/3"] {
  width: 66.66%;
}
.panel-column[data-width="1/4"] {
  width: 25%;
}
.panel-column[data-width="1/5"] {
  width: 20%;
}
.panel-column[data-width="2/5"] {
  width: 40%;
}
.panel-column[data-width="3/5"] {
  width: 60%;
}
.panel-column[data-width="4/5"] {
  width: 80%;
}
.panel-column[data-width="1/6"] {
  width: 16.66%;
}
.panel-column[data-width="2/6"] {
  width: 33.33%;
}
.panel-column[data-width="3/6"] {
  width: 50%;
}
.panel-column[data-width="4/6"] {
  width: 66.66%;
}
.panel-column[data-width="5/6"] {
  width: 83.33%;
}
.panel-column[data-width="3/4"] {
  width: 75%;
}
.panel-column-content {
  width: 100%;
}

</style>
