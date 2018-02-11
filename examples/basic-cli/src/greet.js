import inquirer from "inquirer";
import chalk from "chalk";

export default async name => {
	if (name === undefined) {
		const answers = await inquirer.prompt([
			{ name: "name", message: "What is your name?" }
		]);
		name = answers.name;
	}

	console.log(`Hello ${chalk.blueBright(name)}!`);
};
