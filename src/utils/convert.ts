import type { QueryResultRow } from '@vercel/postgres';

export const serveToClient = (rows: QueryResultRow[]) => {
	return rows.map((row) => {
		return Object.entries(row).reduce((acc, [key, value]) => {
			const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
			acc[camelCaseKey] = value;
			return acc;
		}, {} as QueryResultRow);
	});
};

export const snackCaseToCamelCase = (str: string) => {
	return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};
