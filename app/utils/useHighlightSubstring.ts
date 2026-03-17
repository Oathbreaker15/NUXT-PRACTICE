export function highlightSubstring(originalString: string, substringToHighlight: string): string {
  const regex = new RegExp(substringToHighlight, 'gi');

  const highlightedString = originalString.replace(regex, (match) => {
    return `<span class="highlight">${match}</span>`;
  });

  return highlightedString;
}