import { gql } from '@apollo/client';

export const SIGNUP = gql`
	mutation Mutation($user: CreateUserInput) {
		createUser(user: $user) {
			createdAt
			id
			reviewCount
			username
		}
	}
`;

export const LOGIN = gql`
	mutation Mutation($credentials: AuthenticateInput) {
		authenticate(credentials: $credentials) {
			accessToken
			expiresAt
			user {
				username
			}
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation Mutation($review: CreateReviewInput) {
		createReview(review: $review) {
			createdAt
			id
			rating
			repositoryId
			user {
				username
			}
			userId
		}
	}
`;

export const DELETE_REVIEW = gql`
	mutation Mutation($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;
