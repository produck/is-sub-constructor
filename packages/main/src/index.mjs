import { ThrowTypeError } from '@produck/type-error';
import { isConstructor } from '@produck/is-constructor';

export function isSubConstructor(value, base) {
	if (!isConstructor(base)) {
		ThrowTypeError('args[1] as base', 'constructor');
	}

	if (!isConstructor(value)) {
		return false;
	}

	return value.prototype instanceof base;
}
