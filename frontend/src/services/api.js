import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

const socket = io();

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    getChannels: builder.query({
      query: () => 'channels',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        await cacheDataLoaded;

        socket.on('newChannel', (event) => {
          updateCachedData(draft => {
            draft.push(event);
          });
        });

        socket.on('removeChannel',(event) => {
          updateCachedData(draft => {
            const index = draft.findIndex(channel => channel.id === event.id);
            if (index !== -1) draft.splice(index, 1);
          });
        });
      }
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
    getMessages: builder.query({
			query: () => 'messages',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        await cacheDataLoaded;

        const listener = (event) => {
          updateCachedData(draft => {
            draft.push(event);
          });
        };

        socket.on('newMessage', listener);
      }
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
  useLoginMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  usePostMessageMutation,
} = api;