
import JsonToTwigTransformer from '../src/utils/JsonToTwigTransformer.js';

import fixture1Raw from './fixtures/fixture1.js';
import fixture2Raw from './fixtures/fixture2.js';
import fixture3Raw from './fixtures/fixture3.js';
import fixture4Raw from './fixtures/fixture4.js';
import fixture5Raw from './fixtures/fixture5.js';
import fixture6Raw from './fixtures/fixture6.js';
import fixture7Raw from './fixtures/fixture7.js';

describe('Test the json transform component', function() {
  function minify(str) {
    return str
      .replace(/\n/g, ' ')
      .replace(/ {2,}/g, ' ')
    ;
  }

  var fixtures = [
    fixture1Raw,
    fixture2Raw,
    fixture3Raw,
    fixture4Raw,
    fixture5Raw,
    fixture6Raw,
    fixture7Raw
  ];

  fixtures.forEach(function(fixture, index) {
    var fixtureNumber = index + 1;
    var fileName = 'fixture' + fixtureNumber + 'Raw';

    it('Should parse the ' + fileName + ' correctly', function() {
      var raw = JSON.parse(JSON.stringify(fixture));
      var transformedRaw = JsonToTwigTransformer.toJson(raw);
      var reverseTransformedRaw = JsonToTwigTransformer.toRaw(transformedRaw);

      expect(function () {
        JSON.parse(raw);
      }).toThrow();

      expect(function () {
        JSON.parse(transformedRaw);
      }).not.toThrow();

      // We minify to remove multiline differences
      expect(minify(reverseTransformedRaw)).toEqual(minify(raw));
    });
  });
});
