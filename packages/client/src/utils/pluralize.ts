/**
 * Conditionally pluralize a string
 * @param n The count to pluralize against
 * @param str The string to pluralize
 * @param makePlural Function to transform the base string to
 *  plural form. Defaults to appending an "s".
 * @returns The result of makePlural when n != 1, str otherwise
 */
export function pluralize<Base extends string, PluralForm extends string = "s">(
  n: number,
  str: Base,
  makePlural?: (str: Base) => PluralForm
): Base | PluralForm {
  if (n === 1) return str;
  if (!makePlural) makePlural = () => `${str}s` as any;
  return makePlural(str);
}
