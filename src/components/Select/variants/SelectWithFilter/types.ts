import { type SelectProps, type Option } from './../../types';
import { type ReactNode } from 'react';
export type SelectWithFilterProps = Omit<SelectProps, 'children' | 'options'> & {
  /**
   * If not found, render this component
   */
  notFoundComponent?: ReactNode;
  /**
   * The option list
   */
  initialOptions: Option[];
  /**
   * The loading component
   */
  loadingComponent?: ReactNode;

  /**
   * You want to search only when the search text passed you condition? use this
   * @param v the search input value
   * @returns did the search input value pass the test
   */
  testSearchTextFunction: (v: string) => boolean;

  /**
   * If the query text failed the test, render this component
   */
  failedTestComponent?: ReactNode;
  /**
   * The placeholder of the search box
   */
  searchBoxPlaceholder?: string;

  /**
   * As its name :)
   */
  caseSensitive?: boolean;
};
