import { BlogPost } from "../models/BlogPost";
import { SearchResult } from "../types/common.types";

export function searchPosts(query: string, posts: BlogPost[]): SearchResult[] {
  const keywords = query.toLowerCase().split(" ");

  return posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
    )
    .map((post) => {
      const relevanceScore = calculateRelevanceScore(post, keywords);
      const matchedTerms = extractMatchedTerms(post, keywords);
      const highlightedContent = highlightKeywords(post.content, matchedTerms);

      return {
        post: post,
        relevanceScore: relevanceScore,
        matchedTerms: matchedTerms,
        highlightedContent: highlightedContent,
        frequency: 0,
      };
    });
}

export function highlightKeywords(content: string, keywords: string[]): string {
  return keywords.reduce((acc, keyword) => {
    const regex = new RegExp(keyword, "gi");
    return acc.replace(regex, `<span class="highlight">${keyword}</span>`);
  }, content);
}

export function calculateRelevanceScore(
  post: BlogPost,
  keywords: string[]
): number {
  let score = 0;

  keywords.forEach((keyword) => {
    const titleMatches = (post.title.match(new RegExp(keyword, "gi")) || [])
      .length;
    score += titleMatches * 2;
  });

  keywords.forEach((keyword) => {
    const contentMatches = (post.content.match(new RegExp(keyword, "gi")) || [])
      .length;
    score += contentMatches;
  });

  return score;
}

export function extractMatchedTerms(
  post: BlogPost,
  keywords: string[]
): string[] {
  const matchedTerms: string[] = [];

  keywords.forEach((keyword) => {
    if (
      post.title.toLowerCase().includes(keyword.toLowerCase()) ||
      post.content.toLowerCase().includes(keyword.toLowerCase())
    ) {
      matchedTerms.push(keyword);
    }
  });

  return matchedTerms;
}
