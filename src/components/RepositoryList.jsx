import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Searchbar, Text } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import theme from '../theme';

const searchBarStyles = StyleSheet.create({
	searchBar: {
		margin: 10,
		backgroundColor: 'white',
		borderColor: theme.colors.primary,
		borderRadius: 50,
		borderWidth: 1,
	},
});

export const itemSeperatorStyles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: 'rgb(230, 230, 230)',
	},
});

export const ItemSeparator = () => <View style={itemSeperatorStyles.separator} />;

const RepositoryFilter = ({ repositoryFilterText, handleFilterChange, loading }) => {
	const clearSearch = () => {
		handleFilterChange('');
	};

	return (
		<Searchbar
			mode="bar"
			value={repositoryFilterText}
			loading={loading}
			showDivider={false}
			style={searchBarStyles.searchBar}
			placeholder="search for repositories"
			onChangeText={handleFilterChange}
			onClearIconPress={clearSearch}
		/>
	);
};

const RepositorySortMenuPicker = ({ sortOrder, setSortOrder }) => {
	return (
		<Picker
			selectedValue={sortOrder}
			onValueChange={(itemValue, itemIndex) => {
				setSortOrder(itemValue);
			}}
		>
			<Picker.Item label="Latest repositories" value="latest" />
			<Picker.Item label="Highest rated repositories" value="highest" />
			<Picker.Item label="Lowest rated repositories" value="lowest" />
		</Picker>
	);
};

export const RepositoryListContainer = ({
	loading,
	repositories,
	handleFilterChange,
	sortOrder,
	setSortOrder,
	repositoryFilterText,
	onEndReach,
}) => {
	const navigate = useNavigate();
	const navigateToSingleView = (id) => {
		navigate(`/repositories/${id}`);
	};

	const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];
	const renderItem = (props) => {
		return (
			<Pressable onPress={() => navigateToSingleView(props.item.id)}>
				<RepositoryItem full={false} repository={props.item} />
			</Pressable>
		);
	};
	return (
		<FlatList
			data={repositoryNodes}
			ListHeaderComponent={
				<>
					<RepositoryFilter
						repositoryFilterText={repositoryFilterText}
						loading={loading}
						handleFilterChange={handleFilterChange}
					/>
					<RepositorySortMenuPicker sortOrder={sortOrder} setSortOrder={setSortOrder} />
				</>
			}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={renderItem}
			ListHeaderComponentStyle={{ zIndex: 1 }}
			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}
		/>
	);
};

const RepositoryList = () => {
	const [sortOrder, setSortOrder] = useState('latest');
	const [repositoryFilterText, setRepositoryFilterText] = useState('');
	const [debouncedFilter] = useDebounce(repositoryFilterText, 500);

	const orderBy = sortOrder === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE';
	const orderDirection = sortOrder === 'lowest' ? 'ASC' : 'DESC';

	const { repositories, fetchMore, loading } = useRepositories({
		first: 5,
		orderBy,
		orderDirection,
		searchKeyword: debouncedFilter,
	});

	const onEndReach = () => {
		fetchMore();
	};

	const handleFilterChange = (selectionValue) => {
		setRepositoryFilterText(selectionValue);
	};

	return (
		<RepositoryListContainer
			loading={loading}
			repositoryFilterText={repositoryFilterText}
			setSortOrder={setSortOrder}
			sortOrder={sortOrder}
			repositories={repositories}
			handleFilterChange={handleFilterChange}
			onEndReach={onEndReach}
		/>
	);
};

export default RepositoryList;
