
/**
 * Removes CS's from list based on provided ID's
 *
 * @param {Array<{ id: number, score: number }>} css
 * @param {number[]} ids
 *
 * @return {Array<{ id: number, score: number }>}
 */
function removeCssAway(css, ids) {
  return css.filter((cs) => {
    return !ids.includes(cs.id);
  });
}

module.exports = removeCssAway;

function makeCSsList(count) {
  return Array(count)
    .fill(undefined)
    .map((_, index) => ({
      id: index + 1,
      score: (index + 1) * 10,
    }));
}

test('Remove nothing if there is no match', () => {
  const css = makeCSsList(10);
  const ids = [15, 20, 24, 28];
  const newCss = removeCssAway(css, ids);

  expect(newCss).toEqual(css);
});

test('Remove 1 if there is 1 match', () => {
  const css = makeCSsList(3);
  const ids = [2];
  const newCss = removeCssAway(css, ids);

  expect(newCss).toEqual([
    { id: 1, score: 10 },
    { id: 3, score: 30 },
  ]);
});

test('Remove 2 if there is 2 match', () => {
  const css = makeCSsList(3);
  const ids = [1, 3];
  const newCss = removeCssAway(css, ids);

  expect(newCss).toEqual([
    { id: 2, score: 20 },
  ]);
});
