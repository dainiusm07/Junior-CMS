import { Args } from "@nestjs/graphql";
import { VALIDATE_ARGS_METADATA_KEY } from "../common/constants";

export function ValidatedArg(property: string) {
  return (target: Object, methodName: string, index: number) => {
    Args(property)(target, methodName, index);

    const args =
      Reflect.getOwnMetadata(VALIDATE_ARGS_METADATA_KEY, target, methodName) ||
      {};

    args[property] = index;

    Reflect.defineMetadata(
      VALIDATE_ARGS_METADATA_KEY,
      args,
      target,
      methodName
    );
  };
}
