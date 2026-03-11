import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isSubConstructor } from '../src/index.mjs';

describe('isSubConstructor', () => {
	class Base {}
	class Child extends Base {}
	class GrandChild extends Child {}

	describe('should return true', () => {
		it('when value is a direct sub-constructor of base', () => {
			assert.equal(isSubConstructor(Child, Base), true);
		});

		it('when value is an indirect sub-constructor of base', () => {
			assert.equal(isSubConstructor(GrandChild, Base), true);
		});

		it('when checking built-in inheritance (Array extends Object)', () => {
			assert.equal(isSubConstructor(Array, Object), true);
		});

		it('when checking built-in inheritance (Map extends Object)', () => {
			assert.equal(isSubConstructor(Map, Object), true);
		});

		it('when checking built-in inheritance (TypeError extends Error)', () => {
			assert.equal(isSubConstructor(TypeError, Error), true);
		});
	});

	describe('should return false', () => {
		it('when value and base are the same constructor', () => {
			assert.equal(isSubConstructor(Base, Base), false);
		});

		it('when value is the base of the other', () => {
			assert.equal(isSubConstructor(Base, Child), false);
		});

		it('when value and base are unrelated constructors', () => {
			class Foo {}
			class Bar {}

			assert.equal(isSubConstructor(Foo, Bar), false);
		});

		it('when value is not a constructor', () => {
			assert.equal(isSubConstructor(123, Base), false);
			assert.equal(isSubConstructor('str', Base), false);
			assert.equal(isSubConstructor(null, Base), false);
			assert.equal(isSubConstructor(undefined, Base), false);
			assert.equal(isSubConstructor({}, Base), false);
			assert.equal(isSubConstructor(true, Base), false);
		});

		it('when value is an arrow function', () => {
			const arrow = () => {};

			assert.equal(isSubConstructor(arrow, Base), false);
		});
	});

	describe('should throw TypeError', () => {
		const expectedError = {
			name: 'TypeError',
			message: 'Invalid "args[1] as base", one "constructor" expected.',
		};

		it('when base is not a constructor', () => {
			assert.throws(() => isSubConstructor(Child, 123), expectedError);
			assert.throws(() => isSubConstructor(Child, 'str'), expectedError);
			assert.throws(() => isSubConstructor(Child, null), expectedError);
			assert.throws(() => isSubConstructor(Child, undefined), expectedError);
			assert.throws(() => isSubConstructor(Child, {}), expectedError);
			assert.throws(() => isSubConstructor(Child, true), expectedError);
		});

		it('when base is an arrow function', () => {
			const arrow = () => {};

			assert.throws(() => isSubConstructor(Child, arrow), expectedError);
		});

		it('when both arguments are non-constructors', () => {
			assert.throws(() => isSubConstructor(null, null), expectedError);
			assert.throws(() => isSubConstructor(42, 'hello'), expectedError);
		});

		it('when called with no arguments', () => {
			assert.throws(() => isSubConstructor(), expectedError);
		});
	});
});
