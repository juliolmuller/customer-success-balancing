
class ValidationError extends Error {}

module.exports = ValidationError;

test('ValidationError instantiate a valid object that extends Error', () => {
  const validationError = new ValidationError('Test message');

  expect(validationError instanceof Error).toBe(true);
});

test('ValidationError is recognized when thrown', () => {
  const fnRun = () => {
    throw new ValidationError('Test message');
  };

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('Test message');
});
