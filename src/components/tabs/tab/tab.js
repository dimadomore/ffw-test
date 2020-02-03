import React, { useCallback, useEffect } from 'react';
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
    }
  }, [data, isSelected, onTabSelect]);

  return (
    <Container className="tab" isSelected={isSelected} onClick={selectTab} tabsSide={tabsSide}>
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
  font-size: 16px;
  color: ${({ isSelected }) => (isSelected ? '#BFCADF' : '#F54B00')};
  cursor: pointer;

  ${({ tabsSide }) =>
    tabsSide === 'right'
      ? css`
          margin-right: 15px;
        `
      : css`
          margin-left: 15px;
        `}
`;