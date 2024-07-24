import { isArray, isFunction } from "lodash";
import { workers } from "..";

export type Item = [string, (s: string) => string] | string;

interface LinesProps {
	width?: number;
	items?: Item[];
}
function splitString(str: string, size: number): string[] {
	const result = [];
	for (let i = 0; i < str.length; i += size) {
		result.push(str.slice(i, i + size));
	}
	return result;
}

export function line(props: LinesProps = {}): string {
	let { width = workers.ui.getColumns(), items = [" "] } = props;

	if (width < 20) width = 20;
	width = Math.floor(width);

	const newLine: string[] = [];

	newLine[0] = workers.figures.lineVertical;
	newLine[width - 1] = workers.figures.lineVertical;

	const lengthItems = items
		.map((item) => (isArray(item) ? item[0].concat(" ") : item.concat(" ")))
		.join("").length;

	if (lengthItems >= width - 2) {
		const concatenated = items
			.map((item, i) =>
				isArray(item)
					? item[0].concat("->").concat(i.toString())
					: item.concat("->").concat(i.toString()),
			)
			.join(";;;^");
		const spitedItems = splitString(concatenated, width - 4);

		const reRawItems = spitedItems.map((item) => item.split(";;;^"));

		let lastFindIndex = 0;

		const lines = reRawItems.map((raw) => {
			const newItems = raw.map((str) => {
				const [st, index] = str.split("->");

				if (index) {
					lastFindIndex = Number(index);
				}

				const fn = items[index ?? lastFindIndex + 1]?.[1];

				return isFunction(fn) ? [st, fn] : st;
			});

			const l = line({ ...props, items: newItems as Item[] });
			return l;
		});

		return lines.join("");
	}

	for (let index = lengthItems; index < width - 1; index++) {
		if (!newLine[index]) {
			newLine[index] = " ";
		}
	}

	let counter = 1;

	for (const item of items) {
		const itemIsArray = isArray(item);
		const str = itemIsArray ? item[0].concat(" ") : item.concat(" ");
		const fnstr = itemIsArray ? item[1] : null;
		const strArray = str.split("");

		for (const s of strArray) {
			newLine[counter] = fnstr ? fnstr(s) : s;
			counter++;
		}
	}

	return newLine.join("");
}
