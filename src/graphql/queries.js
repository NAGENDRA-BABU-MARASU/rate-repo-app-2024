import { gql } from '@apollo/client';

export const ME = gql`
	query Me {
		me {
			username
			id
		}
	}
`;

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					id
					name
					ownerName
					createdAt
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					forksCount
					ownerAvatarUrl
					description
					language
				}
				cursor
			}
		}
	}
`;
