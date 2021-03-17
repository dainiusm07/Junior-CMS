export const deleteUndefinedProperties = <T extends {}>(obj: T) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined) {
      delete obj[key as keyof T];
    }
  });
};
