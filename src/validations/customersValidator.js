const ValidationError = require('../errors/ValidationError');

const MIN_CUSTOMERS_LENGTH = 1;
const MAX_CUSTOMERS_LENGTH = 999999;
const MIN_CUSTOMERS_ID = 1;
const MAX_CUSTOMERS_ID = 999999;
const MIN_CUSTOMERS_SCORE = 1;
const MAX_CUSTOMERS_SCORE = 99999;

/**
 * Validates if the array of customers is valid
 *
 * @param {array} customers
 *
 * @return {true}
 * @throws {SameLevelCustomerSuccessError | ValidationError}
 */
function areCustomersValid(customers) {
  // Test customers list length
  if (customers.length < MIN_CUSTOMERS_LENGTH || customers.length > MAX_CUSTOMERS_LENGTH) {
    throw new ValidationError(`List of customers must have between ${MIN_CUSTOMERS_LENGTH} and ${MAX_CUSTOMERS_LENGTH} items.`);
  }

  customers.forEach((cs, index) => {
    // Test customers IDs
    if (cs.id < MIN_CUSTOMERS_ID || cs.id > MAX_CUSTOMERS_ID) {
      throw new ValidationError(`Customer index ${index} must have an ID between ${MIN_CUSTOMERS_ID} and ${MAX_CUSTOMERS_ID}.`);
    }

    // Test customers scores
    if (cs.score < MIN_CUSTOMERS_SCORE || cs.score > MAX_CUSTOMERS_SCORE) {
      throw new ValidationError(`Customer index ${index} must have a score between ${MIN_CUSTOMERS_SCORE} and ${MAX_CUSTOMERS_SCORE}.`);
    }
  });

  return true;
}

module.exports = { areCustomersValid };

function makeCustomersList(count) {
  return Array(count)
    .fill(undefined)
    .map((_, index) => ({
      id: index + 1,
      score: (index + 1) * 10,
    }));
}

test('Validate minimum customers length', () => {
  const customers = [];
  const fnRun = () => areCustomersValid(customers);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('List of customers must have between 1 and 999999 items.');
});

test('Validate maximum customers length', () => {
  const customers = makeCustomersList(1000000);
  const fnRun = () => areCustomersValid(customers);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('List of customers must have between 1 and 999999 items.');
});

test('Validate minimum customer ID', () => {
  const customers = makeCustomersList(10);
  customers.push({ id: 0, score: 200 });
  const fnRun = () => areCustomersValid(customers);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('Customer index 10 must have an ID between 1 and 999999.');
});

test('Validate maximum customer ID', () => {
  const customers = makeCustomersList(10);
  customers.push({ id: 1000000, score: 200 });
  const fnRun = () => areCustomersValid(customers);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('Customer index 10 must have an ID between 1 and 999999.');
});

test('Validate minimum customer score', () => {
  const customers = makeCustomersList(10);
  customers.push({ id: 100, score: 0 });
  const fnRun = () => areCustomersValid(customers);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('Customer index 10 must have a score between 1 and 99999.');
});

test('Validate maximum CS score', () => {
  const customers = makeCustomersList(10);
  customers.push({ id: 100, score: 100000 });
  const fnRun = () => areCustomersValid(customers);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('Customer index 10 must have a score between 1 and 99999.');
});
