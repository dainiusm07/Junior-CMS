import { SetMetadata } from "@nestjs/common";

import { PERMISSIONS_METADATA_KEY } from "../common/constants";
import { Permission } from "../common/permission.enum";

export const Allow = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
