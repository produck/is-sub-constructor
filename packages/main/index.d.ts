/**
 * Check if a value is a sub-constructor (derived class) of a given base constructor.
 * @param value - The value to check
 * @param base - The base constructor to check against
 * @returns True if value is a sub-constructor of base, false otherwise
 * @throws {TypeError} If base is not a constructor
 */
export function isSubConstructor(
	value: unknown,
	base: new (...args: unknown[]) => unknown,
): boolean;
