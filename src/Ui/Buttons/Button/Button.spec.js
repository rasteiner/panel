import Vue from 'vue';

describe('Button', () => {
  it('renders the text', () => {
    const vm  = new Vue({
      template: '<kirby-button>Test!</kirby-button>'
    }).$mount();

    expect(vm.$el.textContent.match("Test")).not.toBeNull();
  });

  it('can have an icon', () => {
    const vm = new Vue({
      template: '<kirby-button icon="positive"></kirby-button>',
    }).$mount();

    expect(vm.$el.querySelector('.kirby-icon')).toBeDefined();
  });
});
