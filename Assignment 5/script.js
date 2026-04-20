const users = [
    { name: "Alice", courses: ["Math", "Science", "English"] },
    { name: "Bob", courses: ["Math", "Art"] },
    { name: "Charlie", courses: ["Science", "Math", "History"] },
    { name: "David", courses: ["Math", "English"] },
    { name: "Eve", courses: ["Art", "Science"] }
];

console.log("Users and their courses:");
for (let i = 0; i < users.length; i++) {
    let user = users[i];
    console.log(`${user.name}: ${user.courses.join(", ")}`);
}

let courseCounts = {};

for (let i = 0; i < users.length; i++) {
    let studentCourses = users[i].courses;
    
    for (let j = 0; j < studentCourses.length; j++) {
        let course = studentCourses[j];
        
        if (courseCounts[course]) {
            courseCounts[course]++;
        } else {
            courseCounts[course] = 1;
        }
    }
}

let topCourseName = "";
let topCourseCount = 0;

console.log("\n--- Course Enrollment Report ---");
for (let course in courseCounts) {
    let count = courseCounts[course];

    let suffix = count === 1 ? " student" : " students";
    console.log(`${course}: ${count}${suffix}`);
    
    if (count > topCourseCount) {
        topCourseCount = count;
        topCourseName = course;
    }
}

console.log(`\nMost popular course: ${topCourseName} with ${topCourseCount} students`);