import inquirer from "inquirer";
import chalk from "chalk";

export default async n => {
	if (n === undefined) {
		const answers = await inquirer.prompt([
			{
				name: "n",
				message: "N?",
				validate(value) {
					if (/^\d+$/.test(value)) {
						// Is a number
						return true;
					} else {
						// Error message
						return "Value of n is not a positive integer.";
					}
				}
			}
		]);
		n = answers.n;
	}

	n = parseInt(n);

	if (isNaN(n) || n < 1) {
		console.log(chalk.yellowBright("Value of n is not a positive integer."));
		process.exit(1);
	}

	const value = fibonacci(n);
	console.log(
		`Fibonacci for n=${chalk.blueBright(n)} = ${chalk.blueBright(value)}!`
	);
};

// High performance fibonacci from https://medium.com/developers-writing/fibonacci-sequence-algorithm-in-javascript-b253dc7e320e
function fibonacci(num, memo = {}) {
	if (memo[num]) return memo[num];
	if (num <= 1) return 1;

	return (memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo));
}
