let operationList = [];
let linkList = [];
let count = 0;
let observer = null;

function emitChange() {
	observer(operationList, linkList);
}

export function observe(o) {
	if (observer) {
		throw new Error('Multiple observers not implemented.');
	}
	observer = o;
	emitChange();
}

export function addOperation(opType, opColor) {
	// Do sth.
	operationList.push({ x:210, y:10, opType:opType, opColor:opColor });
	emitChange();
	count++;
}

export function moveOperation(index, pos) {
	operationList[index]=pos;
	emitChange();
}

export function addLink(index_a, index_b) {
	if (index_a != index_b) {
		linkList.push({ a: index_a, b: index_b });
		emitChange();
	}
}
