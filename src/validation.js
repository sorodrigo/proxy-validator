// @flow
// $FlowFixMe
import validator from 'validator';
import type { ValidationRules, SanitizingRules } from './types';

const GENERIC_ERROR_MESSAGE = 'Invalid input';

export function checkRules(rules: ValidationRules = {}, value: string) {
  const errors = [];
  let success = true;
  Object.keys(rules)
    .forEach((rule) => {
      const validatorFn = validator[rule];
      const config = rules[rule];
      const options = (typeof config !== 'boolean') && config.options;
      const errorMessage = (typeof config !== 'boolean') ? config.errorMessage : GENERIC_ERROR_MESSAGE;
      success = validatorFn(value, options);
      if (!success) errors.push({ errorMessage, value });
    });

  return { success, errors };
}

export function applySanitizers(sanitizers: SanitizingRules = {}, value: mixed): mixed {
  return Object.keys(sanitizers)
    .reduce((result, sanitizer) => {
      const sanitizerFn = validator[sanitizer];
      const config = sanitizers[sanitizer];
      const options = (typeof config !== 'boolean') && config.options;
      return sanitizerFn(result, options);
    }, value) || value;
}
