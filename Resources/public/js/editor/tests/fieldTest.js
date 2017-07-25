
import Vue from 'vue';
import Vuex from 'vuex';
import editorAdvancedField from '../src/components/editor-advanced/field.vue';
import extraFormEditorGetters from '../src/store/getters.js';

describe('Test the field component', function() {

  Vue.use(Vuex);

  /**
   * Get the textarea component
   */
  function getFieldComponent(field) {
      var editorAdvancedFieldComponent = Vue.extend(editorAdvancedField);

      var store = new Vuex.Store({
          state: {
              configuration: {
                  configured_types_tags: [
                      'defaultTag1',
                      '-defaultTag2',
                      '+defaultTag3'
                  ]
              },
              formProperties: {
                  value: ''
              },
              configuredTypes: [
                  {
                      name: 'my_email',
                      tags: 'my_email_tag',
                      icon: 'envelope',
                      description: 'Email input field',
                      form_type: 'email',
                      form_type_name: 'email',
                      extra_form_options: {
                          label: {
                              extra_form_type: 'text',
                              options: {
                                  required: false,
                                  data: 'ouais le mien'
                              }
                          },
                          extra_form_constraints: {}
                      }
                  }
              ]
          },
          getters: extraFormEditorGetters
      });

      return new editorAdvancedFieldComponent({
          store: store,
          propsData: {
              index: 1,
              field: field
          }

      }).$mount();
  }

  it('Should initialize tags correctly', function() {
      var vm = getFieldComponent({
          tags: 'francois,nicolas,macron'
      });

      expect(vm.tags).toEqual('francois,nicolas,macron');

      var vm = getFieldComponent({
          name: 'my_email',
          tags: 'the_good_tag'
      });

      expect(vm.tags).toEqual('the_good_tag');

      var vm = getFieldComponent({
          name: 'my_email',
      });

      expect(vm.tags).toEqual('my_email_tag');

      var vm = getFieldComponent({
          name: 'un_unknow_field'
      });

      expect(vm.tags).toEqual('defaultTag1,+defaultTag3');
  });

});
