<template>
  <kirby-view class="kirby-dashboard-view">

    <kirby-header label="Dashboard" link="/" icon="dashboard">
      Dashboard
    </kirby-header>

    <kirby-widgets>
      <!-- row 2 -->
      <kirby-widget size="1x1" headline="Twitter Followers">

      </kirby-widget>
      <kirby-widget size="1x1" headline="Sales">

      </kirby-widget>
      <kirby-widget size="1x1" headline="Visitors">

      </kirby-widget>

      <!-- row 1 -->
      <kirby-widget size="1x2" headline="Latest Articles">
        <!--<kirby-pages-collection :query="{parent: 'blog'}" :pagination="{hide: true}" />-->
      </kirby-widget>
      <kirby-widget size="2x2" headline="Latest Projects">
        <!--<kirby-pages-collection :query="{parent: 'projects'}" :pagination="{hide: true}" />-->
      </kirby-widget>

      <!-- row 3 -->
      <kirby-widget size="2x1" headline="Some more stats">

      </kirby-widget>
      <kirby-widget size="1x2" headline="New Users">
        <!--<kirby-users-collection :pagination="{hide: true}" />-->
      </kirby-widget>
      <kirby-widget size="1x1" headline="And another widget">

      </kirby-widget>
      <kirby-widget size="1x1" headline="And another widget">

      </kirby-widget>

    </kirby-widgets>

  </kirby-view>
</template>
