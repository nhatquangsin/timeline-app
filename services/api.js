import axios from 'axios';

import { API_URL } from '../constants/api';
// eslint-disable-next-line import/no-cycle
import store from '../store';

export const query = async ({
  method = 'GET',
  endpoint = '/',
  data = {},
  headers = {},
  params = {},
}) =>
  // eslint-disable-next-line no-return-await
  {
    await axios({
      method,
      url: API_URL + endpoint,
      data,
      params,
      headers: store.getState().user.isLogged
        ? { ...headers, token: store.getState().user.userInfo.token }
        : headers,
    });
  };
