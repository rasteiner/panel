<template>
  <kirby-view class="kirby-dashboard-view">

    <kirby-header label="Dashboard" link="/" icon="dashboard">
      Dashboard
    </kirby-header>

    <kirby-widgets>
      <!-- row 2 -->
      <kirby-widget size="1x1" headline="Twitter Followers">
        <div class="kirby-widget-number">4.689</div>
      </kirby-widget>
      <kirby-widget size="1x1" headline="Sales">
        <div class="kirby-widget-number">€ 83 K</div>
      </kirby-widget>
      <kirby-widget size="1x1" headline="Visitors">
        <div class="kirby-widget-number">3.5 Mio</div>
      </kirby-widget>

      <!-- row 1 -->
      <kirby-widget size="1x2" headline="Latest Articles">
        <kirby-pages-collection :query="{parent: 'blog'}" :pagination="{hide: true}" />
      </kirby-widget>
      <kirby-widget size="2x2" headline="Latest Projects">
        <kirby-pages-collection :query="{parent: 'projects'}" :pagination="{hide: true}" layout="cards" />
      </kirby-widget>

      <!-- row 3 -->
      <kirby-widget size="2x1" headline="Some more stats">

      </kirby-widget>
      <kirby-widget size="1x2" headline="New Users">
        <kirby-users-collection :pagination="{hide: true}" />
      </kirby-widget>
      <kirby-widget size="1x1" headline="Latest update">
        <div class="kirby-widget-number">2 hrs ago</div>
      </kirby-widget>
      <kirby-widget size="1x1" headline="What time is it?">
        <div class="kirby-widget-number">23:59</div>
      </kirby-widget>

    </kirby-widgets>

  </kirby-view>
</template>


<style lang="scss">

.kirby-widget-number {
  position: absolute;
  bottom: 1rem;
  font-size: 3rem;
  z-index: 2;
}

.kirby-widget .kirby-table-cell {
  border-bottom: 1px solid $color-light;
}
.kirby-widget .kirby-table-cell .kirby-image {
  border-radius: 50%;
  overflow: hidden;
  width: 1.5rem !important;
  height: 1.5rem !important;
}
.kirby-widget .kirby-cards {
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
.kirby-widget .kirby-card-content {
  padding-left: 0;
  padding-right: 0;
}

</style>
