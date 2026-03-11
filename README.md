# @produck/is-sub-constructor

A monorepo for checking if a constructor is a sub-constructor (derived class) of another.

## Structure

This is a monorepo managed with Lerna in independent mode.

- `packages/main` - Main package `@produck/is-sub-constructor`

## Development

### Install dependencies

```bash
npm run deps:install
```

### Linting

```bash
npm run lint
```

### Testing

```bash
npm run test
```

### Coverage

```bash
npm run coverage
```

## ESLint Configuration

This project uses:
- ESLint 9+ with flat config
- @produck/eslint-rules for consistent code style
- TypeScript ESLint for TypeScript support
- **No globals** - All globals are explicitly disabled for strict code quality

## Code Coverage

This project uses c8 for code coverage reporting.

## License

MIT