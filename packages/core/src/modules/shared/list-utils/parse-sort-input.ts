import { SortOrder } from '../list-utils';

export const parseSortInput = (
  sort: Record<string, SortOrder | null | undefined>,
) => {
  const orderBy: Record<string, SortOrder> = {};

  Object.entries(sort)
    .reverse()
    .forEach(([field, value]) => {
      if (value) {
        orderBy[field] = value;
      }
    });

  // Default sorting
  if (orderBy.id === undefined) {
    orderBy.id = SortOrder.ASC;
  }

  return orderBy;
};
