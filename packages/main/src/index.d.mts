/**
 * Predicate returned by the sub-constructor checks.
 *
 * @param value Candidate sub-constructor to inspect.
 * @param base Expected base constructor.
 * @returns `true` when `base.prototype` is in the prototype chain of
 *   `value.prototype`.
 */
type SubConstructorPredicate = (
  value: unknown,
  base: new (...args: unknown[]) => unknown,
) => boolean;

/**
 * Check whether `value` is a sub-class of `base` using `isClassLike`.
 *
 * @param value Candidate sub-constructor to inspect.
 * @param base Expected base constructor.
 * @returns `true` when `value` derives from `base`, otherwise `false`.
 * @throws {TypeError} When `base` is not class-like.
 */
export const isSubClass: SubConstructorPredicate;

/**
 * Check whether `value` is a sub-constructor of `base` using
 * `isConstructor`.
 *
 * @param value Candidate sub-constructor to inspect.
 * @param base Expected base constructor.
 * @returns `true` when `value` derives from `base`, otherwise `false`.
 * @throws {TypeError} When `base` is not a constructor.
 */
export const isSubConstructor: SubConstructorPredicate;
