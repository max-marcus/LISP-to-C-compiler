const tokenizer = require('./tokenizer');
const parser = require('./parser');
const emitter = require('./emitter');

const compiler = input => {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const output = emitter(ast);

  return output;
};
