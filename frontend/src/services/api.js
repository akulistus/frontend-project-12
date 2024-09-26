import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../helpers/routes';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.apiPath(),
    prepareHeaders: (headers, { getState }) => {
      const { user: { getToken } } = getState();
      const token = getToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
