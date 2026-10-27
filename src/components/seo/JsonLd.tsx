export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escaping '<' prevents a string value from terminating the JSON script element.
  return <script type="application/ld+json">{JSON.stringify(data).replace(/</g, "\\u003c")}</script>;
}
