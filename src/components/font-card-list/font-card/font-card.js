import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FontCard = React.memo(
  ({ id, abbr, color, colorBlindLabel, label, isSelected, onSelect, as, className }) => {
    const handleClick = useCallback(() => onSelect(id), [id, onSelect]);

    const croppedLabel = useMemo(
      () => (label.length > 55 ? `${label.substring(0, 55)}...` : label),
      [label],
    );

    return (
      <Container
        className={className}
        isSelected={isSelected}
        as={as}
        onClick={handleClick}
        aria-label={colorBlindLabel}
        aria-describedby={label}
      >
        <AbbrContainer color={color} className="abbr-container">
          <Abbr>{abbr}</Abbr>
        </AbbrContainer>
        <LabelContainer className="label-container" title={label}>
          <Label>{croppedLabel}</Label>
        </LabelContainer>
      </Container>
    );
  },
);

export default FontCard;

FontCard.propTypes = {
  id: PropTypes.number.isRequired,
  abbr: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  colorBlindLabel: PropTypes.string,
  label: PropTypes.string.isRequired,
  as: PropTypes.string,
  onSelect: PropTypes.func,
  isSelected: PropTypes.bool,
  className: PropTypes.string,
};

/* Styled components
   ========================================================================== */
const Container = styled.li`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  opacity: ${({ isSelected }) => isSelected && '0.5'};
  cursor: pointer;
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
  border: 2px solid black;
  background-color: ${({ color }) => color};
  padding: 15px;
  margin-right: 20px;
`;

const Abbr = styled.span`
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.3);
`;

const LabelContainer = styled.div`
  flex: 1;
  /* max-width: 300px; */
  min-width: 210px;
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  hyphens: auto;
  position: relative;
  margin-left: 15px;

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
