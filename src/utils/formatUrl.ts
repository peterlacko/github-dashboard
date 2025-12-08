/**
 * Adds https:// protocol to URL if missing
 * GitHub API sometimes returns blog URLs without protocol
 * @param url - URL string that may be missing protocol
 * @returns URL with https:// protocol
 */
export function addHttpsProtocol(url: string): string {
  if (!url) return url;

  // Check if URL already has a protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Add https:// protocol
  return `https://${url}`;
}
