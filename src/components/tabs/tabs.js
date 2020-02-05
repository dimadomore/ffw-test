import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tab from './tab/tab';
import { keys } from '../../helpers';

export default function Tabs({ items, side = 'right', onTabSelect, children, className, name }) {
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

  const handleArrowKeys = useCallback(
    (e) => {
      e.preventDefault();
      const index = items.findIndex((item) => item.label === activeTab);

      if (e.which === keys.left || e.which === keys.up) {
        if (index > 0) {
          setActiveTab(items[index - 1].label);
        }
      } else if (e.which === keys.right || e.which === keys.down) {
        if (index < items.length - 1) {
          setActiveTab(items[index + 1].label);
        }
      }
    },
    [activeTab, items],
  );

  return (
    <div className={`tabs-container ${className ?? ''}`}>
      <TabsList
        role="tablist"
        side={side}
        className="tabs-list"
        aria-label={name}
        onKeyUp={handleArrowKeys}
      >
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
      {children &&
        children.length > 1 &&
        children.map((child) => {
          const { label } = child.props;

          if (activeTab && label !== activeTab) return undefined;

          return (
            <div
              key={label}
              className="tab-panel"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={label}
            >
              {child.props.children}
            </div>
          );
        })}
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

  &[role='tablist'] {
    overflow: visible;
  }
`;
