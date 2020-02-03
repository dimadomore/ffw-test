import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontCard from '../font-card/font-card';

export default function FontCardList({ items }) {
  const [selectedCard, selectCard] = useState();

  const cards = [
    {
      id: 112,
      abbr: 'M',
      color: '#00A653',
      'color-blind-label': 'green',
      label: 'Merriweather project is led by Sorkin Type',
    },
    {
      id: 113,
      abbr: 'R',
      color: '#FE7FC3',
      'color-blind-label': 'pink',
      label: "Roboto doesn't compromise, allowing letters",
    },
    {
      id: 114,
      abbr: 'NS',
      color: '#046DFF',
      'color-blind-label': 'blue',
      label: 'Noto Sans covers over 30 scripts',
    },
  ];

  return (
    <Container>
      {cards.map((card) => (
        <FontCard key={card.id} {...card} />
      ))}
    </Container>
  );
}

FontCardList.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
  isSelected: PropTypes.bool,
  onTabClick: PropTypes.func,
};

/* Styled components
   ========================================================================== */
const Container = styled.ul`
  display: grid;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
