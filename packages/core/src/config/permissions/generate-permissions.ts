import { PermissionDefinition } from "@junior-cms/common";

const CrudOperations = ["Create", "Read", "Update", "Delete"] as const;

export interface PermissionOptions {
  name: string;
  excludeCruds?: typeof CrudOperations[number][];
  customOperations?: string[];
  readMany?: boolean;
}

export interface IPermissionDefinition extends PermissionDefinition {
  assignable: Boolean;
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

export const generatePermissions = (
  permissionsOptions: PermissionOptions[]
) => {
  let group = 0;

  const permissions: IPermissionDefinition[] = [
    {
      group,
      name: "Owner",
      assignable: false,
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
        assignable: true,
      });
    }

    if (readMany) {
      const customName = name + "s";
      permissions.push({
        group,
        name: generatePermissionName("Read", customName),
        assignable: true,
      });
    }
  });

  return permissions;
};
