/**
 * Assignment #2 - JS Basics
 * Student: M. Ahsan Tariq
 */

// ==========================================
// PART 1: BASICS & VARIABLES
// ==========================================

// Task 1: Setting up my info
// I used 'const' for my name since it doesn't change, but 'let' for age just in case.
const myFullName = "M. Ahsan Tariq";
let myCurrentAge = 22; 
let amIStudent = true; 

console.log("--- Student Profile ---");
console.log("Name: " + myFullName);
console.log("Age: " + myCurrentAge);
console.log(`My name is ${myFullName}. I am ${myCurrentAge} years old. Student: ${amIStudent}`);

// Task 2: Testing Data Types
// Just checking how JS handles different types. 
// Interesting: 'null' shows up as an object, which I read is an old JS bug.
let textData = "Learning JavaScript"; 
let numericalData = 99;               
let logicData = true;               
let notDefined;                      
let emptyData = null;                

console.log("\n--- Checking Types ---");
console.log("String check:", typeof textData);
console.log("Number check:", typeof numericalData);
console.log("Boolean check:", typeof logicData);
console.log("Undefined check:", typeof notDefined);
console.log("Null check:", typeof emptyData); 


// Task 3: Simple Calculator
// Trying out basic math operators with a couple of variables.
let a = 20;
let b = 5;


console.log("\n--- Calculator Results ---");
console.log("Numbers: Num1 = " + a + ", Num2 = " + b);
console.log(`Sum: ${a + b}`);
console.log(`Difference: ${a - b}`);
console.log(`Product: ${a * b}`);
console.log(`Quotient: ${a / b}`);


// Task 4: Temp Conversion
// Using the math formula (C * 9/5) + 32 to get Fahrenheit.
let celsius = 28; 
let fahrenheit = (celsius * 9/5) + 32;

console.log("\n--- Temperature ---");
console.log("Todays Temperature In Celsius: " + celsius);
console.log("And " + celsius + " degrees Celsius is " + fahrenheit + " in Fahrenheit.");


// ==========================================
// PART 2: WORKING WITH CONDITIONS
// ==========================================

// Task 5: Odd or Even?
// Using the % (modulo) operator to see if there's a remainder.
let myNumber = 13;
console.log("\n--- Odd/Even Test ---");
console.log("The number to check is: " + myNumber);
if (myNumber % 2 === 0) {
    console.log(myNumber + " is even.");
} else {
    console.log(myNumber + " is odd.");
}


// Task 6: Grading Logic
// Simple if-else chain to figure out the grade based on marks.
let score = 85;
console.log("The score to check is: " + score + " out of 100.");

let grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "Fail";
}
console.log("\n--- Grade Results ---");
console.log("Score: " + score + " Grade: " + grade);


// Task 7: Can I vote?
// Standard check to see if age is 18 or older.
let ageToCheck = 19;

console.log("\n--- Voting Check ---");
console.log("The age to check is: " + ageToCheck);
if (ageToCheck >= 18) {
    console.log("The user is old enough to vote.");
} else {
    console.log("The user is too young to vote.");
}


// ==========================================
// PART 3: REPETITION (LOOPS)
// ==========================================

// Task 8: Basic For-Loop
// Counting from 1 up to 10.
console.log("\n--- Counting 1-10 ---");
for (let x = 1; x <= 10; x++) {
    console.log("Count is at: " + x);
}


// Task 9: Multiplication Table
// I'll use the table of 8 for this one.
let tableOf = 8; 
console.log("\n--- Table of " + tableOf + " ---");
for (let i = 1; i <= 10; i++) {
    // Calculating the product inside the log for simplicity
    console.log(`${tableOf} x ${i} = ${tableOf * i}`);
}