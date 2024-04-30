export function ensureNumber(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value);
}