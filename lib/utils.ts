type ClassValue = string | number | null | undefined | false | Record<string, boolean> | ClassValue[];

function normalizeClass(value: ClassValue): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === "string" || typeof value === "number") {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap(normalizeClass);
  }

  return Object.entries(value)
    .filter(([, condition]) => condition)
    .map(([className]) => className);
}

export function cn(...inputs: ClassValue[]): string {
  return inputs.flatMap(normalizeClass).join(" ").trim();
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    notation: value >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
