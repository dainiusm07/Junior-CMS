import { registerEnumType } from "@nestjs/graphql";

export enum Permission {
  CreateUser = "CreateUser",
  ReadUser = "ReadUser",
  UpdateUser = "UpdateUser",
  DeleteUser = "DeleteUser",
  CreateRole = "CreateRole",
  ReadRole = "ReadRole",
  UpdateRole = "UpdateRole",
  DeleteRole = "DeleteRole",
}

registerEnumType(Permission, { name: "Permission" });
