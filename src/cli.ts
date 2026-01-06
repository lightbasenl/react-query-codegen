#!/usr/bin/env node

import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { codegenerate } from "./index";
import type { OpenAPIConfig } from "./types/config";

const VERSION = "2.5.11";

const HELP = `
react-query-lightbase-codegen - Generate React Query clients from OpenAPI specs

USAGE:
  npx react-query-lightbase-codegen [options] <spec...> -o <output>
  npx react-query-lightbase-codegen --config <config-file>

ARGUMENTS:
  <spec...>           One or more OpenAPI spec files (local paths or URLs)

OPTIONS:
  -o, --output <dir>  Output directory for generated files (default: ./generated)
  -c, --config <file> Path to JSON config file
  -h, --help          Show this help message
  -v, --version       Show version number

EXAMPLES:
  # Single local spec
  npx react-query-lightbase-codegen ./api.yaml -o ./src/generated

  # Remote spec
  npx react-query-lightbase-codegen https://api.example.com/openapi.json -o ./generated

  # Multiple specs
  npx react-query-lightbase-codegen ./auth.yaml ./users.yaml -o ./generated

  # Using config file
  npx react-query-lightbase-codegen --config ./codegen.json

CONFIG FILE FORMAT:
  {
    "specSource": "./api.yaml",        // or ["./auth.yaml", "./users.yaml"]
    "exportDir": "./src/generated"
  }
`;

interface ParsedArgs {
	specs: string[];
	output: string;
	config?: string;
	help: boolean;
	version: boolean;
}

function parseArgs(args: string[]): ParsedArgs {
	const result: ParsedArgs = {
		specs: [],
		output: "./generated",
		help: false,
		version: false,
	};

	let i = 0;
	while (i < args.length) {
		const arg = args[i];

		switch (arg) {
			case "-h":
			case "--help":
				result.help = true;
				break;

			case "-v":
			case "--version":
				result.version = true;
				break;

			case "-o":
			case "--output":
				i++;
				if (i >= args.length) {
					throw new Error("Missing value for --output");
				}
				result.output = args[i];
				break;

			case "-c":
			case "--config":
				i++;
				if (i >= args.length) {
					throw new Error("Missing value for --config");
				}
				result.config = args[i];
				break;

			default:
				if (arg.startsWith("-")) {
					throw new Error(`Unknown option: ${arg}`);
				}
				result.specs.push(arg);
				break;
		}
		i++;
	}

	return result;
}

async function loadConfigFile(configPath: string): Promise<OpenAPIConfig> {
	try {
		const content = await readFile(configPath, "utf-8");
		const config = JSON.parse(content);

		if (!config.specSource) {
			throw new Error("Config file must contain 'specSource'");
		}
		if (!config.exportDir) {
			throw new Error("Config file must contain 'exportDir'");
		}

		return {
			specSource: config.specSource,
			exportDir: resolve(process.cwd(), config.exportDir),
		};
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to load config file: ${error.message}`);
		}
		throw new Error("Failed to load config file");
	}
}

function resolveSpecPath(spec: string): string {
	// Keep URLs as-is
	if (spec.startsWith("http://") || spec.startsWith("https://")) {
		return spec;
	}
	// Resolve local paths relative to cwd
	return resolve(process.cwd(), spec);
}

async function main(): Promise<void> {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.log(HELP);
		process.exit(0);
	}

	let parsed: ParsedArgs;
	try {
		parsed = parseArgs(args);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error: ${error.message}`);
		}
		console.error("Use --help for usage information");
		process.exit(1);
	}

	if (parsed.help) {
		console.log(HELP);
		process.exit(0);
	}

	if (parsed.version) {
		console.log(`react-query-lightbase-codegen v${VERSION}`);
		process.exit(0);
	}

	let config: OpenAPIConfig;

	if (parsed.config) {
		// Load from config file
		config = await loadConfigFile(parsed.config);
	} else {
		// Build config from CLI args
		if (parsed.specs.length === 0) {
			console.error("Error: No spec files provided");
			console.error("Use --help for usage information");
			process.exit(1);
		}

		const resolvedSpecs = parsed.specs.map(resolveSpecPath);

		config = {
			specSource: resolvedSpecs.length === 1 ? resolvedSpecs[0] : resolvedSpecs,
			exportDir: resolve(process.cwd(), parsed.output),
		};
	}

	try {
		console.log("Generating API client...");
		console.log(
			`  Specs: ${Array.isArray(config.specSource) ? config.specSource.join(", ") : config.specSource}`
		);
		console.log(`  Output: ${config.exportDir}`);
		console.log("");

		await codegenerate(config);

		console.log("Generation complete!");
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error: ${error.message}`);
		} else {
			console.error("An unknown error occurred");
		}
		process.exit(1);
	}
}

main();
