// tokenize single character
tokenizeCharacter = (type, value, input, current) => {
  return (value === input[current]) ? [1, { type, value }] : [0, null]
};

// open parentheses tokenizer
tokenizeParenOpen = (input, current) => {
  return tokenizeCharacter('paren', '(', input, current);
};

// closed parentheses tokenizer
tokenizeParenClose = (input, current) => {
  return tokenizeCharacter('paren', ')', input, current);
};

// tokenize multiple characters (using RegEx)
tokenizePattern = (type, pattern, input, current) => {
  let char = input[current];
  let consumedChars = 0;
  if (pattern.test(char)) {
    let value = '';
    while (char && pattern.test(char)) {
      value += char;
      consumedChars++;
      char = input[current + consumedChars];
    }
    return [consumedChars, { type, value }];
  }
  return [0, null]
}

// number tokenizer
tokenizeNumber = (input, current) => {
  return tokenizePattern('number', /[0-9]/, input, current);
};

// name tokenizer
tokenizeName = (input, current) => {
  return tokenizePattern('name', /[a-z]/i, input, current);
};

// string tokenizer (no escaping)
tokenizeString = (input, current) => {
  if (input[current] === '"') {
    let value = '';
    let consumedChars = 0;
    consumedChars++;
    char = input[current + consumedChars];
    while (char !== '"') {
      if (char === undefined) {
        throw new TypeError("unterminated string ");
      }
      value += char;
      consumedChars++;
      char = input[current + consumedChars];
    }
    return [consumedChars + 1, { type: 'string', value }];
  }
  return [0, null];
};

// skip whitespaces
skipWhiteSpace = (input, current) => {
  return (/\s/.test(input[current])) ? [1, null] : [0, null];
};

// array of all tokenizer functions
tokenizers = [skipWhiteSpace, tokenizeParenOpen, tokenizeParenClose, tokenizeString, tokenizeNumber, tokenizeName];

// take input and create tokens
tokenizer = (input) => {
  let current = 0;
  let tokens = [];
  while (current < input.length) {
    let tokenized = false;
    tokenizers.forEach(tokenizerfn => {
      if (tokenized) { return; }
      let [consumedChars, token] = tokenizerfn(input, current);
      if (consumedChars !== 0) {
        tokenized = true;
        current += consumedChars;
      }
      if (token) {
        tokens.push(token);
      }
    });
    if (!tokenized) {
      throw new TypeError('I dont know what this character is: ' + char);
    }
  }
  return tokens;
}