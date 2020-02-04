import React from 'react';
import styled from 'styled-components';

export default function TextContent({ children }) {
  return <Container>{children}</Container>;
}

/* Styled components
   ========================================================================== */
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
`;
