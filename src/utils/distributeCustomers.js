const sortCssByCustomers = require('./sortCssByCustomers');
const sortCssByScore = require('./sortCssByScore');

/**
 * Distributes customers to CS's according to each score.
 *
 * @param {Array<{ id: number, score: number }>} css
 * @param {Array<{ id: number, score: number }>} customers
 *
 * @return {Array<{ id: number, score: number, customers: any[] }>} List of CS's
 *                  with an additional property listing all customers under
 *                  one's responsibility
 */
function distributeCustomers(css, customers) {
  const sortedCss = sortCssByScore(css);
  const cssMapById = new Map();

  css.forEach(({ id, score }) => {
    cssMapById.set(id, {
      id,
      score,
      customers: [],
    });
  });

  customers.forEach((customer) => {
    const csId = sortedCss.find((cs) => cs.score >= customer.score)?.id;
    const csRef = cssMapById.get(csId);

    csRef && csRef.customers.push(customer);
  });

  return sortCssByCustomers([...cssMapById.values()]);
}

module.exports = distributeCustomers;

test('Outputs structure correctly', () => {
  const css = [
    { id: 1, score: 100 },
    { id: 2, score: 50 },
  ];
  const customers = [
    { id: 1, score: 35 },
    { id: 2, score: 80 },
    { id: 3, score: 20 },
    { id: 4, score: 30 },
    { id: 4, score: 60 },
    { id: 4, score: 40 },
  ];
  const output = distributeCustomers(css, customers);

  expect(output).toEqual([
    {
      id: 2,
      score: 50,
      customers: [
        { id: 1, score: 35 },
        { id: 3, score: 20 },
        { id: 4, score: 30 },
        { id: 4, score: 40 },
      ],
    },
    {
      id: 1,
      score: 100,
      customers: [
        { id: 2, score: 80 },
        { id: 4, score: 60 },
      ],
    },
  ]);
});
