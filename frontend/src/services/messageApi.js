import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
		}),
	}),
});

export const { useGetMessagesQuery } = messageApi;