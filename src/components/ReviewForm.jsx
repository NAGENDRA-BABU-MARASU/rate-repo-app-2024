import { useFormik } from 'formik';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

const initialValues = {
	repositoryOwnerName: '',
	repositoryName: '',
	rating: '',
	review: '',
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
	buttonContainer: {
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
	repositoryOwnerName: yup.string().required('Repository Owner name is required'),
	repositoryName: yup.string().required('Repository name is required'),
	rating: yup.number().required('Rating is required').integer().min(0).max(100),
	review: yup.string().optional(),
});

const ReviewForm = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [createReview, result] = useMutation(CREATE_REVIEW, {});
	const onSubmit = async () => {
		const { repositoryOwnerName: ownerName, repositoryName, rating, review: text } = formik.values;
		try {
			const { data } = await createReview({
				variables: {
					review: {
						ownerName,
						repositoryName,
						rating: parseInt(rating),
						text,
					},
				},
			});
      console.log(data);
      navigate(`/repositories/${data.createReview.repositoryId}`)
			setError(null);
		} catch (error) {
			setError(error.message);
			setTimeout(() => {
				setError(null);
			}, 5000);
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
				style={[styles.item, formik.errors.repositoryOwnerName && styles.redBorder]}
				placeholder="Repository owner name"
				value={formik.values.repositoryOwnerName}
				onChangeText={formik.handleChange('repositoryOwnerName')}
			/>
			{formik.touched.repositoryOwnerName && formik.errors.repositoryOwnerName && (
				<Text style={styles.error}>{formik.errors.repositoryOwnerName}</Text>
			)}
			<TextInput
				style={[styles.item, formik.errors.repositoryName && styles.redBorder]}
				placeholder="Repository name"
				value={formik.values.repositoryName}
				onChangeText={formik.handleChange('repositoryName')}
			/>
			{formik.touched.repositoryName && formik.errors.repositoryName && (
				<Text style={styles.error}>{formik.errors.repositoryName}</Text>
			)}
			<TextInput
				style={[styles.item, formik.errors.rating && styles.redBorder]}
				placeholder="Rating between 0 and 100"
				keyboardType="number-pad"
				value={formik.values.rating}
				onChangeText={formik.handleChange('rating')}
			/>
			{formik.touched.rating && formik.errors.rating && (
				<Text style={styles.error}>{formik.errors.rating}</Text>
			)}
			<TextInput
				multiline
				style={styles.item}
				placeholder="Review"
				value={formik.values.review}
				onChangeText={formik.handleChange('review')}
			/>
			{error && (
				<Text style={[styles.error, { textAlign: 'center', fontWeight: '900', fontSize: 15 }]}>{error}</Text>
			)}
			<Pressable onPress={formik.handleSubmit} style={styles.buttonContainer}>
				<Text style={styles.button}>Create a review </Text>
			</Pressable>
		</View>
	);
};

export default ReviewForm;
