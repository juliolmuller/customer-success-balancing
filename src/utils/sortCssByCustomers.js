
/**
 * Orders CS's descending by amount of customers it is responsible for.
 *
 * @param {Array<{ id: number, score: number, customers: any[] }>} css
 *
 * @return {Array<{ id: number, score: number, customers: any[] }>}
 */
function sortCssByCustomers(css) {
  return [...css].sort((cs1, cs2) => {
    return cs2.customers.length - cs1.customers.length;
  });
}

module.exports = sortCssByCustomers;

test('Orders array correctly', () => {
  const css = [
    { id: 4, score: 10, customers: Array(2) },
    { id: 2, score: 30, customers: Array(1) },
    { id: 1, score: 50, customers: Array(4) },
    { id: 3, score: 80, customers: Array(3) },
  ];
  const newCss = sortCssByCustomers(css);

  expect(newCss).toEqual([
    { id: 1, score: 50, customers: Array(4) },
    { id: 3, score: 80, customers: Array(3) },
    { id: 4, score: 10, customers: Array(2) },
    { id: 2, score: 30, customers: Array(1) },
  ]);
});
