import Vue from 'vue';
import Icon from './Icon.vue';

const components = {
  'kirby-icon': Icon
};

describe('Icon', () => {
  it('is hidden to access tech by default', () => {
    const vm  = new Vue({
      components,
      template: '<kirby-icon type="positive"></kirby-icon>'
    }).$mount();

    expect(vm.$el.getAttribute('aria-hidden')).toBe('true');
  });

  it('can have accessible text', () => {
    const vm  = new Vue({
      components,
      template: '<kirby-icon type="positive" alt="Alt Text"></kirby-icon>'
    }).$mount();

    expect(vm.$el.getAttribute('aria-hidden')).not.toBe('true');
    expect(vm.$el.getAttribute('role')).toBe('img');
    expect(vm.$el.getAttribute('aria-label')).toBe('Alt Text');
  });
});
