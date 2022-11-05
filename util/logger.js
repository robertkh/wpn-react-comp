//?
import colors from "colors";
import tracer from "tracer";

//?
export const rl = tracer.colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.red /*  colors.bold */],
});

//?
export const bl = tracer.colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.blue /*  colors.bold */],
});

//?
export const yl = tracer.colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.yellow /*  colors.bold */],
});

//?
export const gl = tracer.colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.green /*  colors.bold */],
});

//?
export const ml = tracer.colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.magenta /*  colors.bold */],
});

//?
export const f_str = (msg) => {
	return "\n-------\n" + msg + "\n-------\n";
};
