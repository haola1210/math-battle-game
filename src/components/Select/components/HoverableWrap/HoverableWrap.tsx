import { cloneElement, isValidElement } from 'react';
import { type HoverableWrapProps, type Option } from '@components/Select/types';
import { withStopPropagation } from '@components/Select/utils';

import './HoverableWrap.scss';

const HoverableWrap = ({
  currentValue,
  children,
  option,
  onSelect,
  hoveredOption,
  setHoveredOption,
  isSelected,
}: HoverableWrapProps) => {
  const isHovered = hoveredOption ? option.value === hoveredOption.value : false;

  return (
    <div
      className={`option${isSelected ? ' option--selected' : ''}${
        isHovered ? ' option--hover' : ''
      }`}
      onClick={(e) => {
        withStopPropagation(e, () => {
          onSelect(option.value, currentValue);
        });
      }}
      onMouseEnter={() => {
        setHoveredOption(option);
      }}
      onMouseLeave={() => {
        setHoveredOption(undefined);
      }}
    >
      {isValidElement(children)
        ? cloneElement(children as React.ReactElement<{ option: Option }>, { option })
        : children}
    </div>
  );
};

export default HoverableWrap;
