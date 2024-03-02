import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import { reviewStyles } from './ReviewItem';
import { parseDateString } from './ReviewItem';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const myReviewItemStyles = StyleSheet.create({
	buttonContainer: {
		borderColor: '#BBBABA',
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 15,
		padding: 10,
		flexDirection: 'row',
		backgroundColor: '#2A6EEC',
		marginBottom: 10,
	},
	button: {
		fontSize: theme.fontSizes.subheading,
		color: '#FFFFFF',
		padding: 5,
		marginRight: 'auto',
		marginLeft: 'auto',
		fontWeight: '900',
	},
	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
});

const MyReviewItem = ({ review, refetch }) => {
	const navigate = useNavigate();
	const [deleteReviewMutation, result] = useMutation(DELETE_REVIEW);

	const goToRepository = (repositoryUrl) => {
		navigate(`/repositories/${repositoryUrl}`);
	};

	const deleteReview = (reviewId) => {
		Alert.alert('Delete Review', 'are you sure you want to delete this review ? ', [
			{ text: 'cancel', style: 'cancel' },
			{
				text: 'delete',
				onPress: async () => {
					try {
						await deleteReviewMutation({
							variables: {
								deleteReviewId: reviewId,
							},
						});
						refetch();
					} catch (error) {
						console.log('error occurred while delete review ', error);
					}
				},
			},
		]);
	};

	return (
		<>
			<View style={reviewStyles.reviewContainer}>
				<View style={{ width: 50 }}>
					<View style={reviewStyles.ratingContainer}>
						<Text style={reviewStyles.rating}>{review.rating}</Text>
					</View>
				</View>
				<View style={reviewStyles.reviewBody}>
					<Text style={{ color: theme.colors.textSecondary }}>{parseDateString(review.createdAt)}</Text>
					<View style={reviewStyles.textContainer}>
						<Text style={reviewStyles.text}>{review.text}</Text>
					</View>
				</View>
			</View>
			<View style={myReviewItemStyles.footerContainer}>
				<Pressable
					onPress={() => goToRepository(review.repositoryId)}
					style={myReviewItemStyles.buttonContainer}
				>
					<Text style={myReviewItemStyles.button}>View repository</Text>
				</Pressable>
				<Pressable
					onPress={() => deleteReview(review.id)}
					style={[myReviewItemStyles.buttonContainer, { backgroundColor: 'tomato' }]}
				>
					<Text style={[myReviewItemStyles.button]}>Delete review</Text>
				</Pressable>
			</View>
		</>
	);
};

const ItemSeparator = () => <View style={{ height: 10, backgroundColor: 'lightgray' }} />;

const UserReviews = () => {
	const { loading, data, refetch } = useQuery(ME, {
		fetchPolicy: 'cache-and-network',
		variables: { includeReviews: true },
	});

	if (loading) {
		return (
			<View>
				<Text>Loading....</Text>
			</View>
		);
	}

	console.log('data received:', data.me.reviews.edges);

	const reviewNodes = data ? data.me.reviews.edges.map((edge) => edge.node) : [];
	if (reviewNodes.length === 0) {
		return (
			<View>
				<Text style={{ textAlign: 'center' }}> No reviews yet </Text>
			</View>
		);
	}

	return (
		<View>
			<FlatList
				style={{ marginBottom: 110 }}
				data={reviewNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => <MyReviewItem refetch={refetch} review={item} />}
			/>
		</View>
	);
};

export default UserReviews;
