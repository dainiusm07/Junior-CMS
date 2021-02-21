export const mockRepository = (Entity: new (...args: any[]) => any) => ({
  getReference: jest.fn(),
  persist: jest.fn(),
  persistAndFlush: jest.fn(),
  persistLater: jest.fn(),
  createQueryBuilder: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  find: jest.fn(),
  findAndCount: jest.fn(),
  remove: jest.fn(),
  removeAndFlush: jest.fn(),
  removeLater: jest.fn(),
  flush: jest.fn(),
  canPopulate: jest.fn(),
  populate: jest.fn(),
  count: jest.fn(),
  create: jest
    .fn()
    .mockImplementation((obj: unknown) => Object.assign(new Entity(), obj)),
  assign: jest
    .fn()
    .mockImplementation((entity: unknown, obj: unknown) =>
      Object.assign(entity, obj)
    ),
  nativeInsert: jest.fn(),
  nativeUpdate: jest.fn(),
  nativeDelete: jest.fn(),
  aggregate: jest.fn(),
});
