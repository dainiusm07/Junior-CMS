import { Operators } from '../operators.enum';

const ReversedOperators: Record<string, string> = {};

Object.entries(Operators).forEach(([name, value]) => {
  ReversedOperators[value] = name;
});

export const parseFilterInput = (input: any) => {
  if (
    typeof input === 'number' ||
    typeof input === 'string' ||
    input === null
  ) {
    return input;
  }

  const result: Record<string, unknown> = {};

  Object.entries(input).forEach(([name, value]) => {
    let actualValue;

    // Can't filter for { entity: null }
    if (!ReversedOperators[name] && !value) {
      return;
    }

    if (Array.isArray(value)) {
      actualValue = value.map((val) => parseFilterInput(val));
    } else {
      actualValue =
        typeof value === 'object' && value !== null
          ? parseFilterInput(value)
          : value;
    }

    // Skip value because it is empty
    if (
      actualValue !== null &&
      typeof actualValue === 'object' &&
      !Object.keys(actualValue).length
    ) {
      return;
    }

    if (ReversedOperators[name]) {
      result[ReversedOperators[name]] = actualValue;
    } else {
      result[name] = actualValue;
    }
  });

  return result;
};
