import { plainToClass } from 'class-transformer';
import { getFieldsAndDecoratorForType } from '@nestjs/graphql/dist/schema-builder/utils/get-fields-and-decorator.util';

import { generateListOptions } from './generate-list-options';
import { Constructor } from '@mikro-orm/core';

class FilterOptions {}
class SortOptions {}

const getClassField = <T>(cls: Constructor<T>, fieldName: keyof T) => {
  return getFieldsAndDecoratorForType(cls).fields.find(
    ({ name }) => name === fieldName,
  );
};

describe.only('GenerateListOptions', () => {
  it('should convert object that contains provided classes instances', () => {
    const listOptions = generateListOptions(FilterOptions, SortOptions);
    const { filter, sort } = plainToClass(listOptions, {
      filter: {},
      sort: {},
    });

    expect(filter).toBeInstanceOf(FilterOptions);
    expect(sort).toBeInstanceOf(SortOptions);
  });

  [
    {
      field: 'filter',
      cls: FilterOptions,
    },
    {
      field: 'sort',
      cls: SortOptions,
    },
  ].forEach(({ field, cls }) => {
    it(`should assign provided class on ListOptions ${field} property`, () => {
      const listOptions = generateListOptions(FilterOptions, SortOptions);
      const classField = getClassField(listOptions, field as never);

      expect(classField).toBeDefined();
      expect(classField?.typeFn()).toBe(cls);
    });
  });
});
