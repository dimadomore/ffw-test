import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';

import api from '../../api';
import '../../index.css';
import Tabs from '../tabs/tabs';
import useGlobalState from '../../hooks/use-global-state';
import { contentSelector } from '../../helpers';

export default function App() {
  const { globalState, setGlobalState } = useGlobalState();
  const { tabs, tabContents } = globalState;

  const fetchTabs = useCallback(async () => {
    const result = await api.getTabs();

    setGlobalState({ type: 'SET_TABS', payload: result });
  }, [setGlobalState]);

  const fetchTabContent = useCallback(
    async (tabData) => {
      const { contentEndpoint, id } = tabData;

      if (contentEndpoint && id) {
        const data = await api.getTabContent(contentEndpoint);

        setGlobalState({ type: 'SET_TAB_CONTENT', payload: { id, data } });
      }
    },
    [setGlobalState],
  );

  useEffect(() => {
    fetchTabs();
  }, [fetchTabs]);

  const handleTabSelect = useCallback(
    async (tabData) => {
      const { id } = tabData;

      // prevent refetch tab data
      if (!tabContents.hasOwnProperty(id)) {
        fetchTabContent(tabData);
      }
    },
    [fetchTabContent, tabContents],
  );

  return (
    <Container style={{ padding: '30px' }}>
      <Title>Please select one font</Title>
      <Tabs items={tabs} onTabSelect={handleTabSelect} side="right">
        {tabs.map(({ id, label }) => {
          const tabContent = tabContents[id];

          if (tabContent) {
            const { type, content } = tabContent;

            return (
              <div key={label} label={label}>
                {contentSelector(type, content)}
              </div>
            );
          }
          return <div key={label} label={label} />;
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
