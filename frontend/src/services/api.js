import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import { setDefault } from '../slices/channelSlice';

const socket = io();

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('token');
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
    signUp: builder.mutation({
      query: (newUser) => ({
        url: 'signup',
        method: 'POST',
        body: newUser,
      }),
    }),
    getChannels: builder.query({
      query: () => 'channels',
      async onCacheEntryAdded(
        arg,
        {
          updateCachedData, cacheDataLoaded, dispatch,
        },
      ) {
        await cacheDataLoaded;

        socket.on('newChannel', (event) => {
          updateCachedData((draft) => [...draft, event]);
        });

        socket.on('removeChannel', (event) => {
          updateCachedData((draft) => draft.filter((channel) => channel.id !== event.id));
          dispatch(setDefault());
        });

        socket.on('renameChannel', (e) => {
          updateCachedData((draft) => draft.map((c) => (c.id === e.id ? e : c)));
        });
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
    getMessages: builder.query({
      query: () => 'messages',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded },
      ) {
        await cacheDataLoaded;

        socket.on('newMessage', (event) => {
          updateCachedData((draft) => {
            draft.push(event);
          });
        });

        socket.on('removeChannel', (event) => {
          updateCachedData((draft) => draft.filter((message) => message.channelId !== event.id));
        });
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
  useLoginMutation,
  useSignUpMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
  useGetMessagesQuery,
  usePostMessageMutation,
} = api;
