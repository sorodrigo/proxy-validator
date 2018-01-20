[![Build Status](https://travis-ci.org/sorodrigo/proxy-validator.svg?branch=master)](https://travis-ci.org/sorodrigo/proxy-validator)
# proxy-validator

Small package that leverages the power of ES6 Proxy to validate and sanitize objects.

Learn More, read the article:

[How I made a validation library using ES6 Proxy](https://hackernoon.com/how-i-made-a-validation-library-using-es6-proxy-59df82c1a4c0)

### Installation
```bash
$ npm i proxy-validator
```

### Usage
The API is fairly simple. Create a validator by providing a validation schema and/or a sanitizing schema.
```js
import ProxyValidator from 'proxy-validator';

// The schema props correspond to the props that will be validated.
const validators = {
  // Define a set of rules to apply for each prop, each rule is formed by a key and a value.
  name: {
    // The key corresponds to a validator function.
    isLength: {
      // The value can be either an object, containing options and an errorMessage...
      options: {
        min: 6
      },
      errorMessage: 'Minimum length 6 characters.'
    },
    // ...or a boolean, in which case the message will be the default one.
    isUppercase: true
  },
  mobile: {
    isMobilePhone: {
      options: 'en-GB',
      errorMessage: 'Invalid mobile number.'
    },
    isAlphanumeric: true
  }
};

const sanitizers = {
  // As with the validation, the sanitizing schema is formed by a a key/value pair.
  name: {
    // The key corresponds with the sanitizing function
    trim: true // and the value can be either boolean (use defaults)
  },
  email: {
    normalizeEmail: {
      options: { // ...or a config options object.
        all_lowercase: true
      }
    }
  }
};

// Creates a validator
const ContactValidator = ProxyValidator(validators, sanitizers);

// Creates a proxy that will enforce the validator rules.
const contact = ContactValidator();

contact.name = 'Mike'; // throws errors
contact.name = ' MICHAEL';
console.log(contact); // { name: 'MICHAEL' };
```

### Validators
The validation is based on the amazing lib `validator` by **chriso**. Find the complete list of available validators and sanitizers in [here](https://github.com/chriso/validator.js).
