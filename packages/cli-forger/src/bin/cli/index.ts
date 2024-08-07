import { Command } from "src/command";
import { Option } from "src/option";
import pack from "../../../package.json";
import { CliForger } from "../../main";

const cli = new CliForger({
	name: "CliForger",
	version: pack.version,
	description: "A framework to create cli's",
});

const initCommand = Command.create<{
	folder?: string | null;
}>({
	name: "init",
	description: "Init a project with cli forger",
	options: [
		Option.create({
			name: "Folder",
			short: "f",
			long: "folder",
			required: false,
			description: "Define a folder to create project",
		}),
	],
});

initCommand.addHandler(async ({ workers, args }) => {
	const { folder } = args;
	const res = await workers.prompt
		.ask<{ name: string }>([
			{
				name: "name",
				required: true,
				type: "input",
				message: "Project name",
			},
		])
		.catch(() => {
			workers.logger.exit.info("Canceled");
			process.exit(0);
		});

	const name = res.name
		.replace(/[<>:"\/\\|?*\x00-\x1F]/g, "") // Remove caracteres inválidos no Windows
		.replace(/[\x7F]/g, "") // Remove o caractere DEL
		.replace(/^\.+$/, "") // Remove nomes reservados no Windows (., ..)
		.replace(/[.\s]+$/g, "") // Remove espaços e pontos do final da string
		.replace(/\s+/g, "_");

	const initProjectPath = workers.path.getPath([
		folder ?? workers.path.getCurrentPath(),
		name,
	]);

	const existsFile = await workers.files.exists([
		initProjectPath,
		"package.json",
	]);
	if (existsFile) {
		workers.logger.exit.error("Project already exist in this folder");
	}

	await workers.folders.createIfNotExists(initProjectPath, {
		exitOnExists: false,
	});

	const templatesPath = workers.path.getPath([__dirname, "cli", "templates"]);

	await workers.templates.save(
		[templatesPath, "package.json.vort"],
		[initProjectPath, "package.json"],
		{ name },
	);

	await workers.templates.save(
		[templatesPath, "eslintrc.vort"],
		[initProjectPath, ".eslintrc"],
	);

	await workers.templates.save(
		[templatesPath, "tsconfig.json.vort"],
		[initProjectPath, "tsconfig.json"],
	);

	await workers.templates.save(
		[templatesPath, "gitignore.vort"],
		[initProjectPath, ".gitignore"],
	);

	await workers.templates.save(
		[templatesPath, "npmrc.vort"],
		[initProjectPath, ".npmrc"],
	);

	await workers.templates.save(
		[templatesPath, "tsup.config.js.vort"],
		[initProjectPath, "tsup.config.js"],
	);

	await workers.folders.createIfNotExists([initProjectPath, "src"], {
		exitOnExists: false,
	});

	await workers.folders.createIfNotExists(
		[initProjectPath, "src", "templates"],
		{
			exitOnExists: false,
		},
	);

	await workers.templates.save(
		[templatesPath, "index.ts.vort"],
		[initProjectPath, "src", "index.ts"],
	);

	await workers.templates.save(
		[templatesPath, "cli.ts.vort"],
		[initProjectPath, "src", "cli.ts"],
		{ name },
	);

	const loading = await workers.prompt.loading("Installing libs");

	workers.prompt.executeInFolder(
		initProjectPath,
		"npm i @vortecx/cli-forger && npm i --save-dev @vortecx/eslint-config @types/node tsup typescript @swc/core",
	);

	workers.prompt.executeInFolder(
		initProjectPath,
		'git init -b "main" && git add . && git commit -m "first commit"',
	);

	loading.stop();
});

cli.addDefaultCommand(initCommand);

export default cli;
