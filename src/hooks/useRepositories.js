import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';
const useRepositories = (variables) => {
	const [repositories, setRepositories] = useState();
	const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables: variables,
		onCompleted: (data) => setRepositories(data.repositories),
	});

	if (error) {
		console.log(error);
	}

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables,
			},
		});
	};

	return { repositories: data?.repositories, loading, fetchMore: handleFetchMore };
};

export default useRepositories;
