<template>
  <div class="kirby-skeleton" :data-type="type">
    <div class="kirby-skeleton-image"></div>
    <div class="kirby-skeleton-text"></div>
    <div class="kirby-skeleton-option"></div>
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: 'list'
    }
  }
}

</script>

<style lang="scss">

@keyframes loading-skeleton {
  to {
    left: 100%;
  }
}

.kirby-skeleton {
  position: relative;
  overflow: hidden;
}

.kirby-skeleton > * {
  position: absolute;
  border-radius: 5rem;
  background: $color-border;
  overflow: hidden;
}
.kirby-skeleton > *::after {
  position: absolute;
  top: 0;
  left: -100%;
  bottom: 0;
  width: 200%;
  min-width: 9rem;
  content: "";
  animation: loading-skeleton 1.5s infinite;
  background: -webkit-linear-gradient(left, rgba($color-black, 0) 0%, rgba($color-dark-grey, .2) 50%, rgba($color-black, 0) 100%);
}
.kirby-skeleton-image {
  border-radius: $border-radius;
}
.kirby-skeleton-text,
.kirby-skeleton-option {
  height: .75rem;
}
.kirby-skeleton-option {
  right: 0;
  width: 2rem;
}

.kirby-skeleton[data-type="list"] {
  height: 2.5rem;
  margin-bottom: 2px;

  .kirby-skeleton-image {
    top: 0;
    left: 0;
    bottom: 0;
    width: 2.5rem;
  }

  .kirby-skeleton-text,
  .kirby-skeleton-option {
    top: 50%;
    margin-top: -.375rem;
  }

  .kirby-skeleton-text {
    left: 4rem;
    width: 33.33%;
  }
}

.kirby-skeleton[data-type="card"] {

  padding-bottom: calc(66.66% + 2.5rem);

  .kirby-skeleton-image {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 2.5rem;
    left: 0;
    width: 100%;
  }

  .kirby-skeleton-text {
    bottom: .75rem;
    left: 0;
    width: 40%;
  }

  .kirby-skeleton-option {
    bottom: .75rem;
  }

}


</style>
