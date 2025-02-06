import { BlogPost } from "../models/BlogPost";

export class PostStorage {
  private posts: Map<string, BlogPost>;

  constructor() {
    this.posts = new Map();
  }

  add(post: BlogPost): void {
    this.posts.set(post.id, post);
  }

  get(id: string): BlogPost | undefined {
    return this.posts.get(id);
  }

  update(id: string, post: BlogPost): boolean {
    if (this.posts.has(id)) {
      this.posts.set(id, post);
      return true;
    }
    return false;
  }

  delete(id: string): boolean {
    if (this.posts.has(id)) {
      this.posts.delete(id);
      return true;
    }
    return false;
  }

  list(): BlogPost[] {
    return Array.from(this.posts.values());
  }

  findPostByTag(tag: string): BlogPost[] {
    return Array.from(this.posts.values()).filter((post) =>
      post.tags.includes(tag)
    );
  }

  findPostByAuthor(authorId: string): BlogPost[] {
    return Array.from(this.posts.values()).filter(
      (post) => post.authorId === authorId
    );
  }

  findPostByDateRange(startDate: Date, endDate: Date): BlogPost[] {
    return Array.from(this.posts.values()).filter(
      (post) => post.publishedDate >= startDate && post.publishedDate <= endDate
    );
  }
}
