import { getAllRanking } from '$utils/server/utils';

export async function load({ locals }) {
	return {
		streamed: {
			ranking: getAllRanking()
		}
	};
}
