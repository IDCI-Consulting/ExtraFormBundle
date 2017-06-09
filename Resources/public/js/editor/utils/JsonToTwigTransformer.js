JsonToTwigTransformer = {

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
    var twigStatmentRegex = /{{(.*)?}}/g;

    /**
     * [\s\S]* matches new lines
     */
    var twigOperationsArrayRegex = /\[{%([\s\S]*.*)%}\]/g;

    /**
     * "key1.key2": [ ... ]
     * [\s\S]* matches new lines
     */
    var twigOperationsArrayNotInStatmentRegex = /("([\w.|]*)"): (\[{%([\s\S]*.*)%}\])/g;

    /**
     * Format twig statements
     */
    function formatTwigStatements(twigStatement) {
      return twigStatement
        .replace(/\\/g, '\\\\') //    \  -> \\
        .replace(/"/g, '\\"');   //    "  -> \"
    }

    /**
     * Format the twig operations array
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
    function formatTwigOperationsArray(twigOperationArray) {
      return twigOperationArray
          .replace(/([^\\])"/g, '$1\\"') // [^\\] -> everything except \
          .replace(/\r?\n|\r/g, ' ')     // replace line breaks by spaces
          .replace(/ {2,}/g, ' ');        // replace 2 or more spaces by only one
    }

    return raw
      .replace(twigStatmentRegex, formatTwigStatements)
      .replace(twigOperationsArrayRegex, formatTwigOperationsArray)
      .replace(twigOperationsArrayNotInStatmentRegex, '$1: "$3"'); // add "" around twig arrays not in twig statement
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
    var twigStatmentRegex = /{{(.*)?}}/g;

    var twigOperationsArrayRegex = /"\[{%(.*)%}\]"/g;

    /**
     * Format twig statements
     *
     * Ex: {{ raw_benefit|json_encode|trim(\\'\\\"\\')|raw }} -> {{ raw_benefit|json_encode|trim(\\'\\"\\')|raw }}
     */
    function formatTwigStatements(twigStatement) {
      return twigStatement
        .replace(/\\\\/g, '\\') //  \\ -> \
        .replace(/\\"/g, '"');   //  \"  -> "
    }

    /**
     * Format the twig operations array
     *
     * Ex:
     *     "history": "[{% for b in bs %}{\"id\": \"{{ b.position }}\",}{% if not loop.last %},{% endif %}{% endfor %}]"
     *     ->
     *     "history": [{% for b in bs %} {"id": "{{ b.position }}",}{% if not loop.last %},{% endif %}{% endfor %}]
     */
    function formatTwigOperationsArray(twigOperationsArray) {
      var replacement = twigOperationsArray
          .replace(/\\"/g, '"')
          .replace(/\\\\'/g, '\\\'');

      // Unwrap the twig form the quotes
      return replacement.substring(1, replacement.length -1);
    }

    return json
      .replace(twigStatmentRegex, formatTwigStatements)
      .replace(twigOperationsArrayRegex, formatTwigOperationsArray);
  }

};