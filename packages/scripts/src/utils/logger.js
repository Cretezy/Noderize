import consola from "consola";

export const appLogger = consola.withScope("app");
export const buildLogger = consola.withScope("build");
export const configLogger = consola.withScope("config");
export const copyLogger = consola.withScope("copy");
export const cleanLogger = consola.withScope("clean");
export const formatLogger = consola.withScope("format");
export const lintLogger = consola.withScope("lint");
export const startLogger = consola.withScope("start");
export const testLogger = consola.withScope("test");
export const watchLogger = consola.withScope("watch");

export function printLines(printMethod, lines, prefix = "") {
	lines.split("\n").forEach(line => printMethod(`${prefix}${line}`));
}
