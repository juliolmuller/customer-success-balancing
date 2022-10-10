const ValidationError = require('../errors/ValidationError');

const MIN_CSS_LENGTH = 1;
const MAX_CSS_LENGTH = 999;
const MIN_CSS_ID = 1;
const MAX_CSS_ID = 999;
const MIN_CSS_SCORE = 1;
const MAX_CSS_SCORE = 9999;

/**
 * Validates if the array of CS's is valid
 *
 * @param {array} css
 * @param {number?} cssOffCount
 *
 * @return {true}
 * @throws {ValidationError | ValidationError}
 */
function areCssValid(css, cssOffCount = 0) {
  // Test CSs list length
  if (css.length < MIN_CSS_LENGTH || css.length > MAX_CSS_LENGTH) {
    throw new ValidationError(`List of CSs must have between ${MIN_CSS_LENGTH} and ${MAX_CSS_LENGTH} items.`);
  }

  // Test absence tolerance (n/2)
  if (cssOffCount > Math.ceil(css.length / 2)) {
    throw new ValidationError(`There are too many CSs off right now.`);
  }

  css.forEach((cs, index) => {
    // Test CSs IDs
    if (cs.id < MIN_CSS_ID || cs.id > MAX_CSS_ID) {
      throw new ValidationError(`CS index ${index} must have an ID between ${MIN_CSS_ID} and ${MAX_CSS_ID}.`);
    }

    // Test CSs scores
    if (cs.score < MIN_CSS_SCORE || cs.score > MAX_CSS_SCORE) {
      throw new ValidationError(`CS index ${index} must have a score between ${MIN_CSS_SCORE} and ${MAX_CSS_SCORE}.`);
    }
  });

  return true;
}

module.exports = { areCssValid };

function makeCSsList(count) {
  return Array(count)
    .fill(undefined)
    .map((_, index) => ({
      id: index + 1,
      score: (index + 1) * 10,
    }));
}

test('Validate minimum CSs length', () => {
  const css = [];
  const fnRun = () => areCssValid(css);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('List of CSs must have between 1 and 999 items.');
});

test('Validate maximum CSs length', () => {
  const css = makeCSsList(1000);
  const fnRun = () => areCssValid(css);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('List of CSs must have between 1 and 999 items.');
});

test('Validate if there are too many CSs off', () => {
  const css = makeCSsList(10);
  const fnRun = () => areCssValid(css, 6);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('There are too many CSs off right now.');
});

test('Validate minimum CS ID', () => {
  const css = makeCSsList(10);
  css.push({ id: 0, score: 200 });
  const fnRun = () => areCssValid(css);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('CS index 10 must have an ID between 1 and 999.');
});

test('Validate maximum CS ID', () => {
  const css = makeCSsList(10);
  css.push({ id: 1000, score: 200 });
  const fnRun = () => areCssValid(css);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('CS index 10 must have an ID between 1 and 999.');
});

test('Validate minimum CS score', () => {
  const css = makeCSsList(10);
  css.push({ id: 100, score: 0 });
  const fnRun = () => areCssValid(css);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('CS index 10 must have a score between 1 and 9999.');
});

test('Validate maximum CS score', () => {
  const css = makeCSsList(10);
  css.push({ id: 100, score: 10000 });
  const fnRun = () => areCssValid(css);

  expect(fnRun).toThrow(ValidationError);
  expect(fnRun).toThrow('CS index 10 must have a score between 1 and 9999.');
});
