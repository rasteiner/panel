<template>
  <figure class="panel-image" :data-ratio="ratio" :data-back="back" :data-cover="cover">
    <span><img :src="src"></span>
  </figure>
</template>

<script>

export default {
  props: [
    'src',
    'ratio',
    'back',
    'cover'
  ]
}

</script>

<style>

.panel-image span {
  position: relative;
  display: block;
  line-height: 0;
  padding-bottom: 100%;
}
.panel-image img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;  
  height: 100%;
  object-fit: contain;
}

.panel-image[data-ratio="1/1"] span {
  padding-bottom: 100%;
}
.panel-image[data-ratio="3/2"] span {
  padding-bottom: 66.66%;
}

.panel-image[data-cover] img {
  object-fit: cover;
}

.panel-image[data-back="black"] span {
  background: #282c34;
}
.panel-image[data-back="white"] span {
  background: #fff;
}
.panel-image[data-back="pattern"] span {
  background: url(/images/pattern.png);
}

</style>
