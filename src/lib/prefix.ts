export const prefixClass = (_prefix: string, _class: string | null): string => {
	if (_class === '') return '';
	return _prefix + _class;
};
