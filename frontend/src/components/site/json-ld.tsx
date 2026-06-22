/**
 * Renders one or more Schema.org JSON-LD objects as a script tag.
 * Server-rendered so crawlers and AI engines read it without executing JS.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
