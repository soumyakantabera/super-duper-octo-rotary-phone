export function calculateTextStats(content: string) {
  const words = content.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const characterCount = content.length;
  const characterCountNoSpaces = content.replace(/\s/g, '').length;
  const readingTime = Math.ceil(wordCount / 200); // 200 WPM average
  
  // Count math blocks
  const mathBlockCount = (content.match(/\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]/g) || []).length;
  
  return {
    wordCount,
    characterCount,
    characterCountNoSpaces,
    readingTime,
    mathBlockCount,
  };
}
