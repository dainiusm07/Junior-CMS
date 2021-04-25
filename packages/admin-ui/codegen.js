module.exports = {
  schema: 'http://localhost:4000/graphql',
  documents: ['./src/**/*.graphql.ts'],
  overwrite: true,
  generates: {
    './src/generated/gql-types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: false,
        withHooks: false,
        withHOC: false,
        withComponent: false,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: true,
        },
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
    },
  },
};
