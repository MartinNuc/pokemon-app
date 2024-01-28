
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: "http://localhost:4000/graphql",
  documents: "app/**/*.{ts,tsx}",
  generates: {
    "./app/__generated__/": {
      preset: "client",
    }
  }
};

export default config;
