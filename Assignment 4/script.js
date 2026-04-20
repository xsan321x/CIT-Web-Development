console.log("TASK 1: GET DAY NAME USING (SWITCH)");

function getDayName(dayNumber) {
    switch (dayNumber) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        case 7: return "Sunday";
        default: return "Invalid day number";
    }
}
console.log("Day Number 3 corresponds to: " + getDayName(3));
console.log("Day Number 8 corresponds to: " + getDayName(8));


console.log("TASK 2: USING WHILE LOOP (1-10)");

function printOneToTen() {
    let i = 1;
    let result = [];
    while (i <= 10) {
        result.push(i);
        i++;
    }
    console.log(result.join(", "));
}

printOneToTen();


console.log("TASK 3: USING DO WHILE LOOP (10-1)");

function printTenToOne() {
    let i = 10;
    let result = [];
    do {
        result.push(i);
        i--;
    } while (i >= 1);
    console.log(result.join(", "));
}

printTenToOne();