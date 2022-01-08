import {Queryable} from 'src/core/router';

import {DemoSort} from './DemoSorter';

export const queryableIstanceDemoSort = <T extends string>(
  prefix: string
): Queryable<null | DemoSort<T>> => ({
  toQuery: sort => ({
    [`${prefix}SortBy`]: (sort && [`${sort.field};${sort.desc ? 'desc' : 'asc'}`]) || [],
  }),
  fromQuery: query => {
    const raw_value = query[`${prefix}SortBy`][0];
    if (!raw_value) return null;
    const [field, order] = raw_value.split(';');
    return {field: field as T, desc: order === 'desc'};
  },
});
