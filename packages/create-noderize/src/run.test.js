import { run } from "./run";

describe("create error codes", () => {
	let oldProcess;
	let oldConsole;

	beforeAll(() => {
		// Save original
		oldProcess = process;
		oldConsole = console;
	});
	afterAll(() => {
		// Restore origin
		process = oldProcess;
		console = oldConsole;
	});
	beforeEach(() => {
		// Reset mock every test
		process = { ...process, exit: jest.fn() };
		console = { ...console, log: jest.fn(), warn: jest.fn(), error: jest.fn() };
	});

	test("errors when no path give", async () => {
		await run("");
		expect(console.warn).toBeCalled();
		expect(console.warn.mock.calls[0][0]).toMatch(/no path given/i);
		expect(process.exit).toBeCalled();
	});

	test("errors when path exist", async () => {
		await run("template"); // Use existing dir
		expect(console.warn).toBeCalled();
		expect(console.warn.mock.calls[0][0]).toMatch(/path exists/i);
		expect(process.exit).toBeCalled();
	});
});
