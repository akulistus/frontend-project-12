import api from './api';
import routes from '../helpers/routes';

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: routes.loginApiPath(),
        method: 'POST',
        body: user,
      }),
    }),
    signUp: builder.mutation({
      query: (newUser) => ({
        url: routes.signupApiPath(),
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
} = loginApi;
