import Constants from 'expo-constants';
import { Text, View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Navigate, Route, Routes } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		fontFamily: theme.fonts.main,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path="/" element={<RepositoryList />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</View>
	);
};

export default Main;
