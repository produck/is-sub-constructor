import { ThrowTypeError } from '@produck/type-error';

import { isClassLike, isConstructor } from '@produck/is-constructor';

const { isPrototypeOf } = Object.prototype;

function isSub(checker) {
  return (value, base) => {
    if (!checker(base)) {
      ThrowTypeError('args[1] as base', 'constructor');
    }

    if (!checker(value)) {
      return false;
    }

    return isPrototypeOf.call(base.prototype, value.prototype);
  };
}

export const isSubClass = isSub(isClassLike);
export const isSubConstructor = isSub(isConstructor);
