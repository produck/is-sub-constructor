import { describe, it } from 'node:test';
import assert from 'node:assert';
import { isSubConstructor } from '../src/index.mjs';

describe('isSubConstructor', () => {
	it('is not implemented yet', () => {
		assert.throws(() => isSubConstructor(), { message: 'Not implemented.' });
	});
});