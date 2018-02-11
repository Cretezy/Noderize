import program from "commander";
import chalk from "chalk";
import greet from "./greet";
import fibonacci from "./fibonacci";

program.command("greet [name]").action(greet);

program.command("fibonacci [n]").action(fibonacci);

program.action(() => {
	console.log(chalk.yellowBright("\n  Command not found"));
	program.outputHelp();
	process.exit(1);
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp();
}
