import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// function to pass dynamic css to react components
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
