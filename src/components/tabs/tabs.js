import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tab from './tab/tab';

export default function Tabs({ items, side = 'right', onTabSelect, children, className }) {
  const [activeTab, setActiveTab] = useState(() => items[0]?.label ?? undefined);

  useEffect(() => {
    if (items.length) {
      const [initialTab] = items;

      setActiveTab(initialTab.label);
    } else {
      setActiveTab(undefined);
    }
  }, [items]);

  const isTabActive = useCallback((label) => label === activeTab, [activeTab]);

  return (
    <div className={`tabs-container ${className ?? ''}`}>
      <TabsList side={side} className="tabs-list">
        {items.map((item) => (
          <Tab
            key={item.label}
            data={item}
            onTabSelect={onTabSelect}
            setActiveTab={setActiveTab}
            isSelected={isTabActive(item.label)}
            tabsSide={side}
          />
        ))}
      </TabsList>
      <div className="tab-panel">
        {children &&
          children.length > 1 &&
          children.map((child) => {
            if (activeTab && child.props.label !== activeTab) return undefined;

            return child.props.children;
          })}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  className: PropTypes.string,
  children: PropTypes.instanceOf(Array).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
  ),
  onTabSelect: PropTypes.func,
  side: PropTypes.oneOf(['left', 'right', 'center']),
};

/* Styled components
   ========================================================================== */
const TabsList = styled.div`
  display: flex;
  justify-content: ${({ side }) => {
    if (side === 'right') {
      return 'flex-end';
    }
    if (side === 'left') {
      return 'flex-start';
    }
    if (side === 'center') {
      return 'center';
    }
  }};
`;
