import { Collection, EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import * as TranslateEntityHelper from '../helpers/translate-entity';

jest.spyOn(TranslateEntityHelper, 'translateEntity').mockReturnValue(undefined);

import { LanguageCode } from '../../../config/i18n/LanguageCode';
import { mockEntity } from '../../../test-utils/mock-entities';
import { mockRepository } from '../../../test-utils/mock-repository';
import { BaseTranslation } from '../base-translation';
import { BaseEntity } from '../base.entity';
import { BaseService } from '../base.service';
import { translationsMixin } from './translations.mixin';
import { ResultError } from '../../../common/errors/result.error';

class MyEntity extends BaseEntity {
  translations: Collection<BaseTranslation>;
}

class MockedBaseService extends BaseService<MyEntity> {
  _repo = mockRepository(MyEntity) as any;
}

class ServiceWithTranslations extends translationsMixin<MyEntity>(
  MockedBaseService as never,
) {
  constructor(
    protected _repo: EntityRepository<MyEntity>,
    protected _translationRepo: EntityRepository<BaseTranslation>,
  ) {
    super();
  }
}

describe('translationsMixin', () => {
  let service: ServiceWithTranslations;
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
    service = new ServiceWithTranslations(repo, translationRepo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('instance', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('findOneOrFail', () => {
    let baseFindOneOrFail: jest.SpyInstance<Promise<MyEntity>>;

    beforeEach(() => {
      baseFindOneOrFail = jest.spyOn(
        MockedBaseService.prototype,
        'findOneOrFail',
      );
    });

    it(`should load translations when some kind of populate options provided`, async () => {
      await service.findOneOrFail(1, { populate: { createdAt: true } });

      const { populate } = baseFindOneOrFail.mock.calls[0][1];

      expect(populate.translations).toBeDefined();
    });

    it(`should load translations when no options are provided`, async () => {
      await service.findOneOrFail(1);

      const { populate } = baseFindOneOrFail.mock.calls[0][1];

      expect(populate.translations).toBeDefined();
    });

    it('should try to translate entity after receiving it from database', async () => {
      await service.findOneOrFail(1);

      expect(mockedTranslateEntity).toBeCalled();
    });
  });

  describe('findList', () => {
    let baseFindList: jest.SpyInstance;

    beforeEach(() => {
      baseFindList = jest.spyOn(MockedBaseService.prototype, 'findList');
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

      const { items } = await service.findList({} as never);

      expect(mockedTranslateEntity).toBeCalledTimes(entities.length);
      expect(items).toStrictEqual(translatedEntities);
    });

    it('should match returned base class findList return', async () => {
      const findListReturn = { items: [], testProp: 'to-be-sure' };
      baseFindList.mockReturnValue(Promise.resolve(findListReturn));

      const result = await service.findList({} as never);

      expect(result).toMatchObject(findListReturn);
    });
  });

  describe('insert', () => {
    let baseInsert: jest.SpyInstance;

    beforeEach(() => {
      baseInsert = jest.spyOn(MockedBaseService.prototype, 'insert');
    });

    it('should move translation properties to translations array before actual insert', async () => {
      jest
        .spyOn(translationRepo, 'create')
        .mockImplementation((data) => ({ name: data.name } as never));

      const translation = { name: 'John' };
      const entityData = { ...translation, age: 20, height: 190 };

      await service.insert(entityData);

      const { translations } = baseInsert.mock.calls[0][0];

      expect(translations).toStrictEqual([translation]);
    });

    it('after insert should return translated entity', async () => {
      const translatedEntityResult = {
        firstname: 'John',
        lastname: 'Nevermind',
      };
      mockedTranslateEntity.mockReturnValue(translatedEntityResult);

      const result = await service.insert({});

      expect(mockedTranslateEntity).toBeCalled();
      expect(result).toBe(translatedEntityResult);
    });
  });

  describe('updateOne', () => {
    let baseUpdateOne: jest.SpyInstance;

    beforeEach(() => {
      baseUpdateOne = jest.spyOn(MockedBaseService.prototype, 'updateOne');
    });

    it('should call findOneOrFail with condition translation = provided languageCode', async () => {
      const languageCode = LanguageCode.EN;
      const baseFindOneOrFail = jest.spyOn(
        MockedBaseService.prototype,
        'findOneOrFail',
      );

      await service.updateOne({}, {}, languageCode);

      const { translations } = baseFindOneOrFail.mock.calls[0][0] as any;

      expect(translations.languageCode).toBe(languageCode);
    });

    [1, '1', {}].forEach((value) => {
      it(`should transform filter to object and add translation condition if filter input type is ${typeof value}`, async () => {
        const baseFindOneOrFail = jest.spyOn(
          MockedBaseService.prototype,
          'findOneOrFail',
        );

        await service.updateOne(value, {});

        const { translations } = baseFindOneOrFail.mock.calls[0][0] as any;

        expect(translations).toBeDefined();
        expect(typeof translations).toBe('object');
      });
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
        .spyOn(service, 'findOneOrFail')
        .mockResolvedValue(Promise.resolve(entity) as never);
      jest
        .spyOn(translationRepo, 'create')
        .mockImplementation((data) => ({ name: data.name } as never));
      const newTranslation = { name: 'New name' };

      await service.updateOne({}, { ...newTranslation, otherProp: 'any' });

      const { translations } = baseUpdateOne.mock.calls[0][1];
      expect([...translations]).toStrictEqual([translation]);
    });
  });

  describe('addTranslation', () => {
    const translation = { description: 'This project will be awesome' };
    it('should add translation', async () => {
      await service.addTranslation(translation);

      expect(translationRepo.create).toBeCalled();
      expect(translationRepo.create).toBeCalledWith(translation);
      expect(translationRepo.persistAndFlush).toBeCalled();
      expect(translationRepo.persistAndFlush).toHaveBeenCalledWith(
        expect.objectContaining(translation),
      );
    });

    it('should return ResultError if translation already exists', async () => {
      jest.spyOn(translationRepo, 'count').mockReturnValue(Promise.resolve(1));

      const result = await service.addTranslation(translation);

      expect(result).toBeInstanceOf(ResultError);
    });
  });
});
