/**
 * Simple utility to merge class strings
 */
export function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
