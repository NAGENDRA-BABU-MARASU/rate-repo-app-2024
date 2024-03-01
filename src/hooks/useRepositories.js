import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = () => {
	// const [repositories, setRepositories] = useState();
	const result = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
	});
	const loading = result.loading;
	const repositories = result.data ? result.data.repositories : undefined;

	return { repositories, loading };
};

export default useRepositories;
