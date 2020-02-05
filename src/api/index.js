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
};
