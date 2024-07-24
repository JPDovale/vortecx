import { isArray, isFunction } from "lodash";
import { workers } from "..";
import type { Item } from "./line";

export enum LimiterLineType {
	TOP = "TOP",
	MIDDLE = "MIDDLE",
	BOTTOM = "BOTTOM",
}

interface LimiterLineProps {
	width?: number;
	title?: Item;
	type?: LimiterLineType;
}

export function limiterLine(props: LimiterLineProps = {}) {
	let {
		title = "",
		width = workers.ui.getColumns(),
		type = LimiterLineType.MIDDLE,
	} = props;

	if (width < 20) width = 20;
	width = Math.floor(width);

	const line: string[] = [];

	switch (type) {
		case LimiterLineType.TOP: {
			line[0] = workers.figures.lineDownRightArc;
			line[width - 1] = workers.figures.lineDownLeftArc;
			break;
		}

		case LimiterLineType.MIDDLE: {
			line[0] = workers.figures.lineUpDownRight;
			line[width - 1] = workers.figures.lineUpDownLeft;
			break;
		}

		case LimiterLineType.BOTTOM: {
			line[0] = workers.figures.lineUpRightArc;
			line[width - 1] = workers.figures.lineUpLeftArc;
			break;
		}
	}

	Array.from({ length: width - 2 }).forEach((_, i) => {
		line[i + 1] = workers.figures.line;
	});

	if (title) {
		const titleIsArray = isArray(title);
		const titleSplited = titleIsArray
			? title[0].split("").map((s) => {
					const fn = isFunction(title[1]) ? title[1] : null;

					if (fn) {
						return fn(s);
					}

					return s;
				})
			: (title as string).split("");

		const strs = [" ", ...titleSplited, " "];

		strs.forEach((str, i) => {
			line[i + 2] = str;
		});
	}

	return line.join("");
}
