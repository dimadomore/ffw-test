import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useDimensions from '../../hooks/use-dimensions';

export default function FontCard({ abbr, color, colorBlindLabel, label, isSelected }) {
  return (
    <Container isSelected={isSelected}>
      <AbbrContainer color={color}>
        <Abbr>{abbr}</Abbr>
      </AbbrContainer>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
    </Container>
  );
}

FontCard.propTypes = {
  id: PropTypes.number,
  abbr: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  colorBlindLabel: PropTypes.string,
  label: PropTypes.string.isRequired,
};

/* Styled components
   ========================================================================== */
const Container = styled.li`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  opacity: ${({ isSelected }) => isSelected && '0.5'};
`;

const AbbrContainer = styled.div`
  display: flex;
  align-items: flex-end;
  border-radius: 15px;
  width: 100px;
  min-width: 100px;
  height: 100px;
  min-height: 100px;
  box-shadow: inset 0px 0px 0px 3px white;
  border: 1px solid black;
  background-color: ${({ color }) => color};
  padding: 15px;
`;

const Abbr = styled.span`
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.3);
`;

const LabelContainer = styled.div`
  width: 200px;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  hyphens: auto;
  position: relative;
  margin-left: 25px;

  ::before {
    display: inline-block;
    content: '';
    -webkit-border-radius: 0.375rem;
    border-radius: 0.375rem;
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 0.5rem;
    background-color: #96a1b2;
    position: absolute;
    left: -0.75em;
    top: 0.55em;
  }
`;
