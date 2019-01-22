const str1 = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ+-'
const comlen = 3
let array1 = []
//split str1 into array of chars, put in array1
for (let x = 0, y=1; x < str1.length; x++,y++) {
	array1[x]=str1.substring(x, y)
}
let combi = []
let comIndex = []
//create index for N position char, where N = comlen
for (let j=0;j<comlen;j++) { comIndex[j] = 0 }


while (comIndex[comlen-1] < str1.length ) {
	let t = ''
	for (let j=0; j<comlen;j++) {
		t = t + array1[comIndex[j]]
	}
	comIndex[comlen-1]++
	for (let j=comlen-1; j>0; j--) {
		if (comIndex[j] > str1.length-1) {
			comIndex[j] = 0
			comIndex[j-1]++
		}
	}
	console.log(comIndex, t)
	combi.push(t)
}
console.log(combi)
return combi