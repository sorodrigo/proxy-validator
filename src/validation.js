import validator from 'validator';

const GENERIC_ERROR_MESSAGE = 'Invalid input';

export function checkRules(rules = {}, value) {
  const errors = [];
  let success = true;
  Object.keys(rules)
    .forEach((rule) => {
      const validatorFn = validator[rule];
      const config = rules[rule];
      const { options, errorMessage = GENERIC_ERROR_MESSAGE } = config;
      success = validatorFn(value, options);
      if (!success) errors.push({ errorMessage, value });
    });

  return { success, errors };
}

export function applySanitizers(sanitizers = {}, value) {
  return Object.keys(sanitizers)
    .reduce((result, sanitizer) => {
      const sanitizerFn = validator[sanitizer];
      const options = sanitizers[sanitizer];
      return sanitizerFn(result, options);
    }, value) || value;
}
