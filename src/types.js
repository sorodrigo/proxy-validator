// @flow

export type ProxyFactory = (void) => Proxy<Object>

export type ValidationErrors = {
  [string]: {
    value: string,
    errorMessage: string
  }
};

export type ValidationRule = {
  options: ?mixed,
  errorMessage: string
};
export type ValidationRules = {
  [string]: boolean | ValidationRule
};

export type SanitizingRule = {
  options: ?mixed
};
export type SanitizingRules = {
  [string]: boolean | SanitizingRule
};
