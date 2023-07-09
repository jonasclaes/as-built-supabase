export const combineClasses = (...args: Array<string | null>): string => {
	if (args.length === 0) return '';

	let combinedString = '';

	combinedString = args.shift() || '';

	for (const arg of args) {
		if (arg === null || arg === '') continue;
		combinedString += ` ${arg}`;
	}

	return combinedString;
};
