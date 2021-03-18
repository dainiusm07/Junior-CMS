import { ObjectType } from "@nestjs/graphql";
import { getFieldsAndDecoratorForType } from "@nestjs/graphql/dist/schema-builder/utils/get-fields-and-decorator.util";

import {
  generateListResponse,
  PaginationResult,
} from "./generate-list-response";

class Test {}
ObjectType()(Test);

class TestResponse extends generateListResponse(Test) {}
ObjectType()(TestResponse);
const { fields: TestResponseFields } = getFieldsAndDecoratorForType(
  TestResponse
);

describe("GenerateListResponse", () => {
  it("should generate list response with provided class", () => {
    const itemsProp = TestResponseFields.find(({ name }) => name === "items")!;

    expect(itemsProp.typeFn()).toBe(Test);
  });

  it(`should generate list response with pagination field that is typeof ${PaginationResult.name}`, () => {
    const itemsProp = TestResponseFields.find(
      ({ name }) => name === "pagination"
    )!;

    expect(itemsProp.typeFn()).toBe(PaginationResult);
  });
});
