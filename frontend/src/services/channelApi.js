import api from './api';
import routes from '../helpers/routes';

const channelApiPath = routes.channelApiPath();

const channelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => channelApiPath,
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: channelApiPath,
        method: 'POST',
        body: newChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: [channelApiPath, id].join('/'),
        method: 'DELETE',
      }),
    }),
    editChannel: builder.mutation({
      query: (newChannel) => ({
        url: [channelApiPath, newChannel.id].join('/'),
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
