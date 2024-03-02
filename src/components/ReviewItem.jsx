import { StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

export const reviewStyles = StyleSheet.create({
	reviewContainer: {
		flexDirection: 'row',
	},

	ratingContainer: {
		margin: 10,
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'blue',
		borderWidth: 2,
		borderColor: theme.colors.primary,
		borderRadius: 25,
	},

	rating: {
		fontSize: 22,
		backgroundColor: 'white',
		color: theme.colors.primary,
		fontWeight: '900'
	},

	reviewBody: {
		flexDirection: 'column',
		padding: 20,
		paddingTop: 12,
	},

	username: {
		fontSize: 16,
		fontWeight: '900',
	},

	textContainer: { flexDirection: 'row', width: '95%' },
	text: { flexShrink: 1 },
});

export function parseDateString(inputDateString) {
	const dateObject = new Date(inputDateString);
	const year = dateObject.getUTCFullYear();
	const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
	const day = String(dateObject.getUTCDate()).padStart(2, '0');
	const parsedDate = `${day}-${month}-${year}`;

	return parsedDate;
}

const ReviewItem = ({ review }) => {
	const { user } = review.node;
	return (
		<View style={reviewStyles.reviewContainer}>
			<View style={{ width: 50 }}>
				<View style={reviewStyles.ratingContainer}>
					<Text style={reviewStyles.rating}>{review.node.rating}</Text>
				</View>
			</View>
			<View style={reviewStyles.reviewBody}>
				<Text style={reviewStyles.username}>{user.username}</Text>
				<Text style={{ color: theme.colors.textSecondary }}>{parseDateString(review.node.createdAt)}</Text>
				<View style={reviewStyles.textContainer}>
					<Text style={reviewStyles.text}>{review.node.text}</Text>
				</View>
			</View>
		</View>
	);
};

export default ReviewItem;