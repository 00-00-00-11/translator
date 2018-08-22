module.exports = class {
	static merge(...arrays) {
		return [].concat(...arrays);
	}

	static seekAndDestroy(arr) {
		let args = [...arguments].splice(1);
		return arr.filter(el => !args.includes(el));
	}

	static dynamicSort(property) {
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}

	static pagify(array, items) {
		let loops = Math.ceil(arr.length / items);
		let pages = Array(loops).fill().map(() => arr.splice(0, items));
		return pages;
	}

	static format(seconds) {
		let pad = (s) => s < 10 ? '0' + s : '' + s;
		let types = [
			{time: Math.floor(seconds / (2678400 * 12)), word: "y"},
			{time: Math.floor(seconds % (2678400 * 12) / 2678400), word: "m"},
			{time: Math.floor(seconds % (86400 * 31) / (86400 * 7)), word: "w"},
			{time: Math.floor(seconds % (86400 * 7) / 86400), word: "d"},
			{time: Math.floor(seconds % 86400 / (60 * 60)), word: "h"},
			{time: Math.floor(seconds % (60 * 60) / 60), word: "m"},
			{time: Math.floor(seconds % 60), word: "s"}
		];
		let tempo = types.filter(x => x.time !== 0).map(x => pad(x.time) + x.word).join(' ');
		return tempo;
	}

	static charCount(str, type = 'all') {
		let initial = type == 'min' ? '' : '-';
		let chars = str.split('').filter((x, i) => str.split('').indexOf(x) == i).map(x => {return {char: x, count: 1}});
		str.split('').forEach((x, i, self) => {
			if (self.indexOf(x) !== i) {
				let index = chars.indexOf(chars.find(s => s.char == x));
				chars[index] = {char: x, count: chars[index].count + 1};
			}
		});
		return type == 'all' ? chars.sort(this.dynamicSort('-count')) : chars.sort(this.dynamicSort(initial + 'count'))[0];
	}

	static elementCount(array, type = 'all') {
		let initial = type == 'min' ? '' : '-';
		let elements = array.filter((x, i) => array.indexOf(x) == i).map(x => {return {element: x, count: 1}});
		array.forEach((x, i, self) => {
			if (self.indexOf(x) !== i) {
				let index = elements.indexOf(elements.find(s => s.element == x));
				elements[index] = {element: x, count: elements[index].count + 1};
			}
		});
		return type == 'all' ? elements.sort(this.dynamicSort('-count')) : elements.sort(this.dynamicSort(initial + 'count'))[0];
	}

	static min(arr) {
		return arr.reduce((a, b) => Math.min(a, b));
	}

	static max(arr) {
		return arr.reduce((a, b) => Math.max(a, b));
	}

	static capitalize(str) {
		return str.split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
	}

	static removeDuplicate(arr) {
		return arr.filter((x,i) => arr.indexOf(x) == i);
	}

	static shuffle(array) {
		let m = arr.length;
		while (m) {
			let i = Math.floor(Math.random() * m--);
			[arr[m], arr[i]] = [arr[i], arr[m]];
		}
		return arr;
	}

	static onlyType(arr, type) {
		return arr.filter(x => typeof x == type);
	}

	static allIndexes(arr, target) {
		let targetIndexes = [];
		arr.forEach((x, i) => { if (x == target) targetIndexes.push(i) });
		return targetIndexes;
	}

	static randomBetween(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
  
	static random(arr) {
		return arr[Math.floor(Math.random() * arr.length)]; 
	}

	static formatNumber(int) {
		let suffixes = [
			{suffix: 'K', min: 4, max: 6},
			{suffix: 'M', min: 7, max: 9},
			{suffix: 'B', min: 10, max: 13}
		];
		let suffix = suffixes.find(x => int.toString().length >= x.min || int.toString().length <= x.max).suffix;
		let sliceNumber = int.toString().length % 3 == 0 ? 3 : int.toString().length % 3;
		let rest = int.toString().slice(sliceNumber);
		let round = rest[0] == '0' ? '' : rest[1] >= 5 ? `.${parseInt(rest[0]) + 1}` : `.${rest[0]}`;
		let result = int.toString().slice(0, sliceNumber) + round + suffix;
		return result;
	}
}