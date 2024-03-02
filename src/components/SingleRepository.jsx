import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { SINGLE_REPOSITORY } from '../graphql/queries';
import { ItemSeparator, itemSeperatorStyles } from './RepositoryList';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {
	return <RepositoryItem full={true} repository={repository} />;
};

const SingleRepository = (props) => {
	const { id } = useParams();
	const variables = { 
		first: 2, 
		repositoryId: id
	}
	const { data, loading, fetchMore } = useQuery(SINGLE_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
		variables: variables,
	});

	if (loading) {
		return <Text>Loading ....</Text>;
	}


	const onEndReach = () => {
		const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				...variables
			},
		});
	};

	return (
		<FlatList
			data={data.repository.reviews.edges}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ItemSeparatorComponent={ItemSeparator}
			ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}
			// ListHeaderComponentStyle={itemSeperatorStyles.separator}
		/>
	);
	// const singleRepository = useQuery(SINGLE_REPOSITORY, {
	// 	fetchPolicy: 'cache-and-network',
	// 	variables: { repositoryId: id },
	// });
	// if (singleRepository.loading) {
	// 	return <Text>Loading ....</Text>;
	// }
	// return (
	// 	<FlatList
	// 		data={singleRepository.data.repository.reviews.edges}
	// 		renderItem={({ item }) => <ReviewItem review={item} />}
	// 		keyExtractor={({ id }) => id}
	// 		ItemSeparatorComponent={ItemSeparator}
	// 		ListHeaderComponent={() => <RepositoryInfo repository={singleRepository.data.repository} />}
	// 		// ListHeaderComponentStyle={itemSeperatorStyles.separator}
	// 	/>
	// );
};

export default SingleRepository;
