import api from './api';
import socket from '../sockets';

const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => 'messages',
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
        url: 'messages',
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
