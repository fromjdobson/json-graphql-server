import applyFilters from './applyFilters';

const A = {
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123,
    views: 254,
    tags: ['foo', 'bar'],
};
const B = {
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo'],
};
const C = {
    id: 3,
    title: 'Sic Dolor amet',
    user_id: 123,
    views: 76,
    tags: [],
};
const data = [A, B, C];

test('returns empty array on empty datastore', () =>
    expect(applyFilters(undefined, {})).toEqual([]));

test('empty query returns all entities', () =>
    expect(applyFilters(data, {})).toEqual(data));

test('filters by string on all text fields using the q filter', () =>
    expect(applyFilters(data, { q: 'Lorem' })).toEqual([A]));

test('filters by string using the q filter in a case-insensitive way', () =>
    expect(applyFilters(data, { q: 'lorem' })).toEqual([A]));

test('filters by value on each field using the related filter', () => {
    expect(applyFilters(data, { id: 2 })).toEqual([B]);
    expect(applyFilters(data, { title: 'Sic Dolor amet' })).toEqual([
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76, tags: [] },
    ]);
    expect(applyFilters(data, { views: 65 })).toEqual([B]);
    expect(applyFilters(data, { user_id: 456 })).toEqual([B]);
});

test('filters by not equals given fields', () => {
    expect(applyFilters(data, { id_neq: 2 })).toEqual([A, C]);
});

test('filters by value range on each integer field using the related filters', () => {
    expect(applyFilters(data, { views_lt: 76 })).toEqual([B]);
    expect(applyFilters(data, { views_lte: 76 })).toEqual([B, C]);
    expect(applyFilters(data, { views_gt: 76 })).toEqual([A]);
    expect(applyFilters(data, { views_gte: 76 })).toEqual([A, C]);
});

test('should filter by id if filter contains an ids key', () => {
    expect(applyFilters(data, { ids: [2, 3] })).toEqual([B, C]);
});

test('should filter by value if filter contains an array for the key', () => {
    expect(
        applyFilters(data, { title: ['Ut enim ad minim', 'Sic Dolor amet'] })
    ).toEqual([B, C]);

    expect(applyFilters(data, { tags: ['foo'] })).toEqual([A, B]);
});
