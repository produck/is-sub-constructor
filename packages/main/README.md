# @produck/is-sub-constructor

Check if a constructor is a sub-constructor (derived class) of another.

## Installation

```bash
npm install @produck/is-sub-constructor \
  @produck/is-constructor @produck/type-error
```

## Usage

```js
import { isSubClass, isSubConstructor } from '@produck/is-sub-constructor';

class Animal {}
class Dog extends Animal {}
class Bulldog extends Dog {}

isSubClass(Dog, Animal); // true
isSubClass(Bulldog, Animal); // true
isSubClass(Animal, Animal); // false
isSubClass(Animal, Dog); // false
isSubClass(123, Animal); // false
isSubClass(Array, Object); // true

isSubConstructor(Dog, Animal); // true
isSubConstructor(Bulldog, Animal); // true
isSubConstructor(Animal, Animal); // false
isSubConstructor(Array, Object); // true
```

## API

Both functions share the same signature:

- **value** `unknown` - The value to check.
- **base** `constructor` - The base constructor to check against.
- **Returns** `boolean`
- **Throws** `TypeError` - If `base` fails the corresponding checker.

### `isSubClass(value, base)`

Returns `true` if `value` is a sub-class of `base`. Uses `isClassLike` from
`@produck/is-constructor`, which accepts any function a class can extend.

### `isSubConstructor(value, base)`

Returns `true` if `value` is a sub-constructor of `base`. Uses the stricter
`isConstructor` from `@produck/is-constructor`, which also requires a valid
object `prototype`.

## License

MIT
