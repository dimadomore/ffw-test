import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Tab = React.memo(({ data, isSelected = false, onTabSelect, setActiveTab, tabsSide }) => {
  const { label } = data;

  const selectTab = useCallback(() => {
    if (!isSelected) {
      setActiveTab(label);
    }
  }, [isSelected, setActiveTab, label]);

  useEffect(() => {
    if (isSelected) {
      onTabSelect(data);
      ref.current.focus();
    }
  }, [data, isSelected, onTabSelect]);

  const ref = useRef();

  return (
    <Container
      className="tab"
      role="tab"
      tabIndex={!isSelected ? -1 : 0}
      aria-selected={isSelected}
      id={label}
      isSelected={isSelected}
      onClick={selectTab}
      tabsSide={tabsSide}
      ref={ref}
    >
      {label}
    </Container>
  );
});

export default Tab;

Tab.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string.isRequired,
  }),
  isSelected: PropTypes.bool,
  onTabActive: PropTypes.func,
  setActiveTab: PropTypes.func,
  side: PropTypes.oneOf(['left', 'right']),
};

/* Styled components
   ========================================================================== */
const Container = styled.button`
  border: 0;
  padding: 0;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  /* I think the font is wider on the png image (Maybe I'm wrong) */
  transform: scale(1.1, 1);

  color: ${({ isSelected }) => (isSelected ? '#BFCADF' : '#F54B00')};
  cursor: pointer;

  ${({ tabsSide }) =>
    tabsSide === 'right'
      ? css`
          margin-right: 25px;
        `
      : css`
          margin-left: 25px;
        `}
`;
