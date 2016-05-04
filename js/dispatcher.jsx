let operationList = [];
let count = 0;
let observer = null;

function emitChange() {
	observer(operationList);
}

export function observe(o) {
	if (observer) {
		throw new Error('Multiple observers not implemented.');
	}
	observer = o;
	emitChange();
}

export function addOperation() {
	// Do sth.
	operationList.push(count++);
	emitChange();
}
