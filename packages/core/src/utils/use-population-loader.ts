import { EntityRepository } from '@mikro-orm/core';
import { PopulateChildren } from '@mikro-orm/core/typings';
import DataLoader from 'dataloader';

const key = Symbol('population_loaders');

export const usePopulationLoader = <T>(
  ctx: any,
  repo: EntityRepository<T>,
  loaderName: string,
  populate:
    | string
    | boolean
    | readonly string[]
    | keyof T
    | readonly (keyof T)[]
    | PopulateChildren<T>,
) => {
  // Returning existing loader
  if (ctx[key] && ctx[key][loaderName]) {
    return ctx[key][loaderName] as DataLoader<T, T, T>;
  }

  const batchFn = async (entities: T[]): Promise<T[]> => {
    return repo.populate(entities, populate);
  };

  if (!ctx[key]) ctx[key] = {};

  if (!ctx[key][loaderName]) {
    ctx[key][loaderName] = new DataLoader(batchFn as never);
  }

  return ctx[key][loaderName] as DataLoader<T, T, T>;
};
