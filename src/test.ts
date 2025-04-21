import {
  chunk,
  debounce,
  deepClone,
  formatCurrency,
  groupBy,
  isEmpty,
  randomString,
  retry,
} from "./index";

// Example 1: Using chunk
console.log("\n--- Chunk Example ---");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunkedArrays = chunk(numbers, 3);
console.log("Original array:", numbers);
console.log("Chunked into groups of 3:", chunkedArrays);

// Example 2: Using debounce
console.log("\n--- Debounce Example ---");
const debouncedLog = debounce((text: string) => {
  console.log(`Debounced log: ${text} at ${new Date().toISOString()}`);
}, 1000);

console.log("Calling debounced function multiple times...");
debouncedLog("First call");
debouncedLog("Second call");
debouncedLog("Third call"); // Only this one will be executed after 1 second

// Example 3: Using deepClone
console.log("\n--- Deep Clone Example ---");
const complexObject = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Boston",
    country: "USA",
  },
  hobbies: ["reading", "gaming"],
};
const clonedObject = deepClone(complexObject);
console.log("Original object:", complexObject);
console.log("Cloned object:", clonedObject);
console.log(
  "Are they equal?",
  JSON.stringify(complexObject) === JSON.stringify(clonedObject)
);
console.log("Are they the same reference?", complexObject === clonedObject);

// Example 4: Using randomString
console.log("\n--- Random String Example ---");
console.log("10 character random string:", randomString(10));
console.log(
  "5 character random string with custom charset:",
  randomString(5, "123456789ABCDEF")
);

// Example 5: Using groupBy
console.log("\n--- Group By Example ---");
const users = [
  { id: 1, role: "admin", name: "John" },
  { id: 2, role: "user", name: "Jane" },
  { id: 3, role: "admin", name: "Mike" },
  { id: 4, role: "user", name: "Sarah" },
];
const groupedUsers = groupBy(users, "role");
console.log("Users grouped by role:", groupedUsers);

// Example 6: Using retry
console.log("\n--- Retry Example ---");
let attempts = 0;
const simulateFailingRequest = async () => {
  attempts++;
  if (attempts < 3) {
    throw new Error(`Attempt ${attempts} failed`);
  }
  return "Success!";
};

retry(simulateFailingRequest, 3, 100)
  .then((result) => console.log("Retry result:", result))
  .catch((error) => console.error("Retry failed:", error));

// Example 7: Using formatCurrency
console.log("\n--- Format Currency Example ---");
console.log("USD:", formatCurrency(1234.56));
console.log("EUR:", formatCurrency(1234.56, "EUR", "de-DE"));
console.log("JPY:", formatCurrency(1234.56, "JPY", "ja-JP"));

// Example 8: Using isEmpty
console.log("\n--- Is Empty Example ---");
const emptyChecks = [
  [],
  {},
  "",
  null,
  undefined,
  [1, 2, 3],
  { name: "John" },
  "Hello",
  0,
];

emptyChecks.forEach((value) => {
  console.log(`isEmpty(${JSON.stringify(value)}):`, isEmpty(value));
});

// Run this file with: npx ts-node src/test.ts
