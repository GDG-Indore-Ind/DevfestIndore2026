import "server-only";

// The static page is regenerated periodically; the client refreshes the release
// clock after hydration so a pass can still open between regenerations.
export function getTicketReleaseTime() {
  return Date.now();
}
