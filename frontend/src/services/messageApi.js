import api from './api';
import socket from '../sockets';
import routes from '../helpers/routes';

const messageApiPath = routes.messageApiPath();

const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => messageApiPath,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const handleNewMessage = (event) => {
          updateCachedData((draft) => {
            draft.push(event);
          });
        };

        const handleRemoveChannel = (event) => {
          updateCachedData((draft) => draft.filter((message) => message.channelId !== event.id));
        };

        socket.on('newMessage', handleNewMessage);
        socket.on('removeChannel', handleRemoveChannel);

        await cacheEntryRemoved;

        socket.off('newMessage', handleNewMessage);
        socket.off('removeChannel', handleRemoveChannel);
      },
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
