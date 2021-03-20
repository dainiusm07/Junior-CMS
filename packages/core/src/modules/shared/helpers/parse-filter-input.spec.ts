import { Operators } from '../operators.enum';
import { parseFilterInput } from './parse-filter-input';

describe("parseFilterInput", () => {
  it("should remove non-operator property if it has null value", () => {
    const filter = { id: null };

    const result = parseFilterInput(filter);

    expect(result).toStrictEqual({});
  });

  it("should remove non-operator property if it is empty object", () => {
    const filter = { id: {} };

    const result = parseFilterInput(filter);

    expect(result).toStrictEqual({});
  });

  it(`should convert input value to database ready filter`, () => {
    const filter = {
      number: { [Operators.$eq]: 2 },
      string: { [Operators.$ilike]: "string" },
      boolean: { [Operators.$ne]: false },
      null: { [Operators.$or]: null },
    };

    const result = parseFilterInput(filter);

    expect(result).toStrictEqual({
      number: { $eq: 2 },
      string: { $ilike: "string" },
      boolean: { $ne: false },
      null: { $or: null },
    });
  });

  it(`should remove if non-operator property has null value, but leave
      legit other legit values`, () => {
    const filter = { id: null, test: { [Operators.$eq]: 2 } };

    const result = parseFilterInput(filter);

    expect(result).toStrictEqual({ test: { $eq: 2 } });
  });

  it(`should if operators value is array should iterate over it and transform it`, () => {
    const filter = {
      id: null,
      [Operators.$or]: [
        {
          id: {
            [Operators.$in]: [1, 2, 3],
          },
        },
        {
          name: { [Operators.$ilike]: "test%" },
        },
      ],
    };

    const result = parseFilterInput(filter);

    expect(result).toStrictEqual({
      $or: [
        {
          id: {
            $in: [1, 2, 3],
          },
        },
        {
          name: {
            $ilike: "test%",
          },
        },
      ],
    });
  });
});
