import { useState, useCallback, type ChangeEvent, useEffect } from 'react';
import reactLogo from '@assets/react.svg';
import './App.css';

import Select, { SelectWithFilter, SelectWithSearch, mockData } from '@components/Select';

function App() {
  const [v, setV] = useState<number | string | undefined>();

  // #region For select with search (this's such a nightmare)
  const [data, setData] = useState({
    searchResult: mockData,
    notFound: false,
    isLoading: false,
  });
  const [search, setSearch] = useState<{ text: string; didPassTest: undefined | boolean }>({
    text: '',
    didPassTest: undefined,
  });

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const didPassTest = value.length >= 3;
    setSearch({
      text: value,
      didPassTest,
    });
  }, []);

  const [selectedValue, setSelectedValue] = useState<number | string | undefined>();

  const searching = useCallback((v: string) => {
    return mockData.filter((option) => option.name.toLowerCase().includes(v));
  }, []);

  useEffect(() => {
    if (search.didPassTest) {
      setData((prev) => ({ ...prev, notFound: false, isLoading: true }));
      const options = searching(search.text);
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

  // #region For select with filter
  const [swfV, setSwfV] = useState<number | string | undefined>();
  // #endregion

  return (
    <div className='App'>
      <div>
        <img
          src='/vite.svg'
          className='logo'
          alt='Vite logo'
        />

        <img
          src={reactLogo}
          className='logo react'
          alt='React logo'
        />
      </div>
      <div>
        <Select
          options={mockData}
          value={v}
          onSelect={(v) => {
            setV(() => v);
          }}
        />

        {/* a mess, see? */}
        <div style={{ padding: `40px 0` }}>
          <p>type at lease 3 characters - you can change in the App.tsx</p>
          <SelectWithSearch
            searchResult={data.searchResult}
            notFound={data.notFound}
            inputValue={search.text}
            onChangeInputValue={handleChangeInput}
            isLoading={data.isLoading}
            didPassTest={search.didPassTest}
            value={selectedValue}
            onSelect={(v) => {
              setSelectedValue(() => v);
            }}
          />
        </div>
        {/*  */}

        {/* leaner and better the above one :) */}
        <div style={{ padding: `40px 0` }}>
          <p>type at lease 1 characters - you can change in the testSearchTextFunction</p>
          <SelectWithFilter
            initialOptions={mockData}
            value={swfV}
            onSelect={(v) => {
              setSwfV(() => v);
            }}
            testSearchTextFunction={(v: string) => v.length > 0}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
