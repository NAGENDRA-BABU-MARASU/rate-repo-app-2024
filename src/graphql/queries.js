import { gql } from '@apollo/client';

export const ME = gql`
	query getCurrentUser($includeReviews: Boolean = false) {
		me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						repository {
							fullName
						}
						user {
							username
						}
						id
						repositoryId
						rating
						createdAt
						text
						repository {
							fullName
						}
					}
				}
			}
		}
	}
`;

export const SINGLE_REPOSITORY = gql`
	query singleRepository($repositoryId: ID!, $first: Int, $after: String) {
		repository(id: $repositoryId) {
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
			url
			reviews(first: $first, after: $after) {
				edges {
					node {
						createdAt
						id
						rating
						text
						user {
							username
							id
						}
					}
					cursor
				}
				pageInfo {
					hasNextPage
					endCursor
				}
			}
		}
	}
`;

export const GET_REPOSITORIES = gql`
	query (
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
		$searchKeyword: String
		$first: Int
		$after: String
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
			first: $first
			after: $after
		) {
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
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}
`;
