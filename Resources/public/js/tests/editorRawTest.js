describe("Test the editorRaw component", function() {

  /**
   * Get the textarea component
   */
  function getEditorRawComponent() {
        var store = new Vuex.Store({
      state: {
        configuration: {},
        formProperties: {
          value: ''
        }
      }
    });

    var editorRawComponent = Vue.component('form-editor-raw');

    return new editorRawComponent({
      store: store
    });
  }

  it("Should parse the raw correctly", function() {
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

  it("Should transform the raw correctly", function() {
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

    var transformedRaw = transformRawToJson(raw);

    expect(transformedRaw).toEqual(expectedTransformedRaw);
  });

});
