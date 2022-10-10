const sortCssByCustomers = require('./sortCssByCustomers');
const sortCssByScore = require('./sortCssByScore');

/**
 * Returns a list of CS's that are responsible for 1 or more customers.
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
  const cssMapById = {};

  customers.forEach((customer) => {
    const cs = sortedCss.find((cs) => cs.score >= customer.score);

    if (!cs) {
      return;
    }

    const csRef = cssMapById[cs.id];

    if (csRef) {
      csRef.customers.push(customer)
    } else {
      cssMapById[cs.id] = { ...cs, customers: [customer] };
    }
  });

  return sortCssByCustomers(Object.values(cssMapById));
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
