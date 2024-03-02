import Constants from 'expo-constants';
import { Text, View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Navigate, Route, Routes } from 'react-router-native';
import theme from '../theme';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import UserReviews from './UserReviews';

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
				<Route path="/repositories/:id" element={<SingleRepository />} />
				<Route path="/createReview" element={<ReviewForm />} />
				<Route path="/myReviews" element={<UserReviews />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/" element={<RepositoryList />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</View>
	);
};

export default Main;
