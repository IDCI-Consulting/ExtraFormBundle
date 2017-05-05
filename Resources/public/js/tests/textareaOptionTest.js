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

  it("Should set the classes correctly", function() {
    var vm = getTextareaComponent();
    vm.$mount();

    expect(vm.classes).toBe('');

    vm.onOptionValueChanged('{"key": "value"}');
    expect(vm.classes).toBe('fa fa-check success feedback');

    vm.onOptionValueChanged('["value1", "value2"]');
    expect(vm.classes).toBe('fa fa-check success feedback');

    vm.onOptionValueChanged('{key": "value"}');
    expect(vm.classes).toBe('fa fa-exclamation-circle warning feedback');
  });

});
