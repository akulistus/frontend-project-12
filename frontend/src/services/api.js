import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import { setDefault } from '../slices/channelSlice';
import { toast } from 'react-toastify';
import i18n from '../i18next';

const socket = io();

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.status === 'FETCH_ERROR') {
      toast.error(i18n.t('notifications.connectionError'));
    }
  }
  return result;
};


export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling,
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
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        await cacheDataLoaded;

        socket.on('newChannel', (event) => {
          updateCachedData(draft => {
            draft.push(event);
          });
        });

        socket.on('removeChannel',(event) => {
          updateCachedData(draft => {
            return draft.filter((channel) => channel.id !== event.id);
          });
          dispatch(setDefault());
        });

        socket.on('renameChannel', (event) => {
          updateCachedData(draft => {
            const index = draft.findIndex(channel => channel.id === event.id);
            draft[index] = event;
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
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        await cacheDataLoaded;

        socket.on('newMessage', (event) => {
          updateCachedData(draft => {
            draft.push(event);
          });
        });

        socket.on('removeChannel', (event) => {
          updateCachedData(draft => {
            return draft.filter((message) => message.channelId !== event.id);
          });
        });
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
  useSignUpMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
  useGetMessagesQuery,
  usePostMessageMutation,
} = api;