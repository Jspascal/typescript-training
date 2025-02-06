import { BlogPost } from "../models/BlogPost";
import { TagStats } from "../models/TagStats";

export function addTagToPost(post: BlogPost, tag: string): BlogPost {
  post.tags.push(tag);
  return post;
}

export function removeTagFromPost(post: BlogPost, tag: string): BlogPost {
  post.tags = post.tags.filter((t) => t !== tag);
  return post;
}

export function getMostUsedTags(posts: BlogPost[]): TagStats[] {
  const tagCount = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const count = tagCount.get(tag) || 0;
      tagCount.set(tag, count + 1);
    });
  });

  return Array.from(tagCount.entries()).map(([tag, count]) => ({
    name: tag,
    count,
    lastUsed: new Date(),
  }));
}

export function suggestTags(posts: BlogPost[]): string[] {
  const tagCount: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tagCount[tag]) {
        tagCount[tag]++;
      } else {
        tagCount[tag] = 1;
      }
    });
  });

  const sortedTags = Object.keys(tagCount).sort(
    (a, b) => tagCount[b] - tagCount[a]
  );

  return sortedTags.slice(0, 5);
}
