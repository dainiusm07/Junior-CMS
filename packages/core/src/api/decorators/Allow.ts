import { PERMISSIONS_METADATA_KEY } from "@config";
import { Permission } from "@generator";
import { SetMetadata } from "@nestjs/common";

export const Allow = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
