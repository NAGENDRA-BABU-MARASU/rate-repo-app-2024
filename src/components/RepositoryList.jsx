import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: 'rgb(200, 200, 200)',
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
	const { repositories } = useRepositories();

	const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];
	const renderItem = (props) => {
		return <RepositoryItem repository={props.item} />;
	};
	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={renderItem}
			// other props
		/>
	);
};

export default RepositoryList;
