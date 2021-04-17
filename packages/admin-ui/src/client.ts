import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_END_POINT, DEFAULT_LANGUAGE_CODE } from '@junior-cms/common';

import { LOCAL_STORAGE_LANG } from './common/constants';
import { isDev } from './common/environment';

const link = new HttpLink({
  uri: `http://${isDev ? 'localhost:4000' : ''}/${API_END_POINT}`,
  credentials: 'include',
});

const cache = new InMemoryCache();

const langContext = setContext(async (_, { headers }) => {
  const lang = localStorage.getItem(LOCAL_STORAGE_LANG);

  return {
    headers: {
      ...headers,
      'Accept-language': lang || DEFAULT_LANGUAGE_CODE,
    },
  };
});

const client = new ApolloClient({
  link: langContext.concat(link),
  cache,
});

export default client;
