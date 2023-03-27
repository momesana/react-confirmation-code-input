import type { AllowedPattern, PredefinedPattern } from "./types";

const predefinedPatterns: Record<PredefinedPattern, RegExp> = {
  numeric: /[0-9]/,
  alpha: /[a-zA-Z]/,
  alphanumeric: /[a-zA-Z0-9]/,
};

export function isValid(
  input: string,
  allowedPattern: AllowedPattern,
  index: number,
  value: string[]
): boolean {
  return allowedPattern instanceof RegExp
    ? allowedPattern.test(input)
    : typeof allowedPattern === "function"
    ? allowedPattern(input, index, value)
    : predefinedPatterns[allowedPattern].test(input);
}
