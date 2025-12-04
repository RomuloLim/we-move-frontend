import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractLocationFromStopName(stopName: string): string {
  const parts = stopName.split(",")
  return parts[0]?.trim() || stopName
}