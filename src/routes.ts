import Quiz from './routes/quiz/+page.svelte';
import Home from './routes/+page.svelte';
import Categories from './routes/categories/+page.svelte';
import Main from './routes/main/+page.svelte';
import Register from './routes/register/+page.svelte';
// import NotFound from './routes/NotFound.svelte';

// not used this files
export const routes = {
	'/': Home,
	'/quiz': Quiz,
	'/category': Categories,
	'/main': Main,
	'/register': Register

	// Catch-all
	// This is optional, but if present it must be the last
	// '*': NotFound
};
