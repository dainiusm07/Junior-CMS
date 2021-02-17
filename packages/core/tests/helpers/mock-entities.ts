type OmitPrivates<T> = Omit<T, "">;

export const mockEntity = <T>(
  obj: OmitPrivates<T>,
  Entity: new (...args: any) => T
) => {
  return Object.assign(new Entity(), obj) as T;
};

export const mockEntities = <T>(
  objects: OmitPrivates<T>[],
  Entity: new (...args: any) => T
) => {
  return objects.map((obj) => mockEntity(obj, Entity));
};
