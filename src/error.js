
function ValidationError(errors) {
  this.name = 'ValidationError';
  this.message = JSON.stringify(errors, null, '  ');
  this.stack = new Error().stack;
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

export default ValidationError;
