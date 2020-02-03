import React from 'react';

import FontCardList from '../font-card-list/font-card-list';
import TextContent from '../text-content/text-content';
const contentTypes = {
  fontSelection: 'Font selection',
  text: 'Text',
};

const contentComponents = {
  [contentTypes.fontSelection]: (content) => <FontCardList items={content} />,
  [contentTypes.text]: (content) => <TextContent>{content}</TextContent>,
};

export default function contentSelector(type, content) {
  return type && contentComponents[type] ? contentComponents[type](content) : null;
}
