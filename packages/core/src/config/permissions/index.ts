import { PermissionOptions, generatePermissions } from "./generate-permissions";

const permissionsOptions: PermissionOptions[] = [
  {
    name: "User",
  },
  {
    name: "Role",
    customOperations: ["Assign"],
  },
];

export const permissions = generatePermissions(permissionsOptions);

export const permissionsTypeDef = `enum Permission { ${permissions
  .map((perm) => perm.name)
  .join(" ")} }`;
