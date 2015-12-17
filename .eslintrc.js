'use strict';
/**
* See http://eslint.org/docs/rules for the rules that eslint:recommended turns on by default.
* Rule Settings:
*  0 - off
*  1 - warning
*  2 - error
*/
var MAX_STATEMENTS_IN_FN = 20;
var NUM_SPACES_INDENT = 2;

module.exports = {
  rules: {
    // Possible Errors
    'comma-dangle': [2, 'never'],
    'no-cond-assign': [2, 'always'],
    'no-console': 0,
    'no-extra-parens': [2, 'functions'],
    'no-inner-declarations': 0,    // With ES6, inner functions are allowed
    'no-unexpected-multiline': 2,
    'valid-jsdoc': [2, {
      requireReturn: false     // Only applies if the function has no return
    } ],

    // Best Practices
    'block-scoped-var': 2,
    'consistent-return': 2,
    'curly': [2, 'multi-line'],   // Allow single w/o braces, require multi w/braces
    'default-case': 2,            // Require default case in switch statements
    'dot-notation': [2, { allowKeywords: true } ],
    'eqeqeq': 2,                  // Require === and !==
    'guard-for-in': 2,
    'no-alert': 2,
    'no-caller': 0,               // Callee is used in Leaflet among other dependencies
    'no-else-return': 2,
    'no-empty-pattern': 2,
    'no-eq-null': 2,              // Related to eqeqeq
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,           // Typically a code error
    'no-fallthrough': 2,          // Default is on. Disables unsafe fallthrough in switch statements
    'no-floating-decimal': 2,
    'no-implicit-coercion': 2,
    'no-implied-eval': 2,
    'no-invalid-this': 1,
    'no-iterator': 2,
    'no-labels': 2,
    'no-loop-func': 2,
    'no-magic-numbers': [1, { enforceConst: false } ],
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-native-reassign': 2,
    'no-new-func': 2,             // Passing it a string is like calling eval on the string
    'no-new-wrappers': 2,         // No using Boolean/Number/String with the 'new' operator
    'no-new': 2,                  // No 'new Object()' calls unless you're assigning it to something
    'no-octal-escape': 2,
    'no-octal': 2,                // Default
    'no-param-reassign': 1,
    'no-process-env': 1,
    'no-proto': 2,
    'no-redeclare': [2, { builtinGlobals: true } ],   // Default. We made it stricter
    'no-return-assign': [2, 'except-parens'],
    'no-script-url': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-throw-literal': 2,
    'no-unused-expressions': 2,
    'no-useless-call': 2,
    'no-useless-concat': 2,
    'no-void': 2,
    'no-warning-comments': 1,     // Might mean the code isn't ready; warn at least.
    'no-with': 2,
    'radix': 1,
    'vars-on-top': 2,
    'wrap-iife': 2,               // Require immediate function invocation to be wrapped in parentheses
    'yoda': [2, 'always'],

    // Strict mode
    'strict': [2, 'global'],

    // Variables
    'no-catch-shadow': 2,
    'no-delete-var': 2,           // Default
    'no-label-var': 2,
    'no-shadow-restricted-names': 2,
    'no-shadow': 2,
    'no-undef-init': 2,
    'no-undef': [2, { typeof: false } ],
    'no-unused-vars': [2, { vars: 'local' } ],
    'no-use-before-define': [2, 'nofunc'],

    // Node.js and CommonJS
    'callback-return': 1,
    'global-require': 0,          // TODO used in setup-tests for now
    'no-new-require': 2,
    'no-path-concat': 2,
    'no-process-exit': 1,

    // Stylistic Issues
    'array-bracket-spacing': [2, 'never', {
      arraysInArrays: true,
      objectsInArrays: true
    } ],
    'block-spacing': 2,
    'brace-style': 0,
    'camelcase': [2, { properties: 'never' } ],
    'comma-spacing': [2, { after: true } ], // Default
    'comma-style': [2, 'last'],   // Default
    'computed-property-spacing': [2, 'never'],
    'consistent-this': [1, 'self'],
    'no-multiple-empty-lines': [1, { max: 2 } ],
    'func-names': 1,
    'indent': [1, NUM_SPACES_INDENT],
    'key-spacing': [2, { beforeColon: false, afterColon: true } ],
    'linebreak-style': [2, 'unix'],
    'max-statements': [1, MAX_STATEMENTS_IN_FN],
    'new-cap': 2,
    'new-parens': 2,
    'newline-after-var': [1, 'always'],
    'no-array-constructor': 2,
    'no-bitwise': 1,
    'no-mixed-spaces-and-tabs': 2,
    'no-nested-ternary': 2,
    'no-new-object': 1,
    'no-spaced-func': 2,
    'no-trailing-spaces': 1,
    'no-unneeded-ternary': 1,
    'object-curly-spacing': [1, 'always'],
    'operator-assignment': [1, 'always'],
    'operator-linebreak': 1,
    'quote-props': [1, 'consistent-as-needed'],
    'quotes': [1, 'single', 'avoid-escape'],
    'semi-spacing': [2, { before: false, after: true } ],
    'semi': [2, 'always'],
    'space-after-keywords': [1, 'always'],
    'space-before-blocks': [1, 'always'],
    'space-before-function-paren': [1, { anonymous: 'always', named: 'never' } ],
    'space-infix-ops': 1,
    'space-return-throw-case': 1,
    'space-unary-ops': 1,
    'spaced-comment': 1,
    'wrap-regex': 1
  },
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended'
};