export async function loading(name: string) {
	const spinner = (
		await import("ora")
			.then((o) => o)
			.catch((err) => {
				throw err;
			})
	).default(name);

	spinner.start();
	return spinner;
}
