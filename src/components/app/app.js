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
    <Container>
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
const Title = styled.div`
  font-weight: 600;
  font-size: 30px;
  position: absolute;
  margin-left: 15px;
`;

const Container = styled.div`
  padding: 30px;
  width: 100%;

  .tabs-list {
    margin-top: 15px;
  }
  .tab-panel {
    border: 3px solid #becadf;
    border-radius: 10px;
    padding: 50px;
    margin-top: 30px;
    min-width: 300px;
  }

  @media (max-width: 749px) {
    ${Title} {
      position: static;
      text-align: center;
      font-size: 24px;
      margin-bottom: 10px;
      margin-left: 0;
    }

    .tabs-list {
      justify-content: center;

      .tab {
        margin: 0 20px;
      }
    }

    .tab-panel {
      padding: 20px;
      margin-top: 10px;
    }
  }
`;
