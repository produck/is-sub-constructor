import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isSubClass, isSubConstructor } from '../src/index.mjs';

const baseError = {
  name: 'TypeError',
  message: 'Invalid "args[1] as base", one "constructor" expected.',
};

const implementations = [
  ['isSubClass', isSubClass],
  ['isSubConstructor', isSubConstructor],
];

class Base {}
class Child extends Base {}
class GrandChild extends Child {}

for (const [name, isSub] of implementations) {
  describe(`${name}()`, () => {
    describe('should return true', () => {
      it('when value is a direct sub-constructor of base', () => {
        assert.equal(isSub(Child, Base), true);
      });

      it('when value is an indirect sub-constructor of base', () => {
        assert.equal(isSub(GrandChild, Base), true);
      });

      it('when checking built-in inheritance', () => {
        assert.equal(isSub(Array, Object), true);
        assert.equal(isSub(Map, Object), true);
        assert.equal(isSub(TypeError, Error), true);
      });
    });

    describe('should return false', () => {
      it('when value and base are the same constructor', () => {
        assert.equal(isSub(Base, Base), false);
      });

      it('when value is the base of the other', () => {
        assert.equal(isSub(Base, Child), false);
      });

      it('when value and base are unrelated constructors', () => {
        class Foo {}
        class Bar {}

        assert.equal(isSub(Foo, Bar), false);
      });

      it('when value is not a constructor', () => {
        for (const value of [123, 'str', null, undefined, {}, true]) {
          assert.equal(isSub(value, Base), false);
        }
      });

      it('when value is an arrow function', () => {
        const arrow = () => {};

        assert.equal(isSub(arrow, Base), false);
      });
    });

    describe('should throw TypeError', () => {
      it('when base is not a constructor', () => {
        for (const base of [123, 'str', null, undefined, {}, true]) {
          assert.throws(() => isSub(Child, base), baseError);
        }
      });

      it('when base is an arrow function', () => {
        const arrow = () => {};

        assert.throws(() => isSub(Child, arrow), baseError);
      });

      it('when both arguments are non-constructors', () => {
        assert.throws(() => isSub(null, null), baseError);
        assert.throws(() => isSub(42, 'hello'), baseError);
      });

      it('when called with no arguments', () => {
        assert.throws(() => isSub(), baseError);
      });
    });

    describe('>result', () => {
      it('should follow the real prototype chain', () => {
        class Custom {
          static [Symbol.hasInstance]() {
            return false;
          }
        }

        class Derived extends Custom {}

        assert.equal(isSub(Derived, Custom), true);
      });

      it('should ignore a custom Symbol.hasInstance', () => {
        class AlwaysTrue {
          static [Symbol.hasInstance]() {
            return true;
          }
        }

        class Throwing {
          static [Symbol.hasInstance]() {
            throw new Error('unexpected');
          }
        }

        assert.equal(isSub(Base, AlwaysTrue), false);
        assert.equal(isSub(Child, Throwing), false);
      });
    });
  });
}
