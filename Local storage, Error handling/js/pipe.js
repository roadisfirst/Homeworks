function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

const pipe = (value, ...funcs) => {
	if(funcs.length === 0){ 
		return value;
	}
	let position = 0;
	try {
		for (let elem of funcs){
			if (!isFunction(elem)) {
				throw 'Provided argument at position ' + position + ' is not a function';
			}
			value = elem(value);
			++position;
		}
		return value;
	} catch (e) {
		return e;
	}
};

const replaceUnderscoreWithSpace = (value) => value.replace(/_/g, ' ');
const capitalize = (value) =>
	value
		.split(' ')
		.map((val) => val.charAt(0).toUpperCase() + val.slice(1))
		.join(' ');
const appendGreeting = (value) => `Hello, ${value}!`;

// const error = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, '');

// alert(error); // Provided argument at position 2 is not a function!

// const result = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, appendGreeting);

// alert(result); // Hello, John Doe!
