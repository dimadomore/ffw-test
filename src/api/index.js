import axios from 'axios';

import { keysToCamel } from '../helpers';

const hostUrl = 'http://json.ffwagency.md';

axios.interceptors.response.use(
  (response) => {
    if (response.data) {
      return keysToCamel(response.data);
    }
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default {
  getTabs: () => axios.get(`${hostUrl}/tabs`),
  getTabContent: (contentEndpoint) => axios.get(`${hostUrl}/${contentEndpoint}`),
  getTabContents: (contentEndpoint) => ({
    type: 'Font selection',
    content: [
      {
        id: 112,
        abbr: 'M',
        color: '#00A653',
        'color-blind-label': 'green',
        label: 'Merriweather project is led by Sorkin Type',
      },
      {
        id: 113,
        abbr: 'R',
        color: '#FE7FC3',
        'color-blind-label': 'pink',
        label:
          "Roboto doesn't compromise, allowing letters Roboto doesn't compromise, allowing letters Roboto doesn't compromise, allowing letters",
      },
      {
        id: 114,
        abbr: 'NS',
        color: '#046DFF',
        'color-blind-label': 'blue',
        label: 'Noto Sans covers over 30 scripts',
      },
      {
        id: 112,
        abbr: 'M',
        color: '#00A653',
        'color-blind-label': 'green',
        label: 'Merriweather project is led by Sorkin Type',
      },
      {
        id: 113,
        abbr: 'R',
        color: '#FE7FC3',
        'color-blind-label': 'pink',
        label: "Roboto doesn't compromise, allowing letters",
      },
      {
        id: 115,
        abbr: 'NS',
        color: '#046DFF',
        'color-blind-label': 'blue',
        label: 'Noto Sans covers over 30 scripts',
      },
      {
        id: 112,
        abbr: 'M',
        color: '#00A653',
        'color-blind-label': 'green',
        label: 'Merriweather project is led by Sorkin Type',
      },
      {
        id: 113,
        abbr: 'R',
        color: '#FE7FC3',
        'color-blind-label': 'pink',
        label: "Roboto doesn't compromise, allowing letters",
      },
      {
        id: 114,
        abbr: 'NS',
        color: '#046DFF',
        'color-blind-label': 'blue',
        label: 'Noto Sans covers over 30 scripts',
      },
    ],
  }),
};
