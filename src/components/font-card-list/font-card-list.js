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
      <ul>
        {items.map((card) => (
          <FontCard
            className="font-card_container"
            key={card.id}
            {...card}
            onSelect={selectCard}
            isSelected={isCardSelected(card.id)}
          />
        ))}
      </ul>
    </Container>
  );
}

FontCardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      abbr: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      colorBlindLabel: PropTypes.string,
      label: PropTypes.string.isRequired,
    }),
  ),
};

/* Styled components
   ========================================================================== */
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 40px;

    @media (min-width: 1000px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
      width: 100%;
      justify-content: center;
    }

    @media (min-width: 750px) and (max-width: 1000px) {
      grid-template-columns: 200px repeat(auto-fit, minmax(300px, 500px));

      .font-card_container:nth-child(3n + 1) {
        grid-row: span 2;
        .abbr-container {
          transform: scale(1.3);
          border-width: 1px;
          margin: 0 0 0 15px;
        }
      }
    }

    @media (max-width: 749px) {
      grid-template-columns: minmax(200px, 500px);
      grid-template-rows: min-content;
      grid-gap: 30px;
    }

    @media (max-width: 450px) {
      .font-card_container .abbr-container {
        margin: 0 0 15px 30px;
      }
    }
  }
`;
