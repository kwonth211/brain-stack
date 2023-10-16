import { sql } from '@vercel/postgres';

export async function GET() {
	const { rows: quizzes } = await sql`SELECT * FROM quizzes`;

	const urls = quizzes.map((quiz) => `/quiz/${quiz.id}`);

	const urlElements = urls
		.map(
			(url) => `
        <url>
			<loc>https://dual-brain.com${url}</loc>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
    `
		)
		.join('');

	return new Response(
		`
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
            ${urlElements}
        </urlset>
        `.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
