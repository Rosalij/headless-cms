// This is the WordPress client module for the application.
// It defines a function `fetchGraphQL` that takes a GraphQL query and optional variables.
// It sends a POST request to the WordPress GraphQL endpoint, and returns the response data.
//  The function also handles errors by logging them and throwing an exception.
const API_URL = process.env.WORDPRESS_URL as string;

export async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    // Send a POST request to the GraphQL endpoint with the query and variables in the body
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  // Check for GraphQL errors in the response
  if (json.errors) {
    console.error("GraphQL ERROR:", JSON.stringify(json.errors, null, 2));
    throw new Error(json.errors[0]?.message || "GraphQL error");
  }
// return the data from the response, cast to the expected type T (the generic type parameter of the function)
  return json.data as T;
}