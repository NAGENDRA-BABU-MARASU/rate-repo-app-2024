import { gql } from '@apollo/client';

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
