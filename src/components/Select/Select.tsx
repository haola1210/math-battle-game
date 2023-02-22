import './Select.scss';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { type NoZeroDelta, type Option, type SelectProps } from './types';
import { getNextOption, withStopPropagation } from './utils';
import { OptionRenderer } from './components/OptionRenderer';
import { HoverableWrap } from './components/HoverableWrap';

function reducer(prev: boolean, next?: boolean): boolean {
  if (next !== undefined) return next;
  return !prev;
}

/**
 * This is the `Base Component`
 */
export default function Select({
  children,
  iconOnHide = <BsFillCaretDownFill />,
  iconOnShow = <BsFillCaretUpFill />,
  shouldShowIcon = true,
  isOpenByDefault = false,

  value,
  onSelect,
  options,

  placeholder = 'Please select an option',

  toggleCallback,
}: SelectProps) {
  const [shouldDropDown, toggle] = useReducer(reducer, isOpenByDefault);

  const [hoveredOption, setHoveredOption] = useState<undefined | Option>();

  // #region Call toggle callback after the dropdown toggling
  // Should be optimized to not trigger when mounting (TODO: later)
  useEffect(() => {
    toggleCallback?.(shouldDropDown);
  }, [shouldDropDown]);
  // #endregion

  // #region Handle click an option
  const handleClick = useCallback((v: Option['value'], prev: typeof value) => {
    if (v !== prev) {
      onSelect?.(v);
    }
  }, []);
  // #endregion

  // #region The current selected option
  const selectedOption = useMemo(() => {
    if (value === undefined) return value;
    return options.find((option) => option.value === value);
  }, [value]);
  // #endregion

  useEffect(() => {
    if (value !== undefined) {
      toggle();
      setHoveredOption(undefined);
    }
  }, [value]);

  const onWindowClick = useCallback(() => {
    (toggle as React.Dispatch<boolean>)(false);
  }, []);
  useEffect(() => {
    window.document.addEventListener('click', onWindowClick);
    return () => {
      window.document.removeEventListener('click', onWindowClick);
    };
  }, []);

  const handleUpDown = (key: string) => {
    let delta = 0;
    if (key === 'ArrowDown') {
      delta = 1;
    }

    if (key === 'ArrowUp') {
      delta = -1;
    }

    if (shouldDropDown && delta !== 0 && options && options.length) {
      const nextOpt = getNextOption(options, hoveredOption, delta as NoZeroDelta);
      setHoveredOption(nextOpt);
    }
  };

  const handleSelectWithKey = () => {
    if (hoveredOption) {
      handleClick(hoveredOption.value, value);
    }
  };

  const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
    if (key === 'Enter' || key === 'Tab') {
      handleSelectWithKey();
    } else {
      handleUpDown(key);
    }
  };

  return (
    <div className='select-ctn'>
      <div
        className='select-header'
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div
          className='select-header__content'
          onClick={(e) => {
            withStopPropagation(e, toggle);
          }}
        >
          {selectedOption === undefined && placeholder}
          {selectedOption && <OptionRenderer option={selectedOption} />}
        </div>
        {shouldShowIcon && (
          <div
            className='select-header__icon'
            onClick={(e) => {
              withStopPropagation(e, toggle);
            }}
          >
            {shouldDropDown && iconOnShow}
            {!shouldDropDown && iconOnHide}
          </div>
        )}
      </div>
      <div className='select-body'>
        {shouldDropDown && (
          <div className='options-ctn'>
            {children && (
              <div
                className='options-ctn__header'
                onClick={withStopPropagation}
              >
                {children}
              </div>
            )}
            <div className='options-ctn__list'>
              {options?.map((option) => (
                <HoverableWrap
                  key={option.value}
                  currentValue={value}
                  option={option}
                  hoveredOption={hoveredOption}
                  setHoveredOption={setHoveredOption}
                  onSelect={handleClick}
                  isSelected={selectedOption?.value === option.value}
                >
                  <OptionRenderer option={option} />
                </HoverableWrap>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
