

const API_URL = process.env.WORDPRESS_URL as string;
export async function fetchGraphQL<T>(query: string): Promise<T> {
  const res = await fetch(process.env.WORDPRESS_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL ERROR:", JSON.stringify(json.errors, null, 2));
    throw new Error(json.errors[0]?.message || "GraphQL error");
  }

  return json.data as T;
}