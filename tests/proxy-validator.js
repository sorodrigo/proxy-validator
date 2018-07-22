import ProxyValidator  from '../src/index';
import { ValidationError } from '../src/error';

const validators = {
  name: {
    isLength: {
      options: {
        min: 6
      },
      errorMessage: 'Minimum length 6 characters.'
    },
    isUppercase: true,
    isAlphanumeric: true,
  },
};

const sanitizers = {
  name: {
    trim: true
  }
};

function assignName(name) {
  contact.name = name;
}

const ContactValidator = ProxyValidator(validators, sanitizers);
const contact = ContactValidator();

test('one validation rule fails', () => {
  expect(() => assignName('MIKE')).toThrow(ValidationError);
});

test('multiple validation rules fail', () => {
  expect(() => assignName('Mike')).toThrow(ValidationError);
});

test('one validation rules fail w/ sanitizing', () => {
  expect(() => assignName('   JENNY')).toThrow(ValidationError);
});

test('multiple validation rules fail w/ sanitizing', () => {
  expect(() => assignName('   Jenny')).toThrow(ValidationError);
});

test('validation succeed', () => {
  assignName('MICHAEL');
  expect(contact.name).toBe('MICHAEL');
});

test('validation succeed w/ sanitizing', () => {
  assignName('     MICHAEL');
  expect(contact.name).toBe('MICHAEL');
});




