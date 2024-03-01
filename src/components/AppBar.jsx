import { View, StyleSheet, Text as NativeText, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.backgroundColor,
	},
	appBarTab: {
		paddingTop: 25,
		paddingBottom: 25,
		paddingLeft: 15,
		color: '#FFF',
		fontFamily: theme.fonts.main,
	},
});

const AppBar = () => {
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const me = useQuery(ME);
	if (me.loading) {
		return (
			<View>
				<Text>Loading....</Text>
			</View>
		);
	}
	const signOut = () => {
		console.log('signing out');
		authStorage.removeAccessToken();
		apolloClient.resetStore();
	};
	return (
		<View style={styles.container}>
			{/* <Pressable>
			</Pressable> */}
			<ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
				<Link to="/">
					<Text fontSize="subheading" fontWeight="bold" style={styles.appBarTab}>
						Repositories
					</Text>
				</Link>
				{me.data.me ? (
					<Pressable onPress={signOut}>
						<Text fontSize="subheading" fontWeight="bold" style={styles.appBarTab}>
							Sign out
						</Text>
					</Pressable>
				) : (
					<Link to="signin">
						<Text fontSize="subheading" fontWeight="bold" style={styles.appBarTab}>
							Sign In
						</Text>
					</Link>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;
