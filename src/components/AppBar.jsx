import { View, StyleSheet, Text as NativeText, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

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
				<Link to="signin">
					<Text fontSize="subheading" fontWeight="bold" style={styles.appBarTab}>
						Sign In
					</Text>
				</Link>
			</ScrollView>
		</View>
	);
};

export default AppBar;
