import { Text as NativeText, Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
const initialValues = {
	username: '',
	password: '',
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
	signInText: {
		fontSize: theme.fontSizes.subheading,
		fontWeight: theme.fontWeights.bold,
		color: '#FFFFFF',
		padding: 5,
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	redBorder: {
		borderColor: 'red',
	},
});

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
});

const SignIn = () => {
	const onSubmit = (values) => {
		if (values.username != '' && values.password != '') {
			console.log(values);
		}
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
				placeholder="username"
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
			/>
			{formik.touched.username && formik.errors.username && (
				<NativeText style={styles.error}>{formik.errors.username}</NativeText>
			)}
			<TextInput
				secureTextEntry
				style={[styles.item, formik.errors.password && styles.redBorder]}
				placeholder="password"
				value={formik.values.password}
				onChangeText={formik.handleChange('password')}
			/>
			{formik.touched.password && formik.errors.password && (
				<NativeText style={styles.error}>{formik.errors.password}</NativeText>
			)}
			<Pressable onPress={formik.handleSubmit} style={styles.signInBtn}>
				<Text style={styles.signInText}>Sign In </Text>
			</Pressable>
		</View>
	);
};

export default SignIn;
