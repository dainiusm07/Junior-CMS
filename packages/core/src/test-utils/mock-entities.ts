export const mockEntity = <T>(
  obj: Partial<T>,
  Entity: new (...args: any) => T,
) => {
  return Object.assign(new Entity(), obj) as T;
};

export const mockEntities = <T>(
  objects: Partial<T>[],
  Entity: new (...args: any) => T,
) => {
  return objects.map((obj) => mockEntity(obj, Entity));
};
