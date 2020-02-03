import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useGlobalState from '../../hooks/use-global-state';
import FontCard from './font-card/font-card';

export default function FontCardList({ items }) {
  const { globalState, setGlobalState } = useGlobalState();
  const { selectedCard } = globalState;

  const selectCard = useCallback(
    (id) => {
      setGlobalState({ type: 'SELECT_FONT_CARD', payload: id });
    },
    [setGlobalState],
  );

  const isCardSelected = useCallback(
    (cardId) => {
      return cardId === selectedCard;
    },
    [selectedCard],
  );

  return (
    <Container>
      {items.map((card) => (
        <FontCard
          key={card.id}
          {...card}
          onSelect={selectCard}
          isSelected={isCardSelected(card.id)}
        />
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
