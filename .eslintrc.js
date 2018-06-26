module.exports = {
  env: {
    node: true
  },
  extends: ['eslint:recommended'],

  overrides: [
    {
      files: ['migrations/*.js', 'models/*.js'],
      parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
      }   
    }
  ]
};
