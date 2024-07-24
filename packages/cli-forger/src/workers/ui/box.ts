import { workers } from "..";
import { LimiterLineType } from "./limiterLine";
import type { Item } from "./line";

interface BoxProps {
	title?: Item;
	width?: number;
	emptyLines?: Item[];
	isEmptyWith?: number;
	lines?: Item[][];
	sections?: {
		width?: number;
		title?: Item;
		lines?: Item[][];
		isEmptyWith?: number;
		emptyLines?: Item[];
	}[];
}

export function box(props: BoxProps = {}): string {
	const { ui } = workers;
	let {
		title,
		width = workers.ui.getColumns(),
		sections = [],
		lines = [],
		isEmptyWith = 0,
		emptyLines = ["Nothing here"],
	} = props;

	if (width < 20) width = 20;
	width = Math.floor(width);

	const box: string[] = [];

	box.push(
		ui.limiterLine({
			type: LimiterLineType.TOP,
			width,
			title,
		}),
	);

	if (sections.length === 0 && lines.length === 0) {
		box.push(ui.line({ width }));
	}

	if (lines.length > isEmptyWith) {
		for (const line of lines) {
			box.push(ui.line({ items: line, width }));
		}
	}

	for (const section of sections) {
		const lines = section.lines ?? [];
		const emptyLines = section.emptyLines ?? ["Nothing here"];
		const isEmptyWith = section.isEmptyWith ?? 0;

		box.push(
			ui.limiterLine({
				width: section.width ?? width,
				title: section.title,
				type: LimiterLineType.MIDDLE,
			}),
		);

		if (lines.length > isEmptyWith) {
			for (const l of lines) {
				box.push(
					ui.line({
						items: l,
						width: section.width ?? width,
					}),
				);
			}
		}

		if (lines.length <= isEmptyWith) {
			box.push(
				ui.line({
					items: emptyLines,
					width: section.width ?? width,
				}),
			);
		}
	}

	if (lines.length <= isEmptyWith) {
		box.push(ui.line({ items: emptyLines, width }));
	}

	box.push(
		ui.limiterLine({
			width,
			type: LimiterLineType.BOTTOM,
		}),
	);

	return box.join("\n");
}
