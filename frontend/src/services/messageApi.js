import api from './api';
import routes from '../helpers/routes';

const messageApiPath = routes.messageApiPath();

const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => messageApiPath,
    }),
    postMessage: builder.mutation({
      query: (message) => ({
        url: messageApiPath,
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  usePostMessageMutation,
} = messageApi;
