import colors from "./colors.json";
import animals from "./animals.json";

// Generate a random name
export function generateName(){
	const color = colors[Math.floor(Math.random() * colors.length)];
	const animal = animals[Math.floor(Math.random() * colors.length)];
	return `${color} ${animal}`
}