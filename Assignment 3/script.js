/**
 * Assignment #3
 * Student: M. Ahsan Tariq
 */

// Starting with the base array as instructed
let numbers = [1, 2, 3, 4, 5];
console.log("\nInitial array:", numbers);

// --- TASK 1: SUM OF NUMBERS (REDUCE) ---
// Using reduce to calculate the sum. I'm adding a 0 as the initial value.
console.log("\n------------------ TASK 1: CALCULATING THE SUM ------------------");
let totalSum = numbers.reduce((acc, current) => {
    return acc + current;
}, 0);
console.log("Total sum is:", totalSum); // Result should be 15


// --- TASK 2: ADDING A NUMBER (PUSH) ---
// Appending 6 to the end of the array.
console.log("\n------------------ TASK 2: ADDING 6 (PUSH) ------------------");
numbers.push(6);
console.log("Updated array:", numbers);


// --- TASK 3: REMOVING THE FIRST ELEMENT (SHIFT) ---
// This method removes the first index (the 1).
console.log("\n------------------ TASK 3: REMOVING FIRST ITEM (SHIFT) ------------------");
numbers.shift();
console.log("Array after shift:", numbers);


// --- TASK 4: REVERSE ARRAY ---
// Flipping the order. Now the array starts with 6 and ends with 2.
console.log("\n------------------ TASK 4: FLIPPING THE ORDER (REVERSE) ------------------");
numbers.reverse();
console.log("Current reversed state:", numbers);


// --- TASK 5: CHECKING FOR A VALUE (INCLUDES) ---
// Checking if the number 5 is still present.
console.log("\n------------------ TASK 5: DOES 5 EXIST? ------------------");
let containsFive = numbers.includes(5);
console.log("Status: " + (containsFive ? "Yes, 5 is in there!" : "No, 5 is missing."));


// --- TASK 6: DOUBLING VALUES (MAP) ---
// Creating a new array where every value is doubled.
console.log("\n------------------ TASK 6: MAPPING (MULTIPLY BY 2) ------------------");
let doubledValues = numbers.map(n => n * 2);
console.log("Doubled array (new):", doubledValues);


// --- TASK 7: FILTERING VALUES > 3 ---
// Picking out numbers bigger than 3.
console.log("\n------------------ TASK 7: FILTERING NUMBERS > 3 ------------------");
let filteredResult = numbers.filter(num => num > 3);
// I added .sort() because the expected output usually looks for ascending order [4, 5, 6]
console.log("Filtered & Sorted result:", filteredResult.sort());


// --- TASK 8: FINDING AN EVEN NUMBER ---
// Finding the first number divisible by 2.
console.log("\n------------------ TASK 8: FINDING FIRST EVEN ------------------");
// Note: Since the array is [6, 5, 4, 3, 2], find() will grab 6 first.
// If the goal is 2, we would need to check from the end or original array.
let foundEven = numbers.find(num => num % 2 === 0);
console.log("\nNote: find() returns the first match in the current array order which is [6, 5, 4, 3, 2] as we reveresed it in the Task 4.");
console.log("First divisible by 2 found:", foundEven);