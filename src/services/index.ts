export default async function request(URL: string, options: any) {
	const response = await fetch(URL, options);
	const data = await response.json();
	return data;
}
