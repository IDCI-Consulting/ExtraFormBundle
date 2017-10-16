
import { hashCode } from './utils';

export default {

  /**
   * Transform a raw string in json
   *
   * The content of the step workflow is a wrong json containing for example twig strings
   * which prevent the string to be parsed in json. This function makes it parse-able
   */
  toJson: function (raw) {

    /**
     * "{{ ... }}"
     */
    var twigStatementRegex = /{{.*?}}/g;

    /**
     * [\s\S]*? matches new lines between zero and unlimited times, as few times as possible
     */
    var twigOperationArrayRegex = /\[(\s*?){%([\s\S]*?)%}(\s*?)\]/g;

    /**
     * "key1.key2": [ ... ]
     * [\s\S]* matches new lines
     */
    var twigOperationArrayNotInStatementRegex = /("([\w.|]*)"): (\[(\s*?){%([\s\S]*?)%}(\s*?)\])/g;

    /**
     * Format twig statements
     */
    function formatTwigStatement (twigStatement) {
      return twigStatement
        // \ -> \\
        .replace(/\\/g, '\\\\')

        //" -> \"
        .replace(/"/g, '\\"');
    }

    /**
     * Format the twig operation array
     *
     * Ex:
     *     "history": [{% for b in bs %}
     *     {
     *         "id": "{{ b.position }}",
     *     }{% if not loop.last %},{% endif %}
     *     {% endfor %}]
     *
     *     ->
     *
     *     "history": "[{% for b in bs %}{\"id\": \"{{ b.position }}\",}{% if not loop.last %},{% endif %}{% endfor %}]"
     */
    function formatTwigOperationArray (twigOperationArray) {
      var jsonLine = twigOperationArray
        .removeLineBreaksAnsExtraSpaces()

        // [^\\] means everything except \
        .replace(/([^\\])"/g, '$1\\"');

      // Save the raw json

      localStorage.setItem(hashCode(jsonLine), twigOperationArray);

      return jsonLine;
    }

    /**
     * Add "" around twig arrays not in twig statement
     *
     * @param twigOperationArrayNotInStatement
     * @param group1
     * @param group2
     * @param group3
     *
     * @returns {string}
     */
    function formatTwigOperationArrayNotInStatement (twigOperationArrayNotInStatement, group1, group2, group3) {
      return group1 + ': "' + group3 + '"';
    }

    return raw
      .replace(twigStatementRegex, formatTwigStatement)
      .replace(twigOperationArrayRegex, formatTwigOperationArray)
      .replace(twigOperationArrayNotInStatementRegex, formatTwigOperationArrayNotInStatement);
  },

  /**
   * Reverse transform json to raw content
   *
   * @param json
   * @returns {*}
   */
  toRaw: function (json) {

    /**
     * "{{ ... }}"
     */
    var twigStatementRegex = /{{(.*)?}}/g;

    var twigOperationArrayRegex = /"\[( {0,1}){%(.*)?%}( {0,1})\]"/g;

    /**
     * Format twig statements
     *
     * Ex: {{ raw_benefit|json_encode|trim(\\'\\\"\\')|raw }} -> {{ raw_benefit|json_encode|trim(\\'\\"\\')|raw }}
     */
    function formatTwigStatement (twigStatement) {
      return twigStatement
        // \\ -> \
        .replace(/\\\\/g, '\\')
        // \"  -> "
        .replace(/\\"/g, '"');
    }

    /**
     * Format the twig operations array
     *
     * Ex:
     *     "history": "[{% for b in bs %}{\"id\": \"{{ b.position }}\",}{% if not loop.last %},{% endif %}{% endfor %}]"
     *     ->
     *     "history": [{% for b in bs %} {"id": "{{ b.position }}",}{% if not loop.last %},{% endif %}{% endfor %}]
     */
    function formatTwigOperationArray (twigOperationsArray) {
      var jsonLine = twigOperationsArray.substring(1, twigOperationsArray.length - 1);

      // Retrieve the saved raw json
      if (localStorage.getItem(hashCode(jsonLine)) !== null) {
        return localStorage.getItem(hashCode(jsonLine));
      }

      return jsonLine
        .replace(/\\"/g, '"')
        .replace(/\\\\'/g, '\\\'');
    }

    return json
      .replace(twigOperationArrayRegex, formatTwigOperationArray)
      .replace(twigStatementRegex, formatTwigStatement);
  }

};
