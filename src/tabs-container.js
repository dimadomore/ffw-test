import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TabsContainer({ data, isSelected = false, onTabClick }) {
  const { label } = data;

  const handleClick = () => onTabClick(data);

  return (
    <Container isSelected={isSelected} onClick={handleClick}>
      {label}
    </Container>
  );
}

TabsContainer.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string.isRequired,
  }),
  isSelected: PropTypes.bool,
  onTabClick: PropTypes.func,
};

/* Styled components
   ========================================================================== */
const Container = styled.button`
  text-transform: uppercase;
  font-weight: 600;
  color: ${({ isSelected }) => (isSelected ? '#F54B00' : '#BFCADF')};
  padding: 5px 10px;
`;
