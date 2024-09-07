import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from 'socket.io-client';

const socket = io();
export const messageApi = createApi({
	reducerPath: 'messagesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/v1/messages',
		prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
	}),
	endpoints: (builder) => ({
		getMessages: builder.query({
			query: () => '',
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
				method: 'POST',
        body: message,
			}),
		})
	}),
});

export const { useGetMessagesQuery, usePostMessageMutation } = messageApi;