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
	operationList[index].x=pos.x;
	operationList[index].y=pos.y;
	emitChange();
}

function canAddLink(index_a, index_b) {
	if (index_a != index_b) {
		for (let i = 0; i < linkList.length; i++) {
			let a = linkList[i].a;
			let b = linkList[i].b;
			if (a === index_a && b === index_b) {
				return false;
			}
		}
		return true;
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
