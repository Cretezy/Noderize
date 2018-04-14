import build from "./scripts/build";
import start from "./scripts/start";
import test from "./scripts/test";
import watch from "./scripts/watch";
import format from "./scripts/format";
import clean from "./scripts/clean";
import lint from "./scripts/lint";
import { appLogger as log } from "./utils/logger";

const commands = {
	build,
	test,
	watch,
	format,
	start,
	clean,
	lint
};

const args = process.argv.slice(2);

const script = args.shift();

if (!Object.keys(commands).includes(script)) {
	log.warn(`Unknown script.`);
	process.exit(1);
} else {
	commands[script](args, process.argv);
}
