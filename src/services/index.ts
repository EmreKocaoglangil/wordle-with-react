//interface Option

export default async function request(URL: string, options: any) {
	const response = await fetch(URL, options);
	const data = await response.json();
	return data;
	// try {
	// 	if (!response.ok) throw Error("HATA!");
	// 	if (!data) throw Error("JSON HATA!");
	// } catch (er) {
	// 	return er;
	// }
}
