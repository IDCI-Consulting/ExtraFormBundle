
import Vue from 'vue';
import textareaOption from '../editor/components/common/options/textarea.vue.js';

describe("Test the textareaOption component", function() {

  /**
   * Get the textarea component
   */
  function getTextareaComponent() {
    var textareaOptionComponent = Vue.extend(textareaOption);

    return new textareaOptionComponent({
      propsData: {
        option: {
          options: {}
        },
        name: 'textarea test',
        value: 'simple string'
      }
    });
  }

  it("Should set the classes correctly", function(done) {
    var vm = getTextareaComponent();
    vm.$mount();

    expect(vm.classes).toBe('');

    vm.onOptionValueChanged('{"key": "value"}').then(function () {
      expect(vm.classes).toBe('fa fa-check success feedback');
      done();
    });
  });

  it("Should set the classes correctly", function(done) {
    var vm = getTextareaComponent();
    vm.$mount();

    vm.onOptionValueChanged('["value1", "value2"]').then(function () {
      expect(vm.classes).toBe('fa fa-check success feedback');
      done();
    });
  });

  it("Should set the classes correctly", function(done) {
    var vm = getTextareaComponent();
    vm.$mount();

    vm.onOptionValueChanged('{key": "value"}').then(function () {
      expect(vm.classes).toBe('fa fa-exclamation-circle warning feedback');
      done();
    });
  });

});
