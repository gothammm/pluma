export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const cleanHex = expandHexColor(hex);
  const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Generates a contrasting color for text based on background
export function getContrastingColor(hexcolor: string): string {
  // Remove # if present
  const hex = hexcolor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white based on luminance
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function generateRandomColor(): string {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 30) + 70; // 70-100% saturation
  const l = Math.floor(Math.random() * 20) + 40; // 40-60% lightness
  return hslToHex(h, s, l);
}

export function expandHexColor(hex: string): string {
  hex = hex.replace("#", "");
  return hex.length === 3
    ? hex
        .split("")
        .map((char) => char + char)
        .join("")
    : hex;
}

export function getLighterShade(hexColor: string, amount: number = 30): string {
  const { h, s, l } = hexToHSL(hexColor);
  // Increase lightness but cap at 95% to avoid pure white
  const newL = Math.min(l + amount, 95);
  return hslToHex(h, s, newL);
}

export function getDarkerShade(hexColor: string, amount: number = 30): string {
  const { h, s, l } = hexToHSL(hexColor);
  // Decrease lightness but keep above 5% to avoid pure black
  const newL = Math.max(l - amount, 5);
  return hslToHex(h, s, newL);
}

export function getContrastingVariant(hexColor: string): string {
  const { l } = hexToHSL(hexColor);
  // If color is light, return darker variant, else return lighter variant
  return l > 50 ? getDarkerShade(hexColor, 40) : getLighterShade(hexColor, 40);
}
