import React, { type ChangeEvent, useCallback } from 'react';
import Select from '../..';
import './SelectWithSearch.scss';
import { type SelectWithSearchProps } from './types';

/**
 * ## **[The author notice]:** Pls read this carefully
 *
 * This is the `Base Component` for any `Enhanced Select` component with the searching feature
 *
 * The `SelectWithFilter` and `SelectWithQuery` will inherit this `Base Component`
 *
 * **DO NOT USE** this component directly!!!
 *
 * You have to control all it props in the parent component :v
 *
 * This component is used to implement a `Business Feature Component`
 *
 * If you want a selector with filtering? use the `SelectWithFilter`
 *
 * If you want a selector with API query? use the `SelectWithQuery`
 *
 * If they do not exist, feel free to implement them base on this `Base Component`.
 * Or wait till I implement them. I will do it asap, promise =)))
 *
 * From the author with love, Hao Le <3
 */
const SelectWithSearch = ({
  inputValue,
  onChangeInputValue,
  isLoading,
  loadingComponent = 'Searching...',
  didPassTest = true,
  failedTestComponent = 'Invalid search text!',
  searchResult,
  notFound,
  notFoundComponent = 'Not found!',
  searchBoxPlaceholder = 'Search something',
  ...props
}: SelectWithSearchProps) => {
  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChangeInputValue(e);
  }, []);

  return (
    <Select
      {...props}
      options={searchResult}
    >
      <div className='search-ctn'>
        <input
          type='text'
          value={inputValue}
          onChange={handleChangeInput}
          placeholder={searchBoxPlaceholder}
        />
        {isLoading && (
          <div className='search-ctn__body'>
            {/* render loading component */}
            {loadingComponent}
          </div>
        )}
        {!didPassTest && (
          <div className='search-ctn__body'>
            {/* render failure component */}
            {failedTestComponent}
          </div>
        )}
        {notFound && (
          <div className='search-ctn__body'>
            {/* render whenever not found */}
            {notFoundComponent}
          </div>
        )}
      </div>
    </Select>
  );
};

export default SelectWithSearch;
