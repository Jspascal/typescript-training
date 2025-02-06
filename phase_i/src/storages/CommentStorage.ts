import { PostComment } from "../models/PostComment";

export class CommentStorage {
  private comments: Map<string, PostComment>;

  constructor() {
    this.comments = new Map();
  }

  add(comment: PostComment): void {
    this.comments.set(comment.id, comment);
  }

  get(id: string): PostComment | undefined {
    return this.comments.get(id);
  }

  update(id: string, comment: PostComment): boolean {
    if (this.comments.has(id)) {
      this.comments.set(id, comment);
      return true;
    }
    return false;
  }

  delete(id: string): boolean {
    if (this.comments.has(id)) {
      this.comments.delete(id);
      return true;
    }
    return false;
  }

  list(): PostComment[] {
    return Array.from(this.comments.values());
  }

  findByPostId(postId: string): PostComment[] {
    const allComments = Array.from(this.comments.values());
    return allComments.filter((comment) => {
      return comment.postId.toLowerCase().includes(postId.toLowerCase());
    });
  }
}
