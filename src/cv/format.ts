const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Renders the only inline markup cv.yaml uses: `**bold**`. */
export const inlineMarkdown = (s: string) =>
  escapeHtml(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

/** Strips `**` for plain-text contexts. */
export const plainText = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1");

const monthFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  timeZone: "UTC",
});

/** "2024-11" -> "Nov 2024"; null/undefined -> "Present". */
export const formatMonth = (ym: string | null | undefined) =>
  ym ? monthFormat.format(new Date(`${ym}-01T00:00:00Z`)) : "Present";
