const sortCssByCustomers = require('./sortCssByCustomers');
const sortByScore = require('./sortByScore');

/**
 * Returns a list of CS's that are responsible for 1 or more customers.
 *
 * @param {Array<{ id: number, score: number }>} css
 * @param {Array<{ id: number, score: number }>} sortedCustomers
 *
 * @return {Array<{ id: number, score: number, customers: any[] }>} List of CS's
 *                  with an additional property listing all customers under
 *                  one's responsibility
 */
function distributeCustomers(css, customers) {
  const sortedCss = sortByScore(css);
  const sortedCustomers = sortByScore(customers);

  sortedCss.forEach((cs) => {
    let customersSliceIndex = -1;
    let i = 0;

    while (i <= sortedCustomers.length) {
      const customer = sortedCustomers[i];

      if (i === sortedCustomers.length || customer.score <= cs.score) {
        customersSliceIndex = i;
        i += 1;
      } else {
        break;
      }
    }

    cs.customers = customersSliceIndex > 0
      ? sortedCustomers.splice(0, customersSliceIndex + 1)
      : [];
  });

  return sortCssByCustomers(sortedCss);
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
        { id: 3, score: 20 },
        { id: 4, score: 30 },
        { id: 1, score: 35 },
        { id: 4, score: 40 },
      ],
    },
    {
      id: 1,
      score: 100,
      customers: [
        { id: 4, score: 60 },
        { id: 2, score: 80 },
      ],
    },
  ]);
});
