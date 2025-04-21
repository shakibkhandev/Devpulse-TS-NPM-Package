# devpulse

A collection of TypeScript utility functions for common programming tasks.

## Installation

```bash
npm install devpulse
```

## Usage

```typescript
import {
  chunk,
  debounce,
  deepClone,
  randomString,
  groupBy,
  retry,
  formatCurrency,
  isEmpty,
} from "devpulse";

// Chunk an array
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const chunks = chunk(numbers, 3);
// Result: [[1, 2, 3], [4, 5, 6], [7, 8]]

// Debounce a function
const debouncedFn = debounce(() => console.log("Debounced!"), 1000);

// Deep clone an object
const obj = { a: 1, b: { c: 2 } };
const cloned = deepClone(obj);

// Generate a random string
const randomStr = randomString(10);
// Example: "aB3kP9mN2x"

// Group array by key
const users = [
  { id: 1, role: "admin" },
  { id: 2, role: "user" },
  { id: 3, role: "admin" },
];
const grouped = groupBy(users, "role");
// Result: { admin: [{id: 1, role: 'admin'}, {id: 3, role: 'admin'}], user: [{id: 2, role: 'user'}] }

// Retry a function
const result = await retry(
  async () => {
    // Your async operation here
    return await fetch("https://api.example.com");
  },
  3,
  1000
);

// Format currency
const amount = formatCurrency(1234.56);
// Result: "$1,234.56"

// Check if empty
console.log(isEmpty([])); // true
console.log(isEmpty("")); // true
console.log(isEmpty(null)); // true
console.log(isEmpty(undefined)); // true
console.log(isEmpty({})); // true
console.log(isEmpty([1, 2])); // false
```

## API Reference

### chunk<T>(arr: T[], size: number): T[][]

Splits an array into smaller arrays of specified size.

### debounce<T>(fn: T, delay: number): (...args: Parameters<T>) => void

Creates a debounced function that delays invoking the provided function until after `delay` milliseconds have elapsed since the last time it was invoked.

### deepClone<T>(obj: T): T

Creates a deep copy of an object or array.

### randomString(length: number, charset?: string): string

Generates a random string of specified length using the provided character set (defaults to alphanumeric).

### groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>

Groups an array of objects by a specified key.

### retry<T>(fn: () => Promise<T>, maxAttempts?: number, delay?: number): Promise<T>

Retries a function multiple times until it succeeds or reaches the maximum number of attempts.

### formatCurrency(amount: number, currency?: string, locale?: string): string

Formats a number as currency using the specified currency code and locale.

### isEmpty(value: unknown): boolean

Checks if a value is empty (null, undefined, empty string, empty array, or empty object).

## License

MIT
