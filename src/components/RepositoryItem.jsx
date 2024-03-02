import { Image, StyleSheet, View, Text as NativeText, Pressable, Button } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flexDirection: 'column',
	},
	userImage: {
		width: 60,
		height: 60,
		padding: 10,
	},
	heading: {
		paddingLeft: 20,
		fontSize: theme.fontSizes.subheading,
		fontWeight: theme.fontWeights.bold,
	},
	button: {
		textAlign: 'center',
		width: '100%',
		height: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const cardHeaderStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexGrow: 1,
	},
	avatar: {
		width: 75,
		height: 75,
		borderRadius: 5,
	},
	avatarContainer: {
		flexGrow: 0,
		paddingTop: 5,
		paddingRight: 15,
	},
	infoContainer: {
		flexGrow: 1,
	},
	title: {
		fontSize: theme.fontSizes.subheading,
		fontWeight: theme.fontWeights.bold,
		paddingBottom: 2,
	},
	description: {
		color: theme.colors.textSecondary,
		paddingBottom: 5,
	},
	language: {
		padding: 5,
		color: '#FFFFFF',
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		marginRight: 'auto',
	},
});

const CardHeader = (props) => {
	return (
		<View style={cardHeaderStyles.container}>
			<View style={cardHeaderStyles.avatarContainer}>
				<Image style={cardHeaderStyles.avatar} source={{ uri: props.imageUrl }} />
			</View>
			<View style={cardHeaderStyles.infoContainer}>
				<Text style={cardHeaderStyles.title}>{props.title}</Text>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ flex: 1, flexWrap: 'wrap', ...cardHeaderStyles.description }}>
						{props.description}{' '}
					</Text>
				</View>
				<Text style={cardHeaderStyles.language}>{props.language}</Text>
			</View>
		</View>
	);
};

const CardFooterStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-around',
	},
	item: {
		padding: 10,
	},
	itemContainer: {
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
});

const CardFooter = (props) => {
	return (
		<View style={CardFooterStyles.container}>
			<View style={CardFooterStyles.item}>
				<View style={CardFooterStyles.itemContainer}>
					<Text style={{ fontWeight: theme.fontWeights.bold }}>{props.stars}k</Text>
					<Text style={{ color: theme.colors.textSecondary }}>Stars</Text>
				</View>
			</View>
			<View style={CardFooterStyles.item}>
				<View style={CardFooterStyles.itemContainer}>
					<Text style={{ fontWeight: theme.fontWeights.bold }}>{props.forks}k</Text>
					<Text style={{ color: theme.colors.textSecondary }}>Forks</Text>
				</View>
			</View>
			<View style={CardFooterStyles.item}>
				<View style={CardFooterStyles.itemContainer}>
					<Text style={{ fontWeight: theme.fontWeights.bold }}>{props.reviews}</Text>
					<Text style={{ color: theme.colors.textSecondary }}>Reviews</Text>
				</View>
			</View>
			<View style={CardFooterStyles.item}>
				<View style={CardFooterStyles.itemContainer}>
					<Text style={{ fontWeight: theme.fontWeights.bold }}>{props.rating}</Text>
					<Text style={{ color: theme.colors.textSecondary }}>Rating</Text>
				</View>
			</View>
		</View>
	);
};

const RepositoryItem = (props) => {
	const openToGithub = () => {
		Linking.openURL(props.repository.url);
	};

	return (
		<View style={styles.container}>
			<CardHeader
				imageUrl={props.repository.ownerAvatarUrl}
				title={props.repository.fullName}
				description={props.repository.description}
				language={props.repository.language}
			/>
			<CardFooter
				stars={(props.repository.stargazersCount / 1000.0).toPrecision(3)}
				forks={(props.repository.forksCount / 1000).toFixed(1)}
				reviews={props.repository.reviewCount}
				rating={props.repository.ratingAverage}
			/>
			{props.full && (
				<Pressable onPress={openToGithub}>
					<View style={[cardHeaderStyles.language, styles.button]}>
						<Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Open in Github</Text>
					</View>
				</Pressable>
			)}
		</View>
	);
};

export default RepositoryItem;

// const styles = StyleSheet.create({
// 	containerStyle: {
// 		padding: 20,
// 	},
// 	titleStyle: {
// 		fontWeight: '900',
// 		fontSize: 20,
// 	},
// 	contentStyle: {
// 		paddingLeft: 20,
// 		justifyContent: 'space-around',
// 	},
// 	headingStyle: {
// 		flexDirection: 'row',
// 	},
// 	avatarStyle: {
// 		width: 60,
// 		height: 60,
// 		borderRadius: 5,
// 	},
// 	languageStyle: {
// 		backgroundColor: theme.colors.primary,
// 		color: '#fff',
// 		// flexShrink: 1,
// 		// fontWeight: '900',
// 		marginLeft: 80,
// 		marginRight: 'auto',
// 		padding: 5,
// 		marginTop: 5,
// 		borderRadius: 5,
// 	},
// 	footerStyles: {
// 		flexDirection: 'row',
// 		padding: 10,
// 		justifyContent: 'space-around',
// 	},
// 	footerContentStyles: {
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// });

// function convertToKFormat(number) {
// 	if (number >= 1000) {
// 		return (number / 1000).toFixed(1) + 'k';
// 	}
// 	return number.toString();
// }

// const RepositoryItem = ({ data }) => {
// 	console.log(data);
// 	return (
// 		<View style={styles.containerStyle}>
// 			<View style={styles.headingStyle}>
// 				<Image style={styles.avatarStyle} source={{ uri: data.ownerAvatarUrl }} />
// 				<View style={styles.contentStyle}>
// 					<Text style={styles.titleStyle}>{data.fullName}</Text>
// 					<View style={{ width: '90%' }}>
// 						<NativeText style={{ fontSize: 14, color: theme.colors.textSecondary }}>
// 							{data.description}
// 						</NativeText>
// 					</View>
// 				</View>
// 			</View>
// 			<NativeText style={styles.languageStyle}>{data.language}</NativeText>
// 			<View style={styles.footerStyles}>
// 				<View style={styles.footerContentStyles}>
// 					<Text fontWeight="bold">{convertToKFormat(data.stargazersCount)}</Text>
// 					<Text color="textSecondary">Stars</Text>
// 				</View>

// 				<View style={styles.footerContentStyles}>
// 					<Text fontWeight="bold">{convertToKFormat(data.forksCount)}</Text>
// 					<Text color="textSecondary">Forks</Text>
// 				</View>
// 				<View style={styles.footerContentStyles}>
// 					<Text fontWeight="bold">{data.reviewCount}</Text>
// 					<Text color="textSecondary">Reviews</Text>
// 				</View>
// 				<View style={styles.footerContentStyles}>
// 					<Text fontWeight="bold">{data.ratingAverage}</Text>
// 					<Text color="textSecondary">Rating</Text>
// 				</View>
// 			</View>
// 		</View>
// 	);
// };

// export default RepositoryItem;
