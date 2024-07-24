import { ValueObject } from "./base/valueObject";
import type { Optional } from "./types/optional";

export enum OptionType {
	STRING = "string",
	LIST = "list",
	BOOLEAN = "boolean",
}

type OptionTypeRaw = "list" | "string" | "boolean";

interface OptionProps {
	name: string;
	description: string;
	long: string;
	type: OptionType | OptionTypeRaw;
	defaultValue: string | boolean | null | undefined;
	short: string | null;
	required: boolean;
	handler: ((...args: unknown[]) => void) | null;
}

export class Option extends ValueObject<OptionProps> {
	static create(
		props: Optional<
			OptionProps,
			"short" | "required" | "long" | "defaultValue" | "type" | "handler"
		>,
	) {
		const optionProps: OptionProps = {
			short: props.short ?? null,
			required: props.required ?? false,
			long:
				props.long?.toLowerCase() ??
				props.name.toLowerCase().replace(/\s+/g, "-"),
			defaultValue: props.defaultValue ?? undefined,
			type: props.type ?? "string",
			handler: props.handler ?? null,
			...props,
		};

		const options = new Option(optionProps);
		return options;
	}

	getFlags() {
		let flags = "";

		if (this.short) {
			flags = `-${this.short}, `;
		}

		flags += `--${this.long} `;

		if (this.type !== OptionType.BOOLEAN) {
			if (this.required) {
				flags += `<${this.long.toUpperCase()}${this.type === "list" ? "..." : ""}>`;
			}

			if (!this.required) {
				flags += `[${this.long.toUpperCase()}${this.type === "list" ? "..." : ""}]`;
			}
		}

		return flags;
	}

	get name() {
		return this.props.name;
	}

	get description() {
		return this.props.description;
	}

	get long() {
		return this.props.long;
	}

	get short() {
		return this.props.short;
	}

	get required() {
		return this.props.required;
	}

	get defaultValue() {
		return this.props.defaultValue;
	}

	get type() {
		return this.props.type;
	}

	get handler() {
		return this.props.handler;
	}
}
