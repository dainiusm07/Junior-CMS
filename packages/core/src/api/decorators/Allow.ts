import { Permission } from "@junior-cms/common";
import { SetMetadata } from "@nestjs/common";

import { PERMISSIONS_METADATA_KEY } from "../../config";

export const Allow = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
