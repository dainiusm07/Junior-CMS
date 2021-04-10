import { Collection, EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import * as TranslateEntityHelper from './translate-entity';

jest.spyOn(TranslateEntityHelper, 'translateEntity').mockReturnValue(undefined);

import { mockEntity } from '../../../test-utils/mock-entities';
import { mockRepository } from '../../../test-utils/mock-repository';
import { BaseTranslation } from '../base-translation.entity';
import { BaseEntity } from '../base.entity';
import { ErrorResult } from '../../../common/errors/error-result.error';
import { TranslatableEntityHelper } from './translatable-entity.helper';
import { DEFAULT_LANGUAGE_CODE } from '../../../common/environment';
import { EntityHelper } from './entity.helper';

class MyEntity extends BaseEntity {
  translations: Collection<BaseTranslation>;
}

describe('TranslatableEntityHelper', () => {
  let helper: TranslatableEntityHelper<MyEntity>;
  let repo: EntityRepository<MyEntity>;
  let translationRepo: EntityRepository<BaseTranslation>;

  const mockedTranslateEntity = jest.spyOn(
    TranslateEntityHelper,
    'translateEntity',
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(MyEntity),
          useValue: mockRepository(MyEntity),
        },
        {
          provide: getRepositoryToken(BaseTranslation),
          useValue: mockRepository(BaseTranslation),
        },
      ],
    }).compile();

    repo = moduleRef.get(getRepositoryToken(MyEntity));
    translationRepo = moduleRef.get(getRepositoryToken(BaseTranslation));
    helper = new TranslatableEntityHelper(repo, translationRepo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('instance', () => {
    it('should be defined', () => {
      expect(helper).toBeDefined();
    });
  });

  describe('findOneOrFail', () => {
    let baseFindOneOrFail: jest.SpyInstance<Promise<MyEntity>>;

    beforeEach(() => {
      baseFindOneOrFail = jest.spyOn(EntityHelper.prototype, 'findOneOrFail');
    });

    afterEach(() => {
      baseFindOneOrFail.mockClear();
    });

    it(`should load translations when some kind of populate options provided`, async () => {
      await helper.findOneOrFail(1, { populate: { createdAt: true } });

      const { populate } = baseFindOneOrFail.mock.calls[0][1];

      expect(populate.translations).toBeDefined();
    });

    it(`should load translations when no options are provided`, async () => {
      await helper.findOneOrFail(1);

      const { populate } = baseFindOneOrFail.mock.calls[0][1];

      expect(populate.translations).toBeDefined();
    });

    it('should try to translate entity after receiving it from database', async () => {
      await helper.findOneOrFail(1);

      expect(mockedTranslateEntity).toBeCalled();
    });
  });

  describe('findList', () => {
    let baseFindList: jest.SpyInstance;

    beforeEach(() => {
      baseFindList = jest.spyOn(EntityHelper.prototype, 'findList');
    });

    it('should translate all entities', async () => {
      const entities = [{}, {}, {}];
      const translatedEntity = { name: 'Test' };
      const translatedEntities = [
        translatedEntity,
        translatedEntity,
        translatedEntity,
      ];

      baseFindList.mockReturnValue(Promise.resolve({ items: entities }));
      mockedTranslateEntity.mockReturnValue(translatedEntity);

      const { items } = await helper.findList({} as never);

      expect(mockedTranslateEntity).toBeCalledTimes(entities.length);
      expect(items).toStrictEqual(translatedEntities);
    });

    it('should match returned base class findList return', async () => {
      const findListReturn = { items: [], testProp: 'to-be-sure' };
      baseFindList.mockReturnValue(Promise.resolve(findListReturn));

      const result = await helper.findList({} as never);

      expect(result).toMatchObject(findListReturn);
    });
  });

  describe('insert', () => {
    let baseInsert: jest.SpyInstance;

    beforeEach(() => {
      baseInsert = jest.spyOn(EntityHelper.prototype, 'insert');
    });

    it('should move translation properties to translations array before actual insert', async () => {
      jest
        .spyOn(translationRepo, 'create')
        .mockImplementation((data) => ({ name: data.name } as never));

      const translation = { name: 'John' };
      const entityData = {
        ...translation,
        age: 20,
        height: 190,
        languageCode: DEFAULT_LANGUAGE_CODE,
      };

      await helper.insert(entityData);

      const { translations } = baseInsert.mock.calls[0][0];

      expect(translations).toStrictEqual([translation]);
    });

    it('after insert should return translated entity', async () => {
      const translatedEntityResult = {
        firstname: 'John',
        lastname: 'Nevermind',
      };
      mockedTranslateEntity.mockReturnValue(translatedEntityResult);

      const result = await helper.insert({
        languageCode: DEFAULT_LANGUAGE_CODE,
      });

      expect(mockedTranslateEntity).toBeCalled();
      expect(result).toBe(translatedEntityResult);
    });
  });

  describe('updateOne', () => {
    let baseUpdateOne: jest.SpyInstance;

    beforeEach(() => {
      baseUpdateOne = jest.spyOn(EntityHelper.prototype, 'updateOne');
    });

    it('should update entity translation', async () => {
      const translation = {
        name: 'Test name',
      };

      const entity = mockEntity(
        { id: 1, translations: new Collection({}, [translation]) as never },
        MyEntity,
      );
      jest
        .spyOn(helper, 'findOneOrFail')
        .mockResolvedValue(Promise.resolve(entity) as never);
      jest
        .spyOn(translationRepo, 'create')
        .mockImplementation((data) => ({ name: data.name } as never));
      const newTranslation = { name: 'New name' };

      await helper.updateOne(
        { translations: {} },
        { ...newTranslation, otherProp: 'any' },
      );

      const { translations } = baseUpdateOne.mock.calls[0][1];
      expect([...translations]).toStrictEqual([translation]);
    });
  });

  describe('addTranslation', () => {
    const translation = {
      description: 'This project will be awesome',
      languageCode: DEFAULT_LANGUAGE_CODE,
    };
    it('should add translation', async () => {
      await helper.addTranslation(translation);

      expect(translationRepo.create).toBeCalled();
      expect(translationRepo.create).toBeCalledWith(translation);
      expect(translationRepo.persistAndFlush).toBeCalled();
      expect(translationRepo.persistAndFlush).toHaveBeenCalledWith(
        expect.objectContaining(translation),
      );
    });

    it('should throw ErrorResult if translation already exists', async () => {
      jest.spyOn(translationRepo, 'count').mockReturnValue(Promise.resolve(1));

      try {
        await helper.addTranslation(translation);
      } catch (error) {
        expect(error).toBeInstanceOf(ErrorResult);
      }
    });
  });
});
