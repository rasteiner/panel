import Vue from 'vue';

Vue.directive('tab', {
  inserted: function (el) {
    el.addEventListener('keyup', function(e) {
      if (e.keyCode === 9) {
        el.dataset.tabbed = true;
      }
    });
    el.addEventListener('blur', function() {
      delete el.dataset.tabbed;
    });
  }
});
