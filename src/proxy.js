// @flow
/* eslint no-param-reassign: 0 */
import ValidationError from './error';
import { checkRules, applySanitizers } from './validation';
import type { ProxyFactory } from './types';

export default function ProxyValidator(schema: Object, sanitizersSchema: Object): ProxyFactory {
  const handler = {
    set(object: Object, prop: string, value: string): boolean {
      let sanitizedValue = value;
      if (sanitizersSchema) {
        const { [prop]: sanitizers } = sanitizersSchema;
        // save sanitized value for later validation
        sanitizedValue = applySanitizers(sanitizers, value);
      }

      // apply validation rules on sanitizedValue
      const { [prop]: rules } = schema;
      const { success, errors } = checkRules(rules, sanitizedValue);
      if (success) {
        object[prop] = sanitizedValue;
        return success;
      }

      throw new ValidationError({ [prop]: errors });
    }
  };
  return function Proxied(): Object {
    const target = {};
    return new Proxy(target, handler);
  };
}
