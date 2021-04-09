import { EntityRepository } from '@mikro-orm/core';
import { PopulateChildren } from '@mikro-orm/core/typings';
import DataLoader from 'dataloader';

import { CmsContext } from '../types/CmsContext';

export const usePopulationLoader = <T>(
  ctx: CmsContext,
  repo: EntityRepository<T>,
  loaderName: string,
  populate:
    | string
    | boolean
    | readonly string[]
    | keyof T
    | readonly (keyof T)[]
    | PopulateChildren<T>,
): DataLoader<T, T> => {
  const populationLoaders = ctx['populationLoaders'];

  // Returning existing loader
  if (populationLoaders[loaderName]) {
    return <DataLoader<T, T>>populationLoaders[loaderName];
  }

  const batchFn = async (entities: T[]): Promise<T[]> => {
    return repo.populate(entities, populate);
  };

  populationLoaders[loaderName] = new DataLoader(batchFn as never);

  return <DataLoader<T, T>>populationLoaders[loaderName];
};
