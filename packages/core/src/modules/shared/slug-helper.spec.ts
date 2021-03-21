import { SlugHelper } from './slug-helper';

class SimpleRepo {
  findOne = jest.fn();
  find = jest.fn();
}

const getBaseEntity = (slug: string) => ({
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  slug,
});

const helper = new SlugHelper();
const repo = new SimpleRepo();

describe('Slug-helper-mixin', () => {
  describe('checkSlugAvailability', () => {
    [
      {
        description:
          'should return true when there is no entity with that slug',
        returnValue: null,
        expectedResult: true,
      },
      {
        description: 'should return false when there is entity with that slug',
        returnValue: getBaseEntity(''),
        expectedResult: false,
      },
    ].forEach(({ description, returnValue, expectedResult }) => {
      it(description, async () => {
        jest
          .spyOn(repo, 'findOne')
          .mockReturnValue(Promise.resolve(returnValue));

        const result = await helper.checkSlugAvailability(repo as never, '');

        expect(result).toBe(expectedResult);
      });
    });
  });
  describe('getAvailableSlug', () => {
    [
      {
        description:
          'should return original string when where is no entities with that slug',
        slug: 'other',
        steps: 0,
        expectedResult: 'other',
      },
      {
        description:
          'should return original string with counter when where is at least one entity with that slug',
        slug: 'test',
        steps: 1,
        expectedResult: 'test-1',
      },
      {
        description:
          'should return slug with unique counter when where is entities with that slug',
        slug: 'test',
        steps: 12,
        expectedResult: 'test-12',
      },
    ].forEach(({ description, slug, steps, expectedResult }) => {
      it(description, async () => {
        const returnValue = [];
        for (let i = 0; i < steps; i++) {
          if (i == 0) {
            returnValue.push(getBaseEntity(slug));
          } else {
            returnValue.push(getBaseEntity(`${slug}-${i}`));
          }
        }
        jest.spyOn(repo, 'find').mockReturnValue(Promise.resolve(returnValue));

        const resultSlug = await helper.getAvailableSlug(repo as never, slug);

        expect(resultSlug).toBe(expectedResult);
      });
    });
  });
});
