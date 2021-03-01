import "reflect-metadata";
import { number } from "yup";
import { InputValidationError } from "../common/errors/input-validation.error";
import { Validate } from "./validate.decorator";

let Test = class {
  async method(first: number, second: number) {
    return first + second;
  }
};

const recreateTestClass = (validations?: object) => {
  if (validations === undefined) {
    validations = {
      first: () => number().moreThan(0),
      second: () => number().moreThan(0),
    };
  }

  class TestClass {
    @Validate(validations || undefined)
    // @ts-ignore
    async method(first: number, second: number) {
      return first + second;
    }
  }
  Test = TestClass;
};

describe("@Validate", () => {
  beforeEach(() => {
    jest
      .spyOn(Reflect, "getOwnMetadata")
      .mockReturnValue({ first: 0, second: 1 });

    recreateTestClass();
  });

  it("should return validation error", async () => {
    const result = await new Test().method(-1, 2);

    expect(result).toBeInstanceOf(InputValidationError);
  });

  it("should return actual result", async () => {
    const result = await new Test().method(1, 2);

    expect(result).toBe(3);
  });

  it("should return validation error", async () => {
    recreateTestClass({ first: () => number().negative() });

    const result = await new Test().method(1, -11);

    expect(result).toBeInstanceOf(InputValidationError);
  });

  it("should return actual result", async () => {
    recreateTestClass({ first: () => number().negative() });

    const result = await new Test().method(-1, 1);

    expect(result).toBe(0);
  });

  it("should not validate and return result", async () => {
    jest.spyOn(Reflect, "getOwnMetadata").mockReturnValue(undefined);
    recreateTestClass(null);

    const result = await new Test().method(-111, 111);

    expect(result).toBe(0);
  });

  it("should return actual results", async () => {
    recreateTestClass({});

    const result1 = await new Test().method(-1, 1);
    const result2 = await new Test().method(-1, -1);
    const result3 = await new Test().method(1, -1);
    const result4 = await new Test().method(0, -1);

    expect(result1).toBe(0);
    expect(result2).toBe(-2);
    expect(result3).toBe(0);
    expect(result4).toBe(-1);
  });
});
