import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import Tabs from './components/tabs/tabs';
import contentSelector from './components/content-selector/content-selector';

import api from './api';
import './index.css';

export default function App() {
  const [tabs, setTabs] = useState([]);
  const [tabContent, setTabContent] = useState({});
  const { type, content } = tabContent;

  const fetchTabs = async () => {
    const result = await api.getTabs();
    setTabs(result);
  };

  useEffect(() => {
    fetchTabs();
  }, []);

  const handleTabSelect = useCallback(async (tabData) => {
    const { contentEndpoint } = tabData;

    const res = await api.getTabContent(contentEndpoint);
    setTabContent(res);
  }, []);

  return (
    <Container style={{ padding: '30px' }}>
      <Title>Please select one font</Title>
      <Tabs items={tabs} onTabSelect={handleTabSelect} side="right">
        {tabs.map((tab) => {
          return <div label={tab.label}>{contentSelector(type, content)}</div>;
        })}
      </Tabs>
    </Container>
  );
}

/* Styled components
   ========================================================================== */
const Container = styled.div`
  padding: 30px;

  .tab-content {
    border: 3px solid #becadf;
    border-radius: 10px;
    padding: 30px;
    margin-top: 30px;
    min-width: 300px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 34px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  opacity: ${({ isSelected }) => isSelected && '0.5'};
`;

const ContentWrapper = styled.div`
  border: 3px solid #becadf;
  border-radius: 10px;
  padding: 30px;
  min-width: 300px;
`;
