/* eslint no-param-reassign: 0 */
import ValidationError from './error';
import { checkRules, applySanitizers } from './validation';

export default function ProxyValidator(schema, sanitizers) {
  const handler = {
    set(object, prop, value) {
      const { [prop]: rules } = schema;
      const { success, errors } = checkRules(rules, value);
      if (success) {
        const { [prop]: transforms } = sanitizers;
        object[prop] = applySanitizers(transforms, value);
        return success;
      }
      throw new ValidationError(errors);
    }
  };
  return function Proxied() {
    const target = {};
    return new Proxy(target, handler);
  };
}
