import { useFormik } from 'formik';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW, SIGNUP } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

const initialValues = {
	username: '',
	password: '',
	confirmPassword: '',
};

const styles = StyleSheet.create({
	item: {
		borderColor: '#BBBABA',
		marginTop: 15,
		marginLeft: 15,
		marginRight: 20,
		borderWidth: 1,
		borderRadius: 5,
		padding: 15,
	},
	error: {
		paddingLeft: 15,
		paddingTop: 10,
		color: 'red',
	},
	signInBtn: {
		borderColor: '#BBBABA',
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 20,
		padding: 15,
		flexDirection: 'row',
		backgroundColor: '#2A6EEC',
	},
	button: {
		fontSize: theme.fontSizes.subheading,
		color: '#FFFFFF',
		padding: 5,
		marginRight: 'auto',
		marginLeft: 'auto',
		fontWeight: '900',
	},
	redBorder: {
		borderColor: 'red',
	},
});

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(5, 'Username must be at least 5 characters')
		.max(30, 'Username must be at most 30 characters'),
	password: yup
		.string()
		.required('Password is required')
		.min(5, 'Password must be at least 5 characters')
		.max(50, 'Password must be at most 50 characters'),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUpForm = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [signUp, result] = useMutation(SIGNUP, {});
	const onSubmit = async () => {
		console.log('signing up');
		const { username, password } = formik.values;
		try {
			await signUp({
				variables: {
					user: {
						username,
						password,
					},
				},
			});
      navigate('/');
		} catch (error) {
			setError(error.message);
			setTimeout(() => {
				setError(null);
			}, 5000);
		}
		// const { repositoryOwnerName: ownerName, repositoryName, rating, review: text } = formik.values;
		// try {
		// 	const { data } = await createReview({
		// 		variables: {
		// 			review: {
		// 				ownerName,
		// 				repositoryName,
		// 				rating: parseInt(rating),
		// 				text,
		// 			},
		// 		},
		// 	});
		// 	console.log(data);
		// 	navigate(`/repositories/${data.createReview.repositoryId}`);
		// 	setError(null);
		// } catch (error) {
		// 	setError(error.message);
		// 	setTimeout(() => {
		// 		setError(null);
		// 	}, 5000);
		// }
	};
	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	return (
		<View>
			<TextInput
				style={[styles.item, formik.errors.username && styles.redBorder]}
				placeholder="Enter your username"
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
			/>
			{formik.touched.username && formik.errors.username && (
				<Text style={styles.error}>{formik.errors.username}</Text>
			)}
			<TextInput
				secureTextEntry
				style={[styles.item, formik.errors.password && styles.redBorder]}
				placeholder="Enter your password"
				value={formik.values.password}
				onChangeText={formik.handleChange('password')}
			/>
			{formik.touched.password && formik.errors.password && (
				<Text style={styles.error}>{formik.errors.password}</Text>
			)}
			<TextInput
				secureTextEntry
				style={[styles.item, formik.errors.confirmPassword && styles.redBorder]}
				placeholder="confirm your password"
				value={formik.values.confirmPassword}
				onChangeText={formik.handleChange('confirmPassword')}
			/>
			{formik.touched.confirmPassword && formik.errors.confirmPassword && (
				<Text style={styles.error}>{formik.errors.confirmPassword}</Text>
			)}

			{error && (
				<Text style={[styles.error, { textAlign: 'center', fontWeight: '900', fontSize: 15 }]}>{error}</Text>
			)}
			<Pressable onPress={formik.handleSubmit} style={styles.signInBtn}>
				<Text style={styles.button}>Sign up </Text>
			</Pressable>
		</View>
	);
};

export default SignUpForm;
