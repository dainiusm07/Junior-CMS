const CrudOperations = ["Create", "Read", "Update", "Delete"] as const;

export interface PermissionOptions {
  name: string;
  excludeCruds?: typeof CrudOperations[number][];
  customOperations?: string[];
  readMany?: boolean;
}

interface PermissionDefinition {
  group: number;
  name: string;
  description: string;
  internal: boolean;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

const generateOperations = (
  excludeCruds: typeof CrudOperations[number][],
  customOperations: string[]
) => {
  return customOperations.concat(
    CrudOperations.filter((crud) => !excludeCruds.includes(crud))
  );
};

const generatePermissionName = (operation: string, name: string) =>
  `${capitalize(operation)}${capitalize(name)}`;

const generateDescription = (operation: string, name: string) => {
  return `Grants permission to ${operation.toLowerCase()} ${capitalize(name)}`;
};

export const generatePermissions = (
  permissionsOptions: PermissionOptions[]
) => {
  let group = 0;

  const permissions: PermissionDefinition[] = [
    {
      group,
      name: "Owner",
      description: "Grants all permissions",
      internal: true,
    },
  ];

  permissionsOptions.forEach((permissionOption) => {
    const {
      name,
      excludeCruds = [],
      readMany = true,
      customOperations = [],
    } = permissionOption;

    const operations = generateOperations(excludeCruds, customOperations);

    group++;

    for (const operation of operations) {
      permissions.push({
        group,
        name: generatePermissionName(operation, name),
        description: generateDescription(operation, name),
        internal: false,
      });
    }

    if (readMany) {
      const customName = name + "s";
      permissions.push({
        group,
        name: generatePermissionName("Read", customName),
        description: generateDescription("Read", customName),
        internal: false,
      });
    }
  });

  return permissions;
};
