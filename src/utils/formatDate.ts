/**
 * Formats an ISO date string to "Joined DD MMM YYYY" format
 * @param isoDate - ISO 8601 date string (e.g., "2014-04-14T21:58:34Z")
 * @returns Formatted date string (e.g., "Joined 14 Apr 2014")
 */
export function formatJoinDate(isoDate: string): string {
  const date = new Date(isoDate);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `Joined ${day} ${month} ${year}`;
}
