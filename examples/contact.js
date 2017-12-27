import ProxyValidator from '../src/index';

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

const ContactValidator = ProxyValidator(validators, sanitizers);

// Creates a proxy that will enforce the validator rules.
const withValidationContact = ContactValidator();

function proxyTestDrive(name) {
  try {
    withValidationContact.name = name;
    console.log('success!', withValidationContact);
  } catch (e) {
    console.error('Whoops!', e.message);
  }
}
proxyTestDrive('Mike');
//
proxyTestDrive('   MICHAEL');
// success! { name: 'MICHAEL' };
