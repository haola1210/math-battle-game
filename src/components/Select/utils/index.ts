import { type NoZeroDelta, type Option, type OptionList } from '../types';

/**
 * This HOF will stop propagation
 * @param e any `Event` object
 * @param cb a callback
 */
export const withStopPropagation = (e: React.MouseEvent<HTMLElement>, cb?: () => void) => {
  console.log(e);
  e.stopPropagation();
  cb?.();
};

/**
 * This function will return a `Safe Option` - an Option inside the List
 * @param options List of `Option`s
 * @param currentOption the current `Option`
 * @param delta the unit of index changing
 * @returns the safe next `Option`
 */
export const getNextOption = (
  options: OptionList,
  currentOption: Option | undefined,
  delta: NoZeroDelta,
) => {
  if (currentOption === undefined) {
    if (delta === 1) return options[0];
    if (delta === -1) return undefined;
  }

  const currentIndex = options.findIndex((o) => o?.value === currentOption?.value);
  if (currentIndex === -1) return undefined;

  const nextIndex = currentIndex + delta;

  if (nextIndex < 0 || nextIndex >= options.length) {
    return currentOption;
  }

  return options[nextIndex];
};
