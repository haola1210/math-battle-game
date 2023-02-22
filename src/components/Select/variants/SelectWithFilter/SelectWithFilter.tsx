import React, { type ChangeEvent, useCallback, useState, useEffect } from 'react';
import { type SelectWithFilterProps } from './types';
import { SelectWithSearch } from '../SelectWithSearch';

/**
 * This is a `Business Feature Component`
 *
 * If you want a selector with the fixed options list and filtering feature, use this
 *
 * This component is implemented base on `Base Component` `SelectWithSearch`
 *
 * As I mention before, using the `Base Component` in a feature is such a nightmare.
 *
 * You can see in `App.tsx`, I'm using the `SelectWithSearch` as `SelectWithFilter`
 * So I have to manage everything myself :(
 *
 * the `SelectWithFilter` acts as an abstraction API, so you can use it easily
 */
const SelectWithFilter = ({
  initialOptions,
  testSearchTextFunction,
  caseSensitive = false,
  ...props
}: SelectWithFilterProps) => {
  // #region For select with search
  const [data, setData] = useState({
    searchResult: initialOptions,
    notFound: false,
    isLoading: false,
  });
  const [search, setSearch] = useState<{ text: string; didPassTest: undefined | boolean }>({
    text: '',
    didPassTest: undefined,
  });

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '') {
      setSearch({
        text: value,
        didPassTest: true,
      });
      return;
    }

    const didPassTest = testSearchTextFunction(value);
    setSearch({
      text: value,
      didPassTest,
    });
  }, []);

  const filtering = useCallback((v: string) => {
    if (caseSensitive) {
      return initialOptions.filter((option) => option.name?.includes(v));
    }

    return initialOptions.filter((option) => option.name?.toLowerCase().includes(v.toLowerCase()));
  }, []);

  useEffect(() => {
    if (search.didPassTest) {
      setData((prev) => ({ ...prev, notFound: false, isLoading: true }));
      const options = filtering(search.text);
      if (options.length === 0) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          notFound: true,
          searchResult: [],
        }));
      } else {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          notFound: false,
          searchResult: options,
        }));
      }
    }
  }, [search.text, search.didPassTest]);

  // #endregion
  return (
    <SelectWithSearch
      searchResult={data.searchResult}
      notFound={data.notFound}
      inputValue={search.text}
      onChangeInputValue={handleChangeInput}
      isLoading={data.isLoading}
      didPassTest={search.didPassTest}
      {...props}
    />
  );
};

export default SelectWithFilter;
