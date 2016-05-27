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
	operationList.push({ x:210, y:10, opType:opType, opColor:opColor, opName:"New", opIndex:count });
	emitChange();
	count++;
}

export function moveOperation(index, newX, newY) {
	operationList = operationList.map((op) => (op.opIndex === index ? { ...op, x: newX, y: newY } : op));
	emitChange();
}

export function changeOperationName(index, newOpName) {
	operationList[index].opName = newOpName;
	operationList = operationList.map((op) => (op.opIndex === index ? { ...op, opName: newOpName } : op));
	emitChange();
}

function canAddLink(index_a, index_b) {
	if (index_a !== index_b) {
		let filtered = linkList.filter((link) => (link.a === index_a && link.b === index_b));
		return filtered.length === 0;
	}
	return false;
}

export function addLink(index_a, index_b) {
	if (canAddLink(index_a, index_b)) {
		linkList.push({ a: index_a, b: index_b });
		emitChange();
	} else {
		console.log("Cannot add link!");
	}
}

export function deleteOperation(index) {
	linkList = linkList.filter((link) => (link.a !== index && link.b !== index));
	operationList = operationList.filter((op) => (op.opIndex !== index));
	emitChange();
}
