# @produck/is-sub-constructor

Check if a constructor is a sub-constructor (derived class) of another.

## Installation

```bash
npm install @produck/is-sub-constructor
```

## Usage

```js
import { isSubConstructor } from "@produck/is-sub-constructor";

class Animal {}
class Dog extends Animal {}
class Bulldog extends Dog {}

isSubConstructor(Dog, Animal); // true
isSubConstructor(Bulldog, Animal); // true
isSubConstructor(Animal, Animal); // false
isSubConstructor(Animal, Dog); // false
isSubConstructor(123, Animal); // false
isSubConstructor(Array, Object); // true
```

## API

### `isSubConstructor(value, base)`

Returns `true` if `value` is a sub-constructor (derived class) of `base`,
`false` otherwise.

- **value** `unknown` - The value to check.
- **base** `constructor` - The base constructor to check against.
- **Returns** `boolean`
- **Throws** `TypeError` - If `base` is not a constructor.

## License

MIT
