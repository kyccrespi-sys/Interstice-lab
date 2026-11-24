// Turns *italic* in short text (like source titles) into <em>italic</em>, safely.
export function inline(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
export const toRoman = (n: number) => roman[n - 1] ?? String(n);
