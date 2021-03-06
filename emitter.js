const emitNumber = node => node.value;

const emitString = node => `${node.value}`;

const emitProgram = node => {
  return node.body.map(exp => {
    return emitter(exp) + ';'
  })
  .join('\n');
};

const emitExpression = node => {
  return `${node.name}(${node.params.map(emitter).join(', ')})`
};

const emitter = node => {
  switch (node.type) {
    case 'Program':
      return emitProgram(node);
    case 'CallExpression':
      return emitExpression(node);
    case 'NumberLiteral':
      return emitNumber(node);
    case 'StringLiteral':
      return emitString(node);
    default:
      throw new TypeError(node.type);
  }
};

module.exports = emitter;
