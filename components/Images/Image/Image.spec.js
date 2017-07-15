import Vue from 'vue';
import Image from './Image.vue';

const components = {
  'kirby-image': Image
};

describe('Image', () => {
  it('is hidden to access tech by default', () => {
    const vm  = new Vue({
      components,
      template: '<kirby-image></kirby-image>'
    }).$mount();

    expect(vm.$el.querySelector('img').getAttribute('alt')).toBe('');
  });

  it('can have accessible text', () => {
    const vm  = new Vue({
      components,
      template: '<kirby-image alt="Alt Text"></kirby-image>'
    }).$mount();

    expect(vm.$el.querySelector('img').getAttribute('alt')).toBe('Alt Text');
  });
});
