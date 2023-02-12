export const code1 = 
`let fruits = ['apple', 'banana', 'mango', 'orange'];
let searchTerm = 'mango';

let i = 0;
while (i < fruits.length) {
    if (fruits[i] === searchTerm) {
    console.log("Found" + searchTerm +" at index" + i);
    break;
    }
    i++;
}
`

