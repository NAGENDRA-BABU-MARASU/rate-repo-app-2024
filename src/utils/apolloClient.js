import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import { relayStylePagination } from '@apollo/client/utilities';

const apollo_uri = Constants.expoConfig.extra.apollo_uri;

const httpLink = createHttpLink({
	uri: apollo_uri,
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				repositories: relayStylePagination(),
			},
		},
		Repository: {
			fields: {
				reviews: relayStylePagination(),
			},
		},
	},
});

const createApolloClient = (authStorage) => {
	const authLink = setContext(async (_, { headers }) => {
		try {
			const accessToken = await authStorage.getAccessToken();
			return {
				headers: {
					...headers,
					authorization: accessToken ? `Bearer ${accessToken}` : '',
				},
			};
		} catch (e) {
			console.log(e);
			return {
				headers,
			};
		}
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: cache,
	});
};

export default createApolloClient;
