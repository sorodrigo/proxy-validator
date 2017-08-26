// @flow
/* eslint no-param-reassign: 0 */
import ValidationError from './error';
import { checkRules, applySanitizers } from './validation';
import type { ProxyFactory } from './types';

export default function ProxyValidator(schema: Object, sanitizersSchema: Object): ProxyFactory {
  const handler = {
    set(object: Object, prop: string, value: string): boolean {
      const { [prop]: rules } = schema;
      const { success, errors } = checkRules(rules, value);
      if (success) {
        const { [prop]: sanitizers } = sanitizersSchema;
        object[prop] = applySanitizers(sanitizers, value);
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
