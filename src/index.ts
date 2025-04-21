/**
 * A collection of utility functions for common programming tasks
 */

/**
 * Chunks an array into smaller arrays of specified size
 * @param arr The array to chunk
 * @param size The size of each chunk
 * @returns Array of chunks
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

/**
 * Debounces a function call
 * @param fn Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Deep clones an object
 * @param obj Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }

  const entries = Object.entries(obj as Record<string, unknown>).map(
    ([key, value]) => [key, deepClone(value)]
  );
  return Object.fromEntries(entries) as T;
}

/**
 * Generates a random string of specified length
 * @param length Length of the string
 * @param charset Characters to use (default: alphanumeric)
 * @returns Random string
 */
export function randomString(
  length: number,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
): string {
  return Array.from({ length }, () =>
    charset.charAt(Math.floor(Math.random() * charset.length))
  ).join("");
}

/**
 * Groups an array of objects by a key
 * @param arr Array to group
 * @param key Key to group by
 * @returns Grouped object
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Retries a function multiple times until it succeeds
 * @param fn Function to retry
 * @param maxAttempts Maximum number of attempts
 * @param delay Delay between attempts in milliseconds
 * @returns Promise that resolves with the function result
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxAttempts) break;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Formats a number as currency
 * @param amount Amount to format
 * @param currency Currency code (default: USD)
 * @param locale Locale (default: en-US)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param value Value to check
 * @returns True if empty, false otherwise
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object")
    return Object.keys(value as object).length === 0;
  return false;
}
