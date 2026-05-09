import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_PAGES, GET_POSTS } from "@/lib/wordpress/queries";
import { Post, PostsResponse } from "@/types/types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pagesRes, postsRes] = await Promise.all([
    fetchGraphQL<any>(GET_PAGES),
    fetchGraphQL<PostsResponse>(GET_POSTS),
  ]);

  const pages = pagesRes?.pages?.nodes?.map((page: { slug: string }) => ({
    url: `https://skintrackare.netlify.app/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })) ?? [];

const posts = postsRes?.posts?.nodes?.map((post: Post) => ({
    url: `https://skintrackare.netlify.app/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  })) ?? [];

  

  return [
    {
      url: "https://skintrackare.netlify.app",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...pages,
    ...posts,
  ];
}