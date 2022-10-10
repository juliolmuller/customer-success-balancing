
/**
 * Orders CS's ascending by their score.
 *
 * @param {Array<{ id: number, score: number }>} css
 *
 * @return {Array<{ id: number, score: number }>}
 */
function sortCssByScore(css) {
  return [...css].sort((cs1, cs2) => {
    return cs1.score - cs2.score;
  });
}

module.exports = sortCssByScore;

test('Orders array correctly', () => {
  const css = [
    { id: 1, score: 50 },
    { id: 2, score: 30 },
    { id: 3, score: 80 },
    { id: 4, score: 10 },
  ];
  const newCss = sortCssByScore(css);

  expect(newCss).toEqual([
    { id: 4, score: 10 },
    { id: 2, score: 30 },
    { id: 1, score: 50 },
    { id: 3, score: 80 },
  ]);
});
