import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { API_END_POINT } from '@junior-cms/common';

import { isDev } from './common/environment';

const link = new HttpLink({
  uri: `http://${isDev ? 'localhost:4000' : ''}/${API_END_POINT}`,
  credentials: 'include',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;
