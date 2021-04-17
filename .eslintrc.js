module.exports = {
  env: {
    browser: true,
    es6:     true,
    node:    true,
  },
  extends:  ['eslint:recommended', 'plugin:react/recommended'],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma:      'React',
      version:     'detect',
    },
  },
  globals: {
    Atomics:           'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser:        'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType:  'module',
  },
  plugins: ['react'],
  rules:   {
    quotes:               ['error', 'single'],
    semi:                 [0],
    indent:               ['error', 2],
    'max-len':            ['error', { code: 80 }],
    'react/prop-types':   [0],
    'react/display-name': [0],
    'no-multi-spaces':    [
      1,
      {
        exceptions: {
          ImportDeclaration:  true,
          PropertyAssignment: false,
          VariableDeclarator: true,
        },
      },
    ],
    'key-spacing': [
      2,
      {
        multiLine: {
          align: 'value',
        },
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays:    'always-multiline', //only-multiline
        exports:   'always-multiline',
        functions: 'only-multiline',
        imports:   'always-multiline',
        objects:   'always-multiline',
      },
    ],
  },
}
