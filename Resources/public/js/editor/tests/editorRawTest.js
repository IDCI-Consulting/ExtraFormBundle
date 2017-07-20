
import Vue from 'vue';
import Vuex from 'vuex';
import formEditorRawComponent from '../editor/components/editor-raw.vue';
import JsonToTwigTransformer from '../editor/utils/JsonToTwigTransformer.js';

describe("Test the editorRaw component", function() {

  Vue.component('form-editor-raw', formEditorRawComponent);
  Vue.use(Vuex);

  /**
   * Get the textarea component
   */
  function getEditorRawComponent(value) {
    if ('undefined' === typeof value) {
      value = '';
    }

    var store = new Vuex.Store({
      state: {
        configuration: {},
        formProperties: {
          value: value
        }
      }
    });

    var editorRawComponent = Vue.component('form-editor-raw');

    return new editorRawComponent({
      store: store
    });
  }

  it('Should parse the raw correctly', function() {
    var vm = getEditorRawComponent();
    vm.$mount();

    var raw = JSON.parse(JSON.stringify({
      boy_girl: {
        extra_form_type: 'choice',
        constraints: [],
        options: {
          choices: [
            'boy',
            'girl'
          ],
          label: 'Boy or girl?'
        }
      }
    }));

    var expectedFields =  [{
      name: 'boy_girl',
      extra_form_type: 'choice',
      constraints: [],
      options: {
        choices: [
          'boy',
          'girl'
        ],
        'label': 'Boy or girl?'
      },
      active: true
    }];

    var fields = vm.createFieldsRecursively(raw);

    expect(fields).toEqual(expectedFields);
  });

  it('Should transform the raw correctly', function() {
    var vm = getEditorRawComponent();
    vm.$mount();

    var raw = '{ ' +
      '"boy_girl":{ ' +
        '"extra_form_type":"choice", ' +
        '"constraints":[], ' +
        '"options":{ ' +
          '"choices":["boy","girl"], ' +
          '"label":"Boy or girl?", ' +
          '"data": { ' +
            '"twig":"{{ \'{{ user.id|default(\\\'\\\') }}\' }}" ' +
          '} ' +
        '} ' +
      '} ' +
    '}';

    var expectedTransformedRaw = '{ ' +
      '"boy_girl":{ ' +
        '"extra_form_type":"choice", ' +
        '"constraints":[], ' +
        '"options":{ ' +
          '"choices":["boy","girl"], ' +
          '"label":"Boy or girl?", ' +
          '"data": { ' +
            '"twig":"{{ \'{{ user.id|default(\\\\\'\\\\\') }}\' }}" ' +
          '} ' +
        '} ' +
      '} ' +
    '}';

    var transformedRaw = JsonToTwigTransformer.toJson(raw);

    expect(transformedRaw).toEqual(expectedTransformedRaw);
  });

  it('Should display the line number of the error', function() {
    var vm = getEditorRawComponent('{\n\"action\":\"retrieve_availability_product\",\n\"name\":\"retrieved_availability_product\",\n\"parameters\":{\n\"stockspace\":\"ferrerounica\",\n\"id\",:\"{{participation.offer.products.0.id}}\",\n\"quantity\":1\n}\n}');
    vm.$mount();

    expect(vm.error.lineNumber).toEqual(6);
  });

});
