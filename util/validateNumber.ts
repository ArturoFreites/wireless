export function parseInputNumber(input: string, fallback = 0): number {
    const parsed = parseFloat(input);
    return isNaN(parsed) ? fallback : parsed;
}
