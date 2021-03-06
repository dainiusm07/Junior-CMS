import { registerEnumType } from "@nestjs/graphql";

export enum Permission {
  Owner = "Owner",
  CreateUser = "CreateUser",
  ReadUser = "ReadUser",
  ReadUsers = "ReadUsers",
  UpdateUser = "UpdateUser",
  DeleteUser = "DeleteUser",
  CreateRole = "CreateRole",
  ReadRole = "ReadRole",
  ReadRoles = "ReadRoles",
  UpdateRole = "UpdateRole",
  DeleteRole = "DeleteRole",
}

registerEnumType(Permission, { name: "Permission" });
