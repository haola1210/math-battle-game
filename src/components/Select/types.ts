import { type ReactNode } from 'react';

export type Option = {
  value: number | string;
  name: string;
  render?: () => ReactNode;
  html?: string;
};

export type OptionList = Option[];

export type Delta = -1 | 0 | 1;
export type NoZeroDelta = -1 | 1;

export type SelectProps = {
  /**
   * If you want to render any Element in the top of Dropdown, use this.
   */
  children?: ReactNode;
  /**
   * Any custom icon when hiding the Dropdown?
   */
  iconOnHide?: ReactNode;
  /**
   * Any custom icon when showing the Dropdown?
   */
  iconOnShow?: ReactNode;
  /**
   * Do you want to show the icon?
   */
  shouldShowIcon?: boolean;
  /**
   * Does this Select open by default?
   */
  isOpenByDefault?: boolean;

  /**
   * The current value of this Select
   */
  value: Option['value'] | undefined;
  /**
   * This will call whenever you `click` or `enter` or `tab` the `Hovered Option`
   * @param v is the selected value
   * @returns `undefined`
   */
  onSelect: (v: SelectProps['value']) => void;

  /**
   * The list of options
   */
  options: OptionList;

  /**
   * The placeholder when the selected value is `undefined`
   */
  placeholder?: string;

  /**
   * If you want to do anything after dropdown toggling, use this
   * @param toggleStatus the status of the dropdown
   * @returns `undefined`
   */
  toggleCallback?: (toggleStatus: boolean) => void;
};

export type OptionRendererProps = {
  option: Option;
};

export type HoverableWrapProps = {
  currentValue: SelectProps['value'];
  // eslint-disable-next-line @typescript-eslint/ban-types
  children: Exclude<ReactNode, undefined | null>;
  option: Option;
  onSelect: (value: Option['value'], currentValue: SelectProps['value']) => void;
  hoveredOption: Option | undefined;
  setHoveredOption: (v: HoverableWrapProps['hoveredOption']) => void;
  isSelected: boolean;
};
