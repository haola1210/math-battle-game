import { type ReactNode, type ChangeEvent } from 'react';
import { type OptionList, type SelectProps } from './../../types';
export type SelectWithSearchProps = Omit<SelectProps, 'children' | 'options'> & {
  /**
   * The search result
   */
  searchResult: OptionList;
  /**
   * Not found any options with the search text?
   */
  notFound?: boolean;
  /**
   * If not found, render this component
   */
  notFoundComponent?: ReactNode;
  /**
   * The current value of the search input
   */
  inputValue: string;

  /**
   * The function to update search input value
   * @param v the next value
   * @returns void
   */
  onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Loading status of the filtering
   */
  isLoading: boolean;

  /**
   * The loading component
   */
  loadingComponent?: ReactNode;

  /**
   * Did the query text pass your test?
   */
  didPassTest?: boolean;
  /**
   * If the query text failed the test, render this component
   */
  failedTestComponent?: ReactNode;
  /**
   * The placeholder of the search box
   */
  searchBoxPlaceholder?: string;
};
