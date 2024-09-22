import api from './api';
import socket from '../sockets';
import { setDefault } from '../slices/channelSlice';

const channelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
      async onCacheEntryAdded(
        arg,
        {
          updateCachedData, cacheDataLoaded, dispatch, cacheEntryRemoved,
        },
      ) {
        await cacheDataLoaded;

        const handleNewChannel = (event) => {
          updateCachedData((draft) => [...draft, event]);
        };

        const handleRemoveChannel = (event) => {
          updateCachedData((draft) => draft.filter((channel) => channel.id !== event.id));
          dispatch(setDefault());
        };

        const handleRanameChannel = (e) => {
          updateCachedData((draft) => draft.map((c) => (c.id === e.id ? e : c)));
        };

        socket.on('newChannel', handleNewChannel);
        socket.on('removeChannel', handleRemoveChannel);
        socket.on('renameChannel', handleRanameChannel);

        await cacheEntryRemoved;

        socket.off('newChannel', handleNewChannel);
        socket.off('removeChannel', handleRemoveChannel);
        socket.off('renameChannel', handleRanameChannel);
      },
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: 'channels',
        method: 'POST',
        body: newChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
    }),
    editChannel: builder.mutation({
      query: (newChannel) => ({
        url: `channels/${newChannel.id}`,
        method: 'PATCH',
        body: newChannel.body,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
} = channelApi;
