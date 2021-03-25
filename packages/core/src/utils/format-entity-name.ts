import { Constructor } from '@mikro-orm/core';

export const formatEntityName = (
  entityOrName: string | Constructor<unknown>,
) => {
  const entityName =
    typeof entityOrName === 'string' ? entityOrName : entityOrName.name;

  const entityNameFormatted = entityName
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();

  return entityNameFormatted;
};
